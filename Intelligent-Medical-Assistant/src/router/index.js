import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import useAuthStore from '../stores/authStore';
import App from '../App.jsx';

// 懒加载页面
const Home = lazy(() => import('../pages/Home'));
const News = lazy(() => import('../pages/News'));
const ChatAI = lazy(() => import('../pages/ChatAI'));
const Login = lazy(() => import('../pages/Login'));
const UserCenter = lazy(() => import('../pages/UserCenter'));
const Settings = lazy(() => import('../pages/Settings'));
const Guide = lazy(() => import('../pages/Guide'));
const Favorites = lazy(() => import('../pages/Favorites'));
const History = lazy(() => import('../pages/History'));

// 登录校验组件
const RequireAuth = ({ children }) => {
  const { accessToken } = useAuthStore();
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// 路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>加载中...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>加载首页...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'news',
        element: (
          <Suspense fallback={<div>加载资讯...</div>}>
            <News />
          </Suspense>
        ),
      },
      {
        path: 'chat',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>加载 AI 聊天...</div>}>
              <ChatAI />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>加载登录...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'user',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>加载个人中心...</div>}>
              <UserCenter />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: 'settings',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>加载设置页面...</div>}>
              <Settings />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: 'guide',
        element: (
          <Suspense fallback={<div>加载使用指南...</div>}>
            <Guide />
          </Suspense>
        ),
      },
      {
        path: 'favorites',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>加载收藏列表...</div>}>
              <Favorites />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: 'history',
        element: (
          <RequireAuth>
            <Suspense fallback={<div>加载浏览历史...</div>}>
              <History />
            </Suspense>
          </RequireAuth>
        ),
      },
      {
        path: 'UserCenter',
        element: <Navigate to="/user" replace />,
      },
      {
        path: 'User',
        element: <Navigate to="/user" replace />,
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
