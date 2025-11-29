import React from 'react';
import './mock/index.js';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import useAuthStore from './stores/authStore'; 
import styles from './styles/App.module.css'; 
function Header() { 
  const { user, accessToken, logout } = useAuthStore(); 
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const handleLogout = () => { 
    useAuthStore.getState().logout(); 
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
    localStorage.removeItem('user'); navigate('/login'); 
  }; 

  const hideNavAndActions = !accessToken && location.pathname === '/login';

  return ( 
  <header className={styles.header}> 
  <div 
    className={styles.logo} 
    onClick={() => { 
      if (accessToken) navigate('/'); 
      else if (!hideNavAndActions) navigate('/'); 
  }} 
  > 
  智能医药助手 
  </div> 
  {!hideNavAndActions && ( 
    <> 
     <nav className={styles.nav}> 
      <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : '')}>
       首页
      </NavLink> 
      <NavLink to="/news" className={({ isActive }) => (isActive ? styles.active : '')}> 
       资讯 
      </NavLink> 
      <NavLink to="/chat" className={({ isActive }) => (isActive ? styles.active : '')}> 
       AI 聊天 
      </NavLink> 
      <NavLink to="/user" className={({ isActive }) => (isActive ? styles.active : '')}> 
       个人中心 
      </NavLink> 
     </nav> 
     <div className={styles.actions}> 
      {accessToken ? ( 
        <> 
         <div className={styles.userInfo} onClick={() => navigate('/user')}> 
          <img 
           src={user?.avatar || '/default-avatar.png'} 
           alt="avatar" className={styles.avatar} 
          /> 
          <span className={styles.username}>{user?.name || '用户'}</span>
         </div>
         <button className={styles.logoutBtn} onClick={handleLogout}>
           退出
         </button>
        </>
      ) : ( 
        <button className={styles.loginBtn} onClick={() => navigate('/login')}> 
          登录 
        </button> 
      )} 
     </div> 
    </> )} 
  </header> 
  ); 
} 

function Footer() { 
  return ( 
  <footer className={styles.footer}> 
    <div>© {new Date().getFullYear()} 智能医药助手 &middot; 仅供学习使用</div> 
  </footer> 
  ); 
} 

export default function App() { 
  return ( 
  <div className={styles.app}> 
   <Header /> 
   <main className={styles.main}> 
     <Outlet /> 
   </main> 
   <Footer /> 
  </div> 
  ); 
}