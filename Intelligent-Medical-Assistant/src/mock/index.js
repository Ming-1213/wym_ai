import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '../services/apiClient';

console.log('[mock] initialized');

// 伪 JWT 生成
function makeFakeJWT(payload = {}) {
  try {
    const base = JSON.stringify(payload);
    return `header.${btoa ? btoa(base) : Buffer.from(base).toString('base64')}.signature`;
  } catch (e) {
    return `fake-jwt-${Math.random().toString(36).slice(2)}`;
  }
}

// 内存用户
let currentUser = {
  id: 1,
  name: '张三',
  avatar: '',
  signature: '健康第一',
};

const client = getApiClient();
const mock = new MockAdapter(client, { delayResponse: 400 });

// ---------------- 登录 ----------------
mock.onPost('/api/auth/login').reply((config) => {
  try {
    let parsed = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || {};
    const { username, password } = parsed;
    if (username === 'user' && password === 'pass') {
      const accessToken = makeFakeJWT({ userId: currentUser.id, name: currentUser.name });
      const refreshToken = makeFakeJWT({ type: 'refresh', userId: currentUser.id });
      return [200, { accessToken, refreshToken, user: currentUser }];
    }
    return [401, { message: '用户名或密码错误' }];
  } catch (e) {
    return [500, { message: 'mock 登录错误', error: e.toString() }];
  }
});

// ---------------- 刷新 token ----------------
mock.onPost('/api/auth/refresh').reply((config) => {
  try {
    let parsed = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || {};
    const { refreshToken } = parsed;
    if (!refreshToken) return [400, { message: '缺少 refreshToken' }];
    const newAccess = makeFakeJWT({ userId: currentUser.id, name: currentUser.name });
    const newRefresh = makeFakeJWT({ type: 'refresh', userId: currentUser.id });
    return [200, { accessToken: newAccess, refreshToken: newRefresh }];
  } catch (e) {
    return [500, { message: 'mock refresh 错误', error: e.toString() }];
  }
});

// ---------------- 医药资讯 ----------------
mock.onGet('/api/news').reply((config) => {
  try {
    const params = config.params || {};
    const page = parseInt(params.page, 10) || 1;
    const limit = parseInt(params.limit, 10) || 10;
    const total = 50;
    const articles = Array.from({ length: limit }).map((_, idx) => {
      const id = (page - 1) * limit + idx + 1;
      return {
        id,
        title: `医药资讯标题 #${id}`,
        summary: `这是第 ${id} 条医药相关摘要，涵盖药品、健康、政策等。`,
        date: new Date(Date.now() - id * 3600 * 1000).toISOString(),
      };
    });
    return [200, { articles, total }];
  } catch (e) {
    return [500, { message: '获取资讯失败', error: e.toString() }];
  }
});

// ---------------- 用户资料更新 ----------------
mock.onPost('/api/user/update-profile').reply((config) => {
  try {
    let name, signature, avatarFile;
    if (config.data && typeof config.data.get === 'function') {
      // FormData 上传
      name = config.data.get('name');
      signature = config.data.get('signature');
      avatarFile = config.data.get('avatar');
    } else if (typeof config.data === 'string') {
      const payload = JSON.parse(config.data);
      name = payload.name;
      signature = payload.signature;
      avatarFile = payload.avatar;
    } else {
      const payload = config.data || {};
      name = payload.name;
      signature = payload.signature;
      avatarFile = payload.avatar;
    }

    if (name) currentUser.name = name;
    if (signature) currentUser.signature = signature;
    if (avatarFile) {
      try {
        currentUser.avatar = URL.createObjectURL(avatarFile);
      } catch {
        currentUser.avatar = '/default-avatar.png';
      }
    }

    return [200, { user: currentUser }];
  } catch (e) {
    return [500, { message: '更新用户资料失败', error: e.toString() }];
  }
});

// ---------------- AI 聊天 ----------------
mock.onPost('/api/llm/chat-stream').reply((config) => {
  try {
    let parsed = typeof config.data === 'string' ? JSON.parse(config.data) : config.data || {};
    const { prompt } = parsed;
    const fullResponse = `你问的是：「${prompt}」。这是模拟 AI 响应建议：保持休息，必要时就医。`;
    return [200, { assistant: fullResponse }];
  } catch (e) {
    return [500, { message: 'LLM 错误', error: e.toString() }];
  }
});

mock.onAny().passThrough();
