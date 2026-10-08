"use server"

import { LoginState } from "@/components/Forms/LoginForm/LoginForm";
import { RegisterState } from "@/components/Forms/RegisterForm/RegisterForm";
import { createSession } from "@/lib/sessionLogic";
import { ApiError } from "@/models/ApiError"
import { LoginRequest } from "@/models/auth/LoginRequest"
import { Country } from "@/models/user/CountryEnum";
import { CreateUserRequest } from "@/models/user/CreateUserRequest";
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
    return { error: null, fieldErrors, success: false };
  }


  try {
    const response = await AuthService.authenticate({ username, password });
    await createSession(response, rememberMe);
    return { error: null, fieldErrors: {}, success: true };
  } catch (e) {
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

    return { error: "Server not avaiable", fieldErrors: {}, success: false };
  }
}

export const register = async (state: RegisterState, formData: FormData): Promise<RegisterState> => {
  const first_name = (formData.get("first_name") as string)?.trim();
  const last_name = (formData.get("last_name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone_country = formData.get("phone_country") as Country;
  const phone_number = (formData.get("phone_number") as string)?.trim();
  const username = (formData.get("username") as string)?.trim();
  const password = formData.get("password") as string;
  const confirm_password = formData.get("confirm_password") as string;

  const fieldErrors: Record<string, string> = {};

  if (!first_name) fieldErrors.first_name = "Firstname is required";
  if (!last_name) fieldErrors.last_name = "Lastname is required";
  if (!email) fieldErrors.email = "Email is required";
  if (!phone_number) fieldErrors.phone_number = "Phone number is required";
  if (!username) fieldErrors.username = "Username is required";
  if (!password) fieldErrors.password = "Password is required";
  if (!confirm_password) fieldErrors.confirm_password = "Password confirmation is required";

  if (password !== confirm_password && !fieldErrors.confirm_password) {
    fieldErrors.confirm_password = "Passwords do not match";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !fieldErrors.email) {
    fieldErrors.email = "Invalid email"
  }

  if (!/^[1-9]\d+$/.test(phone_number.replace(/\s/g, "")) && !fieldErrors.phone_number) {
    fieldErrors.phone_number = "Invalid phone number";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { error: null, fieldErrors, success: false };
  }

  const body: CreateUserRequest = {
    firstname: first_name,
    lastname: last_name,
    mail: email,
    phoneCountry: phone_country.toString(),
    phoneNumber: phone_number,
    username: username,
    password: password,
  }

  console.log(body);

  try {
    await AuthService.signup(body);
    console.log("SIGNUP SUCCESS")
    const response = await AuthService.authenticate({ username: username, password: password });
    await createSession(response, false);
    return { error: null, fieldErrors: {}, success: true };
  } catch (e) {
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

    return { error: "Server not avaiable", fieldErrors: {}, success: false };
  }

}