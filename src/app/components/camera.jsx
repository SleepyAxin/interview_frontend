"use client"

import React, { useRef, useCallback } from "react"
import Webcam from "react-webcam"

const Camera = () => 
{
  const webcamRef = useRef(null);

  return (
    <div>
      <h1>摄像头画面展示</h1>
      <Webcam
        audio={ true }
        ref={ webcamRef }
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
        style={{ width: "100%", maxWidth: "600px", borderRadius: "8px", border: "2px solid #ccc" }}
      />
    </div>
  )
}

export default Camera
