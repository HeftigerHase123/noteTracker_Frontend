import { BASE_URL, getJSON } from ".";

const URL = `${BASE_URL}/subjects`;

const SubjectsAPI = {
    readAll() {
        return getJSON(`${URL}?_sort=-name`)
    },

    read(id: number) {
        return getJSON(`${URL}/${id}`);
    }
}

export default SubjectsAPI;