import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use((request) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMjgxNDQzIiwiZ2l2ZW5uYW1lIjoiU2FoYXIiLCJzdXJuYW1lIjoiT3duZXIiLCJzdWIiOiJidXNpbmVzc3MueW9jYWxlQGdtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiYnVzaW5lc3NpZHR5cGUiOiJCdXNpbmVzcyIsInJvbGVzIjoiQnVzaW5lc3NPd25lciIsImJ1c2luZXNzaWRzIjoiOTIxNCIsImJ1c2luZXNzcm9sZXMiOiJ7XCJCdXNpbmVzc093bmVyXCI6W1wiOTIxNFwiXX0iLCJkb21haW5pZCI6IjEiLCJuYmYiOjE3MTY0MTIwNTEsImV4cCI6MTcxNjQxNTY1MSwiaWF0IjoxNzE2NDEyMDUxLCJpc3MiOiJodHRwczovL2F1dGhlbnRpY2F0aW9uLXBvcy5xYS55b2NhbGUuY29tIiwiYXVkIjoiOGEyMTk4NGQ4NDcxZmFjODdiZGVhNDM3ZmJlZjg5OGNkOTdiZGVhNDM3MDc2MDg1In0.uScxTAJFByMP_SekBLIzE4uEXBDG76XoO2QTZZ4Sxd4";
  request.headers = request.headers || {};
  request.headers.Authorization = `bearer ${token}`;
  return request;
});

export type RequestEntityArgs = {
  config?: AxiosRequestConfig<any> | undefined;
  url: string;
};
export type CRUDEntityArgs<T> = RequestEntityArgs & {
  payload?: T;
};
export type ResponseEntity<T> = {
  data: T;
  details: Record<string, unknown>[];
  message: string;
  status: string;
};

export async function patch<T, DTO>({
  url,
  payload,
  config,
}: CRUDEntityArgs<DTO>) {
  return axios.patch<T>(url, payload, config);
}

export async function put<T, DTO>({
  url,
  payload,
  config,
}: CRUDEntityArgs<DTO>) {
  return axios.put<T>(url, payload, config);
}

export async function post<T, DTO>({
  url,
  payload,
  config,
}: CRUDEntityArgs<DTO>) {
  return axios.post<T>(url, payload, { ...config });
}

export async function remove<T>({ url, config }: RequestEntityArgs) {
  return axios.delete<T>(url, { ...config });
}

export async function get<T>({ url, config }: RequestEntityArgs) {
  return axios.get<T>(url, { ...config });
}

export async function getAll<T>({ url, config }: RequestEntityArgs) {
  return axios.get<T[]>(url, { ...config });
}
