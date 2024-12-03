"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const Log = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data);
    } catch (err) {
      alert("加载日志失败");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        日志
      </Typography>
      <List>
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={log.message}
                secondary={new Date(log.timestamp).toLocaleString()}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">暂无日志记录</Typography>
        )}
      </List>
    </Box>
  );
};

export default Log;
