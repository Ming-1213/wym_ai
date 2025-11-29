import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/UserCenter.module.css';
import useAuthStore from '../stores/authStore';

export default function UserCenter() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleNav = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.avatar} src={user.avatar} alt="头像" />
        <div className={styles.userInfo}>
          <div className={styles.username}>{user.name}</div>
          <div className={styles.signature}>{user.signature || '这个人很懒，没有留下签名。'}</div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statBox} onClick={() => handleNav('/history')}>
          <div className={styles.statNumber}>12</div>
          <div className={styles.statLabel}>浏览历史</div>
        </div>
        <div className={styles.statBox} onClick={() => handleNav('/favorites')}>
          <div className={styles.statNumber}>5</div>
          <div className={styles.statLabel}>收藏</div>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={() => handleNav('/settings')}>设置</button>
        <button onClick={() => handleNav('/guide')}>疑问</button>
        <button className={styles.logout} onClick={() => handleNav('/login')}>
          退出登录
        </button>
      </div>
    </div>
  );
}
