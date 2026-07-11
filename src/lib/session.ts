"use server"
import { cookies } from "next/headers"
import { cache } from "react"
import { decodeJwt } from "jose";
import { Session } from "@/types/Session";


interface SessionClaims {
    id: number;
    sub: string;
    role: number;
}

export const verifySession = cache(async (): Promise<Session | null> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("session")?.value;

    if (!accessToken) return null;

    const claims = decodeJwt(accessToken) as SessionClaims;
    return {
        accessToken,
        user: {
            id: claims.id,
            username: claims.sub,
            roleId: claims.role
        },
    };
});

export async function createSession(accessToken: string) {
    const cookieStore = await cookies();

    cookieStore.set("session", accessToken, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
        sameSite: "strict",
        path: "/",
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}

export async function decodeJwtSelfmade(token: string) {
    try {
        const base64Payload = token.split('.')[1]
        const payload = atob(base64Payload)
        return JSON.parse(payload)
    } catch {
        return null
    }
}