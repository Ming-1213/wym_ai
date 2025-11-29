import React, { useState } from 'react';
import styles from '../styles/Register.module.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    alert(`注册成功：${username}`);
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h2>注册</h2>
      <div className={styles.inputGroup}>
        <label>用户名</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className={styles.inputGroup}>
        <label>密码</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>注册</button>
    </div>
  );
}
