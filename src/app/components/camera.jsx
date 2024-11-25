"use client"

import React, { useRef, useCallback } from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = useRef(null);

  return (
    <div>
      <h1>摄像头画面展示</h1>
      {/* 摄像头组件 */}
      <Webcam
        audio={true} // 是否启用麦克风
        ref={webcamRef} // 获取引用
        screenshotFormat="image/jpeg" // 截图格式
        videoConstraints={{
          width: 1280, // 视频宽度
          height: 720, // 视频高度
          facingMode: "user", // 前置摄像头
        }}
        style={{
          width: "100%", // 视频全屏展示
          maxWidth: "600px", // 最大宽度限制
          borderRadius: "8px", // 圆角
          border: "2px solid #ccc", // 边框
        }}
      />
    </div>
  );
};

export default Camera;
