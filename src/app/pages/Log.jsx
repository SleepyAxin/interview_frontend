"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Log = () => {
  const [logs, setLogs] = useState([]);

  // 初始化时从 localStorage 加载日志记录
  useEffect(() => {
    const savedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(savedLogs);
  }, []);

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
