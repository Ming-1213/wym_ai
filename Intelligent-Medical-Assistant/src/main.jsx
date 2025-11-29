console.log('[main] loaded');
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import './mock/index.js'
import Home from "./pages/Home";
import News from "./pages/News";
import ChatAI from "./pages/ChatAI";
import UserCenter from "./pages/UserCenter";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Guide from "./pages/Guide";
import Settings from "./pages/Settings";
import History from "./pages/History";
import Favorites from "./pages/Favorites";
import "./index.css";
import "./styles/App.module.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="chat" element={<ChatAI />} />
          <Route path="user" element={<UserCenter />} />
          <Route path="settings" element={<Settings />} />
          <Route path="guide" element={<Guide />} />
          <Route path="history" element={<History />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
