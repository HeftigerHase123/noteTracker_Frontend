import { verifySession } from "@/lib/sessionLogic";
import { config } from "../../config";
import { CreateSubjectUserDTO } from "@/models/subject_user/CreateSubjectUserDTO";
import { deleteJSON, getJSON, postJSON, putJSON } from "./RequestService";
import { SubjectUserDTO } from "@/models/subject_user/SubjectUserDTO";
import { UpdateSubjectUserDTO } from "@/models/subject_user/UpdateSubjectUserDTO";

const URL = `${config.apiBaseUrl}/subject-user`;

const getToken = async() => {
  const session = await verifySession();
  return session?.accessToken;
}

export class SubjectUserService {

  static create = async(body: CreateSubjectUserDTO): Promise<void> => {
    const accessToken = await getToken();
    await postJSON(URL, body, accessToken);
  }

  static getAll = async(): Promise<SubjectUserDTO[]> => {
    const accessToken = await getToken();
    const response = await getJSON<SubjectUserDTO[]>(URL, accessToken);

    return response;
  }

  static getById = async(id: number): Promise<SubjectUserDTO> => {
    const accessToken = await getToken();
    const response = await getJSON<SubjectUserDTO>(`${URL}/${id}`, accessToken);

    return response;
  }

  static getByUserId = async(id: number): Promise<SubjectUserDTO[]> => {
    const accessToken = await getToken();
    const response = await getJSON<SubjectUserDTO[]>(`${URL}/user/${id}`, accessToken);

    return response;
  }

  static update = async(id: number, body: UpdateSubjectUserDTO): Promise<void> => {
    const accessToken = await getToken();
    await putJSON(`${URL}/${id}`, body, accessToken);
  }

  static delete = async(id: number): Promise<void> => {
    const accessToken = await getToken();
    await deleteJSON(`${URL}/${id}`, accessToken);
  }
}