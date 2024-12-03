"use client"
import React, { useState } from "react"
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import CameraIcon from "@mui/icons-material/Camera"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import BookIcon from "@mui/icons-material/Book"

import Interview from "@/app/pages/interview"
import Order from "@/app/pages/Order"
import Log from "@/app/pages/Log";

const Main = () => 
{
  const [ activePage, setActivePage ] = useState("introduction")

  // 菜单项
  const menuItems = 
  [
    { label: "介绍", icon: <HomeIcon />, page: "introduction" },
    { label: "面试", icon: <CameraIcon />, page: "interview" },
    { label: "面试预约", icon: <CalendarTodayIcon />, page: "order" },
    { label: "日志", icon: <BookIcon />, page: "log" }
  ]

  // 切换页面
  const renderPageContent = () => 
  {
    switch (activePage) 
    {
      case "home": return <Typography variant="h4">这是首页内容</Typography>;
      case "interview": return <Interview />;
      case "order": return <Order />;
      case "log": return <Log />;
      default: return null;
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240 }}>
          <Typography variant="h6" sx={{ textAlign: "center", p: 2 }}>侧边栏</Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.page} disablePadding>
                <ListItemButton selected={activePage === item.page} onClick={() => setActivePage(item.page)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: "240px" }}>{renderPageContent()}</Box>
    </Box>
  )
}

export default Main