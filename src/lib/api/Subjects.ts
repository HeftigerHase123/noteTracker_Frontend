import { Subject } from "@/types/Subject";
import { BASE_URL, getJSON } from ".";

const URL = `${BASE_URL}/subjects`;

const SubjectsAPI = {
    readAll(): Promise<Subject[]> {
        return getJSON(`${URL}`)
    },

    read(id: number): Promise<Subject> {
        return getJSON(`${URL}/${id}`);
    }
}

export default SubjectsAPI;