import { Grade } from "@/types/Grade";
import { BASE_URL, deleteJSON, getJSON, postJSON, putJSON } from ".";

const URL = `${BASE_URL}/grades`;

const GradesAPI = {
    create<T>(body: T, accessToken: string) {
        return postJSON(URL, body, accessToken);
    },

    readByUserId(id: number, accessToken: string): Promise<Grade[]> {
        return getJSON(`${URL}/user/${id}`, accessToken)
    },

    read(id: number, accessToken: string): Promise<Grade> {
        return getJSON(`${URL}/${id}`, accessToken)
    },

    update<T>(id: number, body: T, accessToken: string) {
        return putJSON(`${URL}/${id}`, body, accessToken)
    },

    delete(id: number, accessToken: string) {
        return deleteJSON(`${URL}/${id}`, accessToken)
    }
}

export { GradesAPI };