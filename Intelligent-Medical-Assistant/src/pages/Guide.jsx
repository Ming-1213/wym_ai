import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Guide.module.css';

export default function Guide() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setShowMenu(false);
  };

  return (
    <div className={styles.container}>
      <button className={styles.menuBtn} onClick={() => setShowMenu(true)}>目录</button>
      <div className={styles.sections}>
        <section id="overview"><h2>概述</h2><p>这是应用的总体说明...</p></section>
        <section id="features"><h2>模块功能介绍</h2><p>每个功能模块的具体说明...</p></section>
        <section id="about"><h2>关于我们</h2><p>关于开发者...</p></section>
      </div>
      <button className={styles.backBtn} onClick={() => navigate('/user-center')}>返回</button>

      {showMenu && (
        <div className={styles.menuDrawer}>
          <div className={styles.menuTitle}>目录</div>
          <button onClick={() => scrollTo('overview')}>概述</button>
          <button onClick={() => scrollTo('features')}>模块功能介绍</button>
          <button onClick={() => scrollTo('about')}>关于我们</button>
        </div>
      )}
    </div>
  );
}
