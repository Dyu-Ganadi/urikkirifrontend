import { apiClient } from "./client";
import type { LoginRequest, SignupRequest, AuthResponse } from "./types";

export const userApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/users/login", data),

  logout: () => apiClient.post("/users/logout"),

  signup: (data: SignupRequest) =>
    apiClient.post<AuthResponse>("/users/signup", data),
};
