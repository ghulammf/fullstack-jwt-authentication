import User from "./user.type";

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthResponse {
  status: string;
  message: string;
  user: User;
  accessToken: string;
}

export type { RegisterData, LoginData, AuthResponse };
