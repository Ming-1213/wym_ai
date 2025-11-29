import React, { useState, useCallback } from 'react';
import { getApiClient } from '../services/apiClient';
import useAuthStore from '../stores/authStore';
import styles from '../styles/Login.module.css';

export default function Login() {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('pass');
  const setTokens = useAuthStore((s) => s.setTokens);
  const setUser = useAuthStore((s) => s.setUser);
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username || !password) return;
      setLoading(true);
      try {
        const res = await getApiClient().post('/auth/login', {
          username: username.trim(),
          password: password.trim(),
        });
        console.log('登录接口成功响应：', res.data);
        const { accessToken, refreshToken, user } = res.data;
        if (!accessToken || !refreshToken || !user) {
          throw new Error('返回数据缺失 token 或 user');
        }
        setTokens({ accessToken, refreshToken });
        setUser(user);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
        // 跳转首页
        window.location.href = '/';
      } catch (err) {
        console.error('登录失败详细信息：', err?.response || err);
        const msg =
          err?.response?.data?.message ||
          (err.message ? err.message : '未知错误，请看控制台');
        alert(`登录失败，${msg}`);
      } finally {
        setLoading(false);
      }
    },
    [username, password]
  );

  return (
    <div className={styles.container}>
      <h2>登录智能医药助手</h2>
      <form onSubmit={login} className={styles.form}>
        <div className={styles.field}>
          <label>用户名</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="user"
            required
          />
        </div>
        <div className={styles.field}>
          <label>密码</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="pass"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
      <p>测试账号：user / pass</p>
      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
        如果仍登录失败，请打开浏览器 DevTools → Network 看请求与响应详情，或在控制台查看日志。
      </div>
    </div>
  );
}
