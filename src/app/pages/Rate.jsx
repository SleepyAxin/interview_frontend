"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Rate = () => {
  const [rates, setRates] = useState([]);

  // 初始化时从 localStorage 加载日志记录
  useEffect(() => {
    const savedRates = JSON.parse(localStorage.getItem("rates")) || [];
    setRates(savedRates);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        面试评价
      </Typography>
      <List>
        {rates.length > 0 ? (
          rates.map((rate, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
              <ListItemText
                primary={rate.message}
                secondary={new Date(rate.timestamp).toLocaleString()}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">暂无面试评价</Typography>
        )}
      </List>
    </Box>
  );
};

export default Rate;