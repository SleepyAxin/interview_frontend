"use client";

import dynamic from 'next/dynamic'
import React from 'react';

const Video = dynamic(() => import('./video'), {ssr: false })
const VideoWrapper = () => { return <Video /> }

export default VideoWrapper