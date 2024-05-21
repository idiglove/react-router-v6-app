import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.request.use((request) => {
  request.headers = request.headers || {};
  request.headers.Authorization =
    "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiNTgzNjc2IiwiZ2l2ZW5uYW1lIjoiU2FoYXIiLCJzdXJuYW1lIjoiQnVzaW5lc3MiLCJzdWIiOiJidXNpbmVzc3MueW9jYWxlQGdtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiYnVzaW5lc3NpZHR5cGUiOiJCdXNpbmVzcyIsInJvbGVzIjoiQnVzaW5lc3NPd25lciIsImJ1c2luZXNzaWRzIjoiOTQ3NCIsImJ1c2luZXNzcm9sZXMiOiJ7XCJCdXNpbmVzc093bmVyXCI6W1wiOTQ3NFwiXX0iLCJkb21haW5pZCI6IjEiLCJuYmYiOjE3MTYzMjQwMTAsImV4cCI6MTcxNjMyNzYxMCwiaWF0IjoxNzE2MzI0MDEwLCJpc3MiOiJodHRwczovL2F1dGhlbnRpY2F0aW9uLXBvcy5kZXYyLnlvY2FsZS5jb20iLCJhdWQiOiI4YTIxOTg0ZDg0NzFmYWM4N2JkZWE0MzdmYmVmODk4Y2Q5N2JkZWE0MzcwNzYwODUifQ.eK-3TUhWHHxXAS0Oc0CLkNQ9KLeNzlb15b7XepqXsDg";
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
