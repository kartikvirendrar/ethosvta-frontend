import React, { useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getHbyId } from "../../api/history";
import { toast } from 'react-toastify';
import WaveSurfer from "wavesurfer.js";
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.js';
import ElanPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.elan.js';
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

export default function VtoA() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [audioName, setAN] = useState("");
    const [format, setFormat] = useState("mp4");
    const [comment, setcomment] = useState('');
    var wavesurfer = useRef();
    const timestamps ={
        "20.6":"dasd"
    }
    useEffect(() => {
        getHbyId(id)
            .then((res) => {
                if (res.data.userId === process.env.REACT_APP_ADMIN_ID || window.localStorage.getItem("userid") === process.env.REACT_APP_ADMIN_ID || res.data.userId === window.localStorage.getItem("userid")) {
                    setAN(res.data.audioName);
                    setFormat(res.data.audioFormat);
                    wavesurfer.current = WaveSurfer.create({
                        container:document.querySelector('#wave'),
                        waveColor: '#D9DCFF',
                        progressColor: '#4353FF',
                        cursorColor: '#FFFFFF',
                        barWidth: 3,
                        barRadius: 3,
                        cursorWidth: 1,
                        height: 200,
                        barGap: 3,
                        plugins: [
                            CursorPlugin.create({
                                showTime: true,
                                opacity: 1,
                                color:"#4353FF",
                                customShowTimeStyle: {
                                    "background-color":"#000",
                                    color: '#fff',
                                    padding: '2px',
                                    'font-size': '15px'
                                }
                            }),
                            MarkersPlugin.create({
                                markers: [
                                    {
                                        time: 5.5,
                                        label: "V1",
                                        color: '#ff0000',
                                    },
                                    {
                                        time: 58.21,
                                        label: "V2",
                                        color: '#ff0000',
                                        position: 'top',
                                    }
                                ]
                            }),
                            ElanPlugin.create({
                                container: "#wave-elan",
                                tiers: {
                                    Text: true,
                                    Comments: true
                                }
                            })
                            // TimelinePlugin.create({
                            //     container: "#wave-timeline",
                            //     primaryFontColor: "#FFFFFF",
                            //     secondaryFontColor: "#FFFFFF"
                            // })
                        ]
                    });
                    wavesurfer.current.load(res.data.audioUrl);
                    // wavesurfer.current.zoom(100);
                } else {
                    toast.error("access denied");
                    navigate("/video-to-audio");
                }
            })
            .catch((err) => console.log(err));
    }, [id, navigate]);

    const ordered = Object.keys(timestamps).sort().reduce(
        (obj, key) => { 
          obj[key] = timestamps[key]; 
          return obj;
        }, 
        {}
      );
      
    const addcomment=(event)=>{ 
        setcomment(event.target.value)
    }

    function submitcomment() {
        // CurrentTime2 has timestamp and comment has comment
        // console.log(comment,wavesurfer.current.getCurrentTime())
        const current_time=wavesurfer.current.getCurrentTime()
        timestamps[current_time]=comment
        
        console.log(JSON.stringify(timestamps))
    }


    return (
        <>
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900">
                <div className="mx-auto w-full">
                    {
                        format === "mp4"
                            ?
                            <div>loading ...</div>
                            :
                            <div>
                                <br />
                                <div className="text-white text-center mx-auto font-semibold">{audioName}</div>
                                <br /><br /><br /><br /><br />
                                <div id="wave"></div>
                                <div id="wave-elan"></div>
                                {/* <div id="wave-timeline"></div> */}
                                <br /><br />
                                {/* <audio className="w-full" controls>
                                    <source src={url} type={`audio/${format}`} />
                                </audio> */}
                                <br /><br /><br />
                                <div className="items-center text-center">
                                <button onClick={() => {wavesurfer.current.playPause()}} className="hover:shadow-form w-full max-w-[550px] rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none mb-2">Play/Pause</button>
                                <br />
                                <div className="text-white mx-auto font-semibold">Add Comment   </div>
                                <div> 
                                <input type="text" height="200" placeholder="Add Comment" onChange={addcomment}></input>
                                </div>
                                
                                <button
                                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => submitcomment()}
                                >
                                    Add Comment 
                                </button>
                                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => navigate("/video-to-audio")}>Convert Another Video</button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
