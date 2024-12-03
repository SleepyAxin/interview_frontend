"use client"
import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const Register = ({ onGoToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("密码和确认密码不一致");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      setSuccessMessage("注册成功！请登录。");
      setError("");  // 清除错误信息
    } catch (err) {
      setError(err.response?.data?.message || "注册失败");
    }
  };

  return (
    <div>
      <Typography variant="h4">注册</Typography>
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
      <TextField
        label="确认密码"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
      <Button onClick={handleRegister} variant="contained" color="primary">
        注册
      </Button>

      <div style={{ marginTop: "10px" }}>
        <Typography variant="body2">
          已有账户？ <Button onClick={onGoToLogin}>登录</Button>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
