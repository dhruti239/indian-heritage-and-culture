const BASE = "http://localhost:8080/api";

const req = async (method, path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

export const api = {
  get:    (path)        => req("GET",    path),
  post:   (path, body)  => req("POST",   path, body),
  put:    (path, body)  => req("PUT",    path, body),
  delete: (path)        => req("DELETE", path),
};
