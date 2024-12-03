"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const Order = () => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    assignedUser: "",
  });

  // 初始化时从后端加载数据
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAppointments(response.data);
    } catch (err) {
      alert("加载预约失败");
    }
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirm = async () => {
    const { title, date, assignedUser } = newAppointment;

    if (!title || !date) {
      alert("请填写完整的面试信息！");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/appointments",
        { title, date, assignedUser },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchAppointments();
      setNewAppointment({ title: "", date: "", assignedUser: "" });
      handleCloseDialog();
    } catch (err) {
      alert("添加预约失败");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAppointments();
    } catch (err) {
      alert("删除预约失败");
    }
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
          appointments.map((appt) => (
            <ListItem key={appt.id} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={`面试标题: ${appt.title}`}
                secondary={`时间: ${new Date(appt.date).toLocaleString()}，指定用户: ${
                  appt.assigned_user || "无"
                }`}
              />
              {appt.canCancel && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(appt.id)}
                  sx={{ ml: 2 }}
                >
                  取消
                </Button>
              )}
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">暂无预约</Typography>
        )}
      </List>

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
            sx={{ mb: 2 }}
          />
          <TextField
            label="指定用户名"
            name="assignedUser"
            value={newAppointment.assignedUser}
            onChange={handleChange}
            fullWidth
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
