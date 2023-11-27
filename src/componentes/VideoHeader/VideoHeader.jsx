import React from 'react'
import { FullNav } from '../navcompleto/navCompleto';

const VideoHeader = () => {
  return (
    <>
    <FullNav />
      
    <div >
      <video id="videofull" src="https://www.mxtvmas.com:8443/mimexico/series/cervantino/Imperdibles.mp4"  autoPlay controls width={"100%"} height={"100%"}></video>
    </div>
    </>
  )
}

export default VideoHeader;