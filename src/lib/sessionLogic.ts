import { cookies } from "next/headers";
import { cache } from "react";
import { decodeJwt } from "jose";

const SESSION_KEY = "session";

export const createSession = async(accessToken: string) => {
  const cookieStore = await cookies();

  cookieStore.set(`${SESSION_KEY}`, accessToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 60 * 60 * 1000),
    sameSite: "strict",
    path: "/",
  });
}

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(`${SESSION_KEY}`)?.value;

  if(!accessToken) return null;

  const claims = decodeJwt(accessToken);
  return {
    accessToken,
    user: {
      id: claims.id,
      permissions: claims.permissions,
      email: claims.sub
    }
  }
});

export const deleteSession = async() => {
  const cookieStore = await cookies();
  cookieStore.delete(`${SESSION_KEY}`)
}