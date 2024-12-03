"use client"
import React, { useState, useEffect } from "react";
import Login from "@/app/pages/Login";
import Register from "@/app/pages/Register";
import Main from "@/app/pages/Main";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // 状态控制当前显示登录还是注册页面

  useEffect(() => {
    // 检查是否有有效的 JWT token
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);  // 登录成功后，显示主界面
  };

  const handleGoToRegister = () => {
    setIsRegistering(true);  // 显示注册页面
  };

  const handleGoToLogin = () => {
    setIsRegistering(false);  // 显示登录页面
  };

  if (isAuthenticated) {
    return <Main />;
  } else if (isRegistering) {
    return <Register onGoToLogin={handleGoToLogin} />;
  } else {
    return <Login onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />;
  }
}
