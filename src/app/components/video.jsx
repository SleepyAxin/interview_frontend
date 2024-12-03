"use client";

import 
{
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers,
} 
from "agora-rtc-react";
import React, { useState, useEffect } from 'react';
import AgoraRTC, { AgoraRTCProvider } from "agora-rtc-react";
import 
{ 
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem
} 
from '@mui/material';
import 
{
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  Call,
  CallEnd
} 
from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VideoGrid = styled(Grid)(({ theme }) => ({ height: '70vh', padding: theme.spacing(2) }));

const VideoBox = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.grey[900],
  position: 'relative',
}));

const ControlsBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export default function Video() 
{
  const [client, setClient] = useState(null);

  useEffect(() => {
    const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    setClient(agoraClient);
  }, []);

  if (!client) return null;

  return (<AgoraRTCProvider client={client}><VideoContent /></AgoraRTCProvider>);
}

const VideoContent = () => {
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState("");
  const [channel, setChannel] = useState("");
  const [token, setToken] = useState("");
  const [ratingOpen, setRatingOpen] = useState(false);
  const [rating, setRating] = useState("");
  const [role, setRole] = useState(""); // New state for role selection

  useJoin({ appid: appId, channel: channel, token: token ? token : null }, calling);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

  const handleCallEnd = () => {
    setCalling(false);
    // Only open rating dialog if user is interviewer
    if (role === 'interviewer') {
      setRatingOpen(true);
    }
  };

  const handleSaveRating = () => {
    const newLog = { message: `评价内容：${rating}`, timestamp: Date.now() };
    const savedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    const updatedLogs = [...savedLogs, newLog];
    localStorage.setItem("logs", JSON.stringify(updatedLogs));
    setRating("");
    setRatingOpen(false);
  };

  return (
    <Container maxWidth="xl">
      {isConnected ? (
        <>
          <VideoGrid container spacing={2}>
            <Grid item xs={12} md={remoteUsers.length > 0 ? 6 : 12}>
              <VideoBox elevation={3}>
                <LocalUser
                  audioTrack={localMicrophoneTrack}
                  cameraOn={cameraOn}
                  micOn={micOn}
                  videoTrack={localCameraTrack}
                >
                  <Typography variant="subtitle1" color="white" 
                    sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                    你
                  </Typography>
                </LocalUser>
              </VideoBox>
            </Grid>

            {/* 远程用户的视频 */}
            {remoteUsers.map((user) => (
              <Grid item xs={12} md={6} key={user.uid}>
                <VideoBox elevation={3}>
                  <RemoteUser user={user}>
                    <Typography variant="subtitle1" color="white"
                      sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                      用户 {user.uid}
                    </Typography>
                  </RemoteUser>
                </VideoBox>
              </Grid>
            ))}
          </VideoGrid>

          <ControlsBox>
            <IconButton 
              onClick={() => setMic(prev => !prev)}
              color={micOn ? "primary" : "error"}
              size="large"
            >
              {micOn ? <Mic /> : <MicOff />}
            </IconButton>
            <IconButton
              onClick={() => setCamera(prev => !prev)}
              color={cameraOn ? "primary" : "error"}
              size="large"
            >
              {cameraOn ? <Videocam /> : <VideocamOff />}
            </IconButton>
            <IconButton
              onClick={handleCallEnd}
              color="error"
              size="large"
            >
              <CallEnd />
            </IconButton>
          </ControlsBox>
        </>
      ) : (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <TextField
            select
            fullWidth
            label="选择身份"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{ maxWidth: 400 }}
          >
            <MenuItem value="interviewer">面试官</MenuItem>
            <MenuItem value="interviewee">面试人</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <TextField
            fullWidth
            label="频道名称"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <TextField
            fullWidth
            label="令牌"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <Button
            variant="contained"
            disabled={!appId || !channel || !role} // Added role to disable condition
            onClick={() => setCalling(true)}
            startIcon={<Call />}
            sx={{ mt: 2 }}
          >
            加入频道
          </Button>
        </Box>
      )}
      <Dialog open={ratingOpen} onClose={() => setRatingOpen(false)}>
        <DialogTitle>评价面试者</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="请输入您的评价"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveRating} variant="contained">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};