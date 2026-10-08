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
  const raw = await response.text(); // Body nur einmal lesen

  if (!response.ok) {
    let error: ApiError;
    try {
      error = JSON.parse(raw);
    } catch {
      error = { status: response.status, message: response.statusText || `HTTP ${response.status}` };
    }
    throw new HttpError(error.message || `HTTP ${response.status}`, response, error);
  }

  // Erfolg: Body kann leer sein (201/204 bei void)
  return (raw ? JSON.parse(raw) : undefined) as T;
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
  console.log("AFTER FETCH")

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