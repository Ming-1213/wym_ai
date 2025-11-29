import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setTokens: ({ accessToken, refreshToken }) =>
    set({ accessToken, refreshToken }),
  setUser: (user) => set({ user }),
  logout: () => set({ accessToken: null, refreshToken: null, user: null })
}));

export default useAuthStore;