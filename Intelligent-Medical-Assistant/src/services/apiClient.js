import axios from 'axios';
import useAuthStore from '../stores/authStore';

let instance = null;

function createInstance() {
  const client = axios.create({
    baseURL: '/api',
    timeout: 10000
  });

  // 请求拦截
  client.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  // 响应拦截：处理 401
  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { refreshToken } = useAuthStore.getState();

          const response = await client.post('/auth/refresh', {
            refreshToken
          });

          const { accessToken: newAccess, refreshToken: newRefresh } = response.data;

          useAuthStore.getState().setTokens({
            accessToken: newAccess,
            refreshToken: newRefresh
          });

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return client(originalRequest);
        } catch (e) {
          useAuthStore.getState().logout();
          return Promise.reject(e);
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}

export function getApiClient() {
  if (!instance) instance = createInstance();
  return instance;
}
