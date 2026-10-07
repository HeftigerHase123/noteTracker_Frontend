import { ApiError } from "@/models/ApiError";

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
    let error: ApiError;
    try {
      error = await response.json();
    } catch {
      error = { status: response.status, message: response.statusText };
    }
    throw new HttpError(error.message, response, error);
  }

  return response.json() as Promise<T>;
};

export const getJSON = async<T>(url: string, accessToken?: string): Promise<T> => {
  const headers = new Headers({
    "content-type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  return handleResponse<T>(response);
}

export const postJSON = async<TRequest, TResponse>(url: string, body: TRequest, accessToken?: string): Promise<TResponse> => {
  const headers = new Headers({
    "content-type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<TResponse>(response);
}

export const putJSON = async<T>(url: string, body: T, accessToken?: string) => {
  const headers = new Headers({
    "content-type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse(response);
}

export const deleteJSON = async (url: string, accessToken?: string) => {
  const headers = new Headers({
    "content-type": "application/json",
  });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers,
  });

  return handleResponse(response);
}