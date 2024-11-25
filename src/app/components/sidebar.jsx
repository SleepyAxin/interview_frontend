"use client"

import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

import Camera from "@/app/components/camera"

const Sidebar = () => {
  const [activePage, setActivePage] = useState("home");

  // 菜单项
  const menuItems = [
    { label: "首页", icon: <HomeIcon />, page: "home" },
    { label: "设置", icon: <SettingsIcon />, page: "settings" },
  ];

  // 切换页面
  const renderPageContent = () => {
    switch (activePage) {
      case "home":
        return <Typography variant="h4">这是首页内容</Typography>;
      case "settings":
        return <Camera></Camera>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* 侧边栏 */}
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240 }}>
          <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>
            侧边栏
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.page} disablePadding>
                <ListItemButton
                  selected={activePage === item.page}
                  onClick={() => setActivePage(item.page)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* 内容区 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "240px", // 确保内容区不被侧边栏遮挡
        }}
      >
        {renderPageContent()}
      </Box>
    </Box>
  );
};

export default Sidebar;
