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
  IconButton
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

const options = 
{
  appId: "7b4181fdc5ec4a388fb0d5fa81068ffd",
  channel: "Interview",
  token: "007eJxTYDjPHJfVVBlU9E1s7coGzdYjSdEvDotMkXJXNbiSW+PFc0uBwTzJxNDCMC0l2TQ12STR2MIiLckgxTQt0cLQwMwiLS0lKsY1vSGQkUG+cCczIwMEgvicDJ55JalFZZmp5QwMAI8VIBU=",
  uid: null,
};

const VideoGrid = styled(Grid)(({ theme }) => ({ height: '70vh',padding: theme.spacing(2) }));

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

const VideoContent = () => 
{
  const [calling, setCalling] = useState(false);
  const isConnected = useIsConnected();
  const [appId, setAppId] = useState("");
  const [channel, setChannel] = useState("");
  const [token, setToken] = useState("");

  useJoin({appid: appId, channel: channel, token: token ? token : null}, calling);

  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);
  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();

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
                    You
                  </Typography>
                </LocalUser>
              </VideoBox>
            </Grid>

            {/* Remote Users Video */}
            {remoteUsers.map((user) => (
              <Grid item xs={12} md={6} key={user.uid}>
                <VideoBox elevation={3}>
                  <RemoteUser user={user}>
                    <Typography variant="subtitle1" color="white"
                      sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                      {user.uid}
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
              onClick={() => setCalling(prev => !prev)}
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
            fullWidth
            label="App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <TextField
            fullWidth
            label="Channel Name"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <TextField
            fullWidth
            label="Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{ maxWidth: 400 }}
          />
          <Button
            variant="contained"
            disabled={!appId || !channel}
            onClick={() => setCalling(true)}
            startIcon={<Call />}
            sx={{ mt: 2 }}
          >
            Join Channel
          </Button>
        </Box>
      )}
    </Container>
  );
};