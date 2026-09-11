"use server"

import { createSession } from "@/lib/sessionLogic";
import { ApiError } from "@/models/ApiError"
import { LoginRequest } from "@/models/auth/LoginRequest"
import { AuthService } from "@/services/AuthService";
import { HttpError } from "@/services/RequestService";

export const login = async (state: ApiError, formData: FormData): Promise<ApiError> => {
  return state;
}

export const register = async (state: ApiError, formData: FormData): Promise<ApiError> => {
  return state;
}