"use server"

import { cookies } from "next/headers";
import { cache } from "react";
import { decodeJwt } from "jose";
import { Session } from "@/models/auth/Session";
import { JwtDtoResponse } from "@/models/auth/JwtDto";

const SESSION_KEY = "session";

export const createSession = async (jwt: JwtDtoResponse, rememberMe: boolean) => {
  const cookieStore = await cookies();

  cookieStore.set(`${SESSION_KEY}`, `${jwt.accessToken}`, {
    httpOnly: true,
    secure: true,
    expires: rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : jwt.expiresIn,
    sameSite: "strict",
    path: "/",
  });
}

export const verifySession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(`${SESSION_KEY}`)?.value;

  if (!accessToken) return null;

  const claims = decodeJwt(accessToken);

  if (typeof claims.id !== "number") {
    throw new Error("Invalid user id");
  }

  if (typeof claims.sub !== "string") {
    throw new Error("Invalid username");
  }

  if (claims.sub === undefined) {
    throw new Error("Username is undefined")
  }

  if (!Array.isArray(claims.permissions)) {
    throw new Error("Invalid permissions");
  }

  return {
    accessToken,
    user: {
      id: claims.id,
      permissions: claims.permissions,
      username: claims.sub
    }
  }
});

export const isLoggedIn = async () => {
  const session = await verifySession();
  return session ? true : false;
}

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(`${SESSION_KEY}`)
}