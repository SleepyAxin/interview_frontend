"use client"
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const Login = ({ onLoginSuccess, onGoToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);  // 保存 token
      onLoginSuccess();  // 调用父组件的成功登录函数
    } catch (err) {
      setError(err.response?.data?.message || "登录失败");
    }
  };

  return (
    <div>
      <Typography variant="h4">登录</Typography>
      <TextField
        label="用户名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="密码"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button onClick={handleLogin} variant="contained" color="primary">
        登录
      </Button>

      <div style={{ marginTop: "10px" }}>
        <Typography variant="body2">
          还没有账户？ <Button onClick={onGoToRegister}>注册</Button>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
