"use server"

import { LoginState } from "@/components/Forms/LoginForm/LoginForm";
import { createSession } from "@/lib/sessionLogic";
import { ApiError } from "@/models/ApiError"
import { LoginRequest } from "@/models/auth/LoginRequest"
import { AuthService } from "@/services/AuthService";
import { HttpError } from "@/services/RequestService";

export const login = async (state: LoginState, formData: FormData): Promise<LoginState> => {
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on";

  const fieldErrors: Record<string, string> = {};
  if (!username) fieldErrors.username = "Username is required";
  if (!password) fieldErrors.password = "Password is required";

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors, success: false};
  }


  try {
    const response = await AuthService.authenticate({username, password});
    await createSession(response, rememberMe);
    return { error: null, fieldErrors: {}, success: true};
  } catch(e) {
    if (e instanceof HttpError) {
      // Backend hat geantwortet, z. B. 401 oder 400 mit Feldfehlern
      return {
        error: e.apiError.message,
        fieldErrors: Object.fromEntries(
          (e.apiError.fieldErrors ?? []).map((fe) => [fe.field, fe.error])
        ),
        success: false,
      };
    }

    return { error: "Server not avaiable", fieldErrors: {}, success: false};
  }
}