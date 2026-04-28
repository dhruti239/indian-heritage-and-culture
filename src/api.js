const BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

const req = async (method, path, body) => {
  const token = localStorage.getItem("heritage_token");
  const headers = { "Content-Type": "application/json", "Accept": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    credentials: "omit",
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
};

export const api = {
  get:    (path)       => req("GET",    path),
  post:   (path, body) => req("POST",   path, body),
  put:    (path, body) => req("PUT",    path, body),
  delete: (path)       => req("DELETE", path),
};
