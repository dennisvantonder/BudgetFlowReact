import axios from "axios";

const api = axios.create({
   baseURL: import.meta.env.VITE_API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
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
   email: string;
   expiration: string;
};

export async function loginRequest(
   request: LoginRequest,
): Promise<AuthResponse> {
   const response = await api.post("/Auth/login", request);
   return response.data;
}

export async function registerRequest(
   request: RegisterRequest,
): Promise<AuthResponse> {
   const response = await api.post("/Auth/register", request);
   return response.data;
}
