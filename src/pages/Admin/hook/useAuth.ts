// admin/hooks/useAuth.ts
import { authProvider } from '@/provider/authProvider';
import type { LoginData, RegisterData } from '@/types/auth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
};

export function useAuth() {
  const queryClient = useQueryClient();

  // Récupérer l'utilisateur connecté
  const { data: user, isLoading, error } = useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      if (!authProvider.isAuthenticated()) {
        return null;
      }

      const storedUser = authProvider.getUserFromStorage();
      if (storedUser) {
        return storedUser;
      }

      try {
        const userData = await authProvider.me();
        authProvider.updateUserInStorage(userData);
        return userData;
      } catch (error) {
        authProvider.clearAuthData();
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Mutation d'inscription
  const registerMutation = useMutation({
    mutationFn: (data: RegisterData) => authProvider.register(data),
    onSuccess: (response) => {
      authProvider.saveAuthData(response);
      queryClient.setQueryData(authKeys.me(), response.user);
    },
  });

  // Mutation de connexion
  const loginMutation = useMutation({
    mutationFn: (data: LoginData) => authProvider.login(data),
    onSuccess: (response) => {
      authProvider.saveAuthData(response);
      queryClient.setQueryData(authKeys.me(), response.user);
    },
  });

  // Mutation de déconnexion
  const logoutMutation = useMutation({
    mutationFn: () => authProvider.logout(),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me(), null);
      queryClient.removeQueries({ queryKey: authKeys.all });
    },
  });

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
  };
}