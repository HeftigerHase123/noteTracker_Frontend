import { ApiError } from "next/dist/server/api-utils";

export class HttpError extends Error {
    response: Response;
    apiError: ApiError;

    constructor(
        message: string,
        response: Response,
        apiError: ApiError
    ) {
        super(message);
        this.name = "HttpError";
        this.response = response;
        this.apiError = apiError;
    }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const error: ApiError= await response.json();
        throw new HttpError(error.message, response, error);
    }

    return response.json() as Promise<T>;
};

export const getJSON = async(url: string, accessToken?: string) => {
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

export const postJSON = async<T>(url: string, body: T, accessToken?:string) => {
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

export const putJSON = async<T>(url: string, body: T, accessToken?: string) => {
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

export const deleteJSON = async(url: string, accessToken?: string) => {
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