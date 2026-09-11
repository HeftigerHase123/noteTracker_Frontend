import { LoginRequest } from "@/models/auth/LoginRequest";
import { config } from "../../config";
import { postJSON } from "./RequestService";
import { JwtDtoResponse } from "@/models/auth/JwtDto";
import { CreateUserRequest } from "@/models/user/CreateUserRequest";

const URL = `${config.apiBaseUrl}/auth`;

export class AuthService {

  static authenticate = async(body: LoginRequest): Promise<JwtDtoResponse> => {
    const response = await postJSON(`${URL}/login`, body);
    
    return response;
  }

  static signup = async(body: CreateUserRequest): Promise<void> => {
    await postJSON(`${URL}/register`, body);
  }
}