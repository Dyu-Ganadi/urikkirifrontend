export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  accessExp: string;
}

export interface MyPageResponse {
  id: number;
  email: string;
  nickname: string;
  level: number;
  bananaxp: number;
}

export interface RankingUser {
  level: number;
  nickname: string;
  bananaxp: number;
}

export interface RankingResponse {
  rankings: RankingUser[];
}
