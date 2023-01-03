import React from "react";
import WaveSurfer from "wavesurfer.js";

var wavesurfer = WaveSurfer.create({
    container: '#root'
});

wavesurfer.load('https://res.cloudinary.com/dyr4hl32b/video/upload/v1672418918/ethosAudioFiles/longLengthTestAudio_lbpkjy.mp3');

export default function Wsurf(){
 return (
    <div>gggg</div>
);
}
