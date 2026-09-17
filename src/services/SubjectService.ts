import { verifySession } from "@/lib/sessionLogic";
import { config } from "../../config";
import { CreateSubjectDTO } from "@/models/subject/CreateSubjectDTO";
import { postJSON, getJSON, putJSON, deleteJSON } from "./RequestService";
import { SubjectDTO } from "@/models/subject/SubjectDTO";
import { UpdateSubjectDTO } from "@/models/subject/UpdateSubjectDTO";

const URL = `${config.apiBaseUrl}/subjects`;

const getToken = async() => {
  const session = await verifySession();
  return session?.accessToken;
}

export class SubjectService {

  static create = async(body: CreateSubjectDTO): Promise<void> => {
    const accessToken = await getToken();
    await postJSON(URL, body, accessToken)
  }

  static getAll = async(): Promise<SubjectDTO[]> => {
    const accessToken = await getToken();
    const response = await getJSON<SubjectDTO[]>(URL, accessToken)

    return response;
  }

  static getById = async(id: number): Promise<SubjectDTO> => {
    const accessToken = await getToken();
    const response = await getJSON<SubjectDTO>(`${URL}/${id}`, accessToken)
    
    return response;
  }

  static update = async(id: number, body: UpdateSubjectDTO): Promise<void> => {
    const accessToken = await getToken();
    await putJSON(`${URL}/${id}`, body, accessToken)
  }

  static delete = async(id: number): Promise<void> => {
    const accessToken = await getToken();
    await deleteJSON(`${URL}/${id}`, accessToken)
  }
}