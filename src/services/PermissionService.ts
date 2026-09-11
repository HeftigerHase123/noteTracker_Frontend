import { verifySession } from "@/lib/sessionLogic";
import { config } from "../../config";
import { getJSON, postJSON } from "./RequestService";
import { CreatePermissionRequest } from "@/models/permission/CreatePremissionRequest";
import { AddPermissionsToUser } from "@/models/permission/AddPermissionsToUser";
import { PermissionDto } from "@/models/permission/PermissionDto";

const URL = `${config.apiBaseUrl}/premissions`;

const getToken = async() => {
  const session = await verifySession();
  return session?.accessToken;
}

export class PermissionService {

  static create = async(body: CreatePermissionRequest): Promise<void> => {
    const accessToken = await getToken();
    await postJSON(URL, body, accessToken);
  }

  static addToUser = async(body: AddPermissionsToUser): Promise<void> => {
    const accessToken = await getToken();
    await postJSON(`${URL}/addPermission`, body, accessToken)
  }

  static getAll = async(): Promise<PermissionDto[]> => {
    const accessToken = await getToken();
    const response = await getJSON(URL, accessToken);

    return response;
  }

  static getById = async(id: number): Promise<PermissionDto> => {
    const accessToken = await getToken();
    const response = await getJSON(`${URL}/${id}`, accessToken);

    return response;
  }
}