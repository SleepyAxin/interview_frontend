"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Order = () => {
  const [appointments, setAppointments] = useState([]); // 存储所有预约
  const [openDialog, setOpenDialog] = useState(false); // 控制弹窗状态
  const [newAppointment, setNewAppointment] = useState({ title: "", date: "" }); // 新的预约信息

  // 初始化时从 localStorage 加载数据
  useEffect(() => {
    const savedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(savedAppointments);
  }, []);

  // 保存数据到 localStorage
  const saveAppointments = (data) => {
    setAppointments(data);
    localStorage.setItem("appointments", JSON.stringify(data));
  };

  // 打开弹窗
  const handleOpenDialog = () => setOpenDialog(true);

  // 关闭弹窗
  const handleCloseDialog = () => setOpenDialog(false);

  // 更新新预约信息
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // 添加新预约
  const handleConfirm = () => {
    if (!newAppointment.title || !newAppointment.date) {
      alert("请填写完整的面试信息！");
      return;
    }
    const updatedAppointments = [...appointments, newAppointment];
    saveAppointments(updatedAppointments);
    setNewAppointment({ title: "", date: "" });
    handleCloseDialog();
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        面试预约
      </Typography>

      <Button variant="contained" onClick={handleOpenDialog} sx={{ mb: 2 }}>
        新增预约
      </Button>

      <List>
        {appointments.length > 0 ? (
          appointments.map((appt, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={`面试标题: ${appt.title}`}
                secondary={`时间: ${new Date(appt.date).toLocaleString()}`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">暂无预约</Typography>
        )}
      </List>

      {/* 弹窗 */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>新增面试预约</DialogTitle>
        <DialogContent>
          <TextField
            label="面试标题"
            name="title"
            value={newAppointment.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="面试时间"
            name="date"
            type="datetime-local"
            value={newAppointment.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button onClick={handleConfirm} variant="contained">
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Order;
