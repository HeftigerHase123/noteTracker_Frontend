import { verifySession } from "@/lib/sessionLogic"
import { deleteJSON, getJSON, putJSON } from "./RequestService";
import { config } from "../../config";
import { UserDtoResponse } from "@/models/user/UserDtoResponse";
import { UpdateUserRequest } from "@/models/user/UpdateUserRequest";

const URL = `${config.apiBaseUrl}/users`;

const getToken = async() => {
  const session = await verifySession();
  return session?.accessToken;
}

export class UserService {

  static getAll = async(): Promise<UserDtoResponse[]> => {
    const accessToken = await getToken();
    const response = await getJSON(URL, accessToken);

    return response;
  }

  static getById = async(id: number): Promise<UserDtoResponse> => {
    const accessToken = await getToken();
    const response = await getJSON(`${URL}/${id}`, accessToken);

    return response;
  }

  static update = async(id: number, body: UpdateUserRequest): Promise<void> => {
    const accessToken = await getToken();
    await putJSON(`${URL}/${id}`, body, accessToken);
  }

  static delete = async(id: number): Promise<void> => {
    const accessToken = await getToken();
    await deleteJSON(`${URL}/${id}`, accessToken);
  }
}