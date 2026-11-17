import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

export type LoginRequest = {
   email: string;
   password: string;
};

export type RegisterRequest = {
   fullName: string;
   email: string;
   password: string;
};

export type AuthResponse = {
   token: string;
   expiration: string;
   userId: string;
};

export type User = {
   id: number;
   fullName: string;
   email: string;
};

export async function loginRequest(
   request: LoginRequest,
): Promise<AuthResponse> {
   const response = await api.post("/Auth/login", request);
   return response.data;
}

export async function registerRequest(
   request: RegisterRequest,
): Promise<number> {
   const response = await api.post("/Auth/register", request);
   return response.status;
}

export async function refreshTokenRequest(): Promise<AuthResponse> {
   const response = await api.post("/Auth/refresh-token", {});
   return response.data;
}

export async function getUser(): Promise<User> {
   const response = await api.get<User>("/Auth/me");
   return response.data;
}

export async function logoutRequest(): Promise<void> {
   await api.post("/Auth/logout", {});
}
