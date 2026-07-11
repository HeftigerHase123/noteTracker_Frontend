const BASE_URL = "http://localhost:8080";

class HttpError extends Error {
    response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.name = "HttpError";
        this.response = response;
    }
}

async function handleResponse(response: Response) {
    if (!response.ok) {
        throw new HttpError(
            "Request failed with status " + response.status,
            response
        );
    }
    return response.json();
}


export async function getJSON(url: string, accessToken?: string) {
    const headers = new Headers({
        "content-type": "application/json",
    });

    if (accessToken) {
        headers.set("Authorization", accessToken);
    }

    const response = await fetch(url, {
        method: "GET",
        headers,
    });

    return handleResponse(response);
}

export async function postJSON<T>(url: string, body: T, accessToken?: string) {
    const headers = new Headers({
        "content-type": "application/json",
    });

    if (accessToken) {
        headers.set("Authorization", accessToken);
    }

    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });

    return handleResponse(response);
}

export async function putJSON<T>(url: string, body: T, accessToken?: string) {
    const headers = new Headers({
        "content-type": "application/json",
    });

    if (accessToken) {
        headers.set("Authorization", accessToken);
    }

    const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
    });

    return handleResponse(response);
}

export async function deleteJSON(url: string, accessToken?: string) {
    const headers = new Headers({
        "content-type": "application/json",
    });

    if (accessToken) {
        headers.set("Authorization", accessToken);
    }

    const response = await fetch(url, {
        method: "DELETE",
        headers,
    });

    return handleResponse(response);
}

export { BASE_URL };