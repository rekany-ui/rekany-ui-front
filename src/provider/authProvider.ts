import { getAxios } from "@/config/axios";
import type { AuthResponse, LoginData, RegisterData, User } from "@/types/auth";

export const authProvider = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const { data: result } = await getAxios().post("/api/register", data);
    return result;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const { data: result } = await getAxios().post("/api/login", data);
    return result;
  },

  async logout(): Promise<void> {
    try {
      await getAxios().post("/api/logout");
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  async me(): Promise<User> {
    const { data } = await getAxios().get("/api/me");
    return data.user ?? data;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  saveAuthData(response: AuthResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  },

  clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  updateUserInStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  },
};
