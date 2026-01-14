import { apiClient } from "./client";
import type {
  LoginRequest,
  SignupRequest,
  AuthResponse,
  MyPageResponse,
  RankingResponse,
} from "./types";

export const userApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/users/login", data),

  logout: () => apiClient.post("/users/logout"),

  signup: (data: SignupRequest) =>
    apiClient.post<AuthResponse>("/users/signup", data),

  getMyPage: () => apiClient.get<MyPageResponse>("/users/my"),

  getRankings: () => apiClient.get<RankingResponse>("/who-is-the-king"),
};
