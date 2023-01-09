import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { addSubText, getHbyId, updComByID } from "../../api/history";
import { toast } from 'react-toastify';
import WaveSurfer from "wavesurfer.js";
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor.js';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.js';
import { AudioToText } from "../../api/audioToText";
// import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.js';

export default function VtoA() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [audioName, setAN] = useState("");
    const [format, setFormat] = useState("mp4");
    const [comments, setcomments] = useState([]);
    const [comment, setcomment] = useState("comment");
    const [audioUrl, setAudioUrl] = useState("");
    const [subtitle, setSubtitle] = useState("/");
    const [text, setText] = useState("/");
    const [sub, setSub] = useState("SUBTITLES");

    var wavesurfer = useRef();

    useEffect(() => {
        getHbyId(id)
            .then((res) => {
                if (res.data.userId === process.env.REACT_APP_ADMIN_ID || window.localStorage.getItem("userid") === process.env.REACT_APP_ADMIN_ID || res.data.userId === window.localStorage.getItem("userid")) {
                    setAN(res.data.audioName);
                    setFormat(res.data.audioFormat);
                    let comm = [];
                    if (res.data.comments !== undefined) {
                        setcomments(JSON.parse(res.data.comments));
                        comm = JSON.parse(res.data.comments);
                    }
                    if (res.data.subtitle !== undefined) {
                        setSubtitle(JSON.parse(res.data.subtitle));
                        setText(JSON.parse(res.data.text));
                    }
                    wavesurfer.current = WaveSurfer.create({
                        container: document.querySelector('#wave'),
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
                                color: "#4353FF",
                                customShowTimeStyle: {
                                    "background-color": "#000",
                                    color: '#fff',
                                    padding: '2px',
                                    'font-size': '15px'
                                }
                            }),
                            MarkersPlugin.create({
                                markers: [{
                                    time: 0,
                                    label: "comment",
                                    color: '#fff000',
                                    draggable: true,
                                    position: "top"
                                }]
                            }),
                            // TimelinePlugin.create({
                            //     container: "#wave-timeline",
                            //     primaryFontColor: "#FFFFFF",
                            //     secondaryFontColor: "#FFFFFF"
                            // })
                        ]
                    });
                    wavesurfer.current.load(res.data.audioUrl);
                    setAudioUrl(res.data.audioUrl);
                    wavesurfer.current.on('ready', function () {
                        wavesurfer.current.addMarker({
                            time: wavesurfer.current.getDuration(),
                            label: "comment",
                            color: '#fff000',
                            draggable: true,
                            position: "top"
                        });
                    });
                    const colors = ["green", "blue", "red", "white", "orange", "pink", "purple"];
                    comm.map((c) => {
                        const randomize = Math.floor(Math.random() * colors.length);
                        wavesurfer.current.addMarker({
                            time: c.from,
                            label: c.comment,
                            color: colors[randomize]
                        });
                        wavesurfer.current.addMarker({
                            time: c.to,
                            label: c.comment,
                            color: colors[randomize]
                        });
                        return 0;
                    });
                    if (res.data.subtitle !== undefined) {
                        const ssub = JSON.parse(res.data.subtitle);
                        wavesurfer.current.on('audioprocess', function () {
                            let time = wavesurfer.current.getCurrentTime();
                            for(var i in ssub){
                                if (ssub[i].from<=time && ssub[i].to>=time) {
                                    setSub(ssub[i].text);
                                    break;
                                }
                            }
                        });
                    }
                    // wavesurfer.current.zoom(100);
                } else {
                    toast.error("access denied");
                    navigate("/video-to-audio");
                }
            })
            .catch((err) => { console.log(err); });
    }, [id, navigate]);

    function audioToText() {
        setSubtitle("-");
        AudioToText(audioUrl)
            .then((res) => {
                // console.log(res.data.subs);
                setSubtitle(res.data.subs);
                setText(res.data.text);
                addSubText(id, JSON.stringify(res.data.subs), JSON.stringify(res.data.text))
                    .then(() => {
                        toast.success("Subtitles Saved");
                    })
                    .catch((err) => { console.log(err); });
            })
            .catch((err) => { console.log(err); });
    }

    function submitcomment() {
        let markersArr = wavesurfer.current.markers.markers;
        let commentM = [];
        let from, to;
        for (var i in markersArr) {
            if (markersArr[i].label === "comment") {
                commentM.push(markersArr[i].time);
            }
        }
        if (commentM[0] > commentM[1]) {
            from = commentM[1];
            to = commentM[0];
        } else {
            from = commentM[0];
            to = commentM[1];
        }
        const comm = { from: from, to: to, comment: comment };
        let tf = false;
        for (let i in comments) {
            if (comments[i].from === from && comments[i].to === to) {
                comments[i].comment = comment;
                tf = true;
                break;
            }
        }
        if (!tf) {
            comments.push(comm);
        }
        setcomment("");
        document.getElementById("commentinput").value = "";
    }

    function deletecomment(from, to) {
        const comm = comments;
        const cloc = [];
        for (let i in comm) {
            if (comm[i].from === from && comm[i].to === to) {
                console.log(comm[i].comment);
            } else {
                cloc.push(comm[i]);
            }
        }
        console.log(cloc);
        setcomments(cloc);
    }

    function saveCommentsToDB() {
        let comm = JSON.stringify(comments);;
        updComByID(id, comm)
            .then((res) => {
                console.log(res.data);
                toast.success("Comments Saved");
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    async function downloadAudio() {
        let a = document.createElement("a");
        let blob = await fetch(audioUrl).then(r => r.blob());
        a.href = URL.createObjectURL(blob);
        a.download = audioName;
        a.click();
    }

    return (
        <>
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900 pattern">
                <div className="mx-auto w-full">
                    {
                        format === "mp4"
                            ?
                            <div className="text-center my-32">
                                <br /><br /><br />
                                <div className="lds-dual-ring"></div>
                                <br /><br /><br />
                            </div>
                            :
                            <div>
                                <br />
                                <div className="text-white text-center mx-auto font-semibold">{audioName}</div>
                                <br /><br /><br />
                                <div id="wave"></div>
                                <div id="wave-elan"></div>
                                {/* <div id="wave-timeline"></div> */}
                                {/* <audio className="w-full" controls>
                                    <source src={url} type={`audio/${format}`} />
                                </audio> */}
                                <br />
                                {text !== "/" && <input type="text" className="block w-full text-center rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={sub} disabled/>}
                                <br /><br />
                                <div className="flex justify-around">
                                    <button onClick={() => { wavesurfer.current.skip(-15) }} className="hover:shadow-form w-full max-w-[200px] rounded-md bg-indigo-600 hover:bg-indigo-700 py-3 px-8 text-base font-semibold text-white outline-none mb-2"><svg className="mx-auto h-6 w-6" fill="none"><path d="M6.22 11.03a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM3 6.75l-.53-.53a.75.75 0 0 0 0 1.06L3 6.75Zm4.28-3.22a.75.75 0 0 0-1.06-1.06l1.06 1.06ZM13.5 18a.75.75 0 0 0 0 1.5V18ZM7.28 9.97 3.53 6.22 2.47 7.28l3.75 3.75 1.06-1.06ZM3.53 7.28l3.75-3.75-1.06-1.06-3.75 3.75 1.06 1.06Zm16.72 5.47c0 2.9-2.35 5.25-5.25 5.25v1.5a6.75 6.75 0 0 0 6.75-6.75h-1.5ZM15 7.5c2.9 0 5.25 2.35 5.25 5.25h1.5A6.75 6.75 0 0 0 15 6v1.5ZM15 6H3v1.5h12V6Zm0 12h-1.5v1.5H15V18Z" fill="#fff"></path><path d="M3 15.75h.75V21" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 16.5A.75.75 0 0 0 9 15v1.5Zm-2.25-.75V15a.75.75 0 0 0-.75.75h.75Zm0 2.25H6c0 .414.336.75.75.75V18Zm0 2.25a.75.75 0 0 0 0 1.5v-1.5ZM9 15H6.75v1.5H9V15Zm-3 .75V18h1.5v-2.25H6Zm.75 3h1.5v-1.5h-1.5v1.5Zm1.5 1.5h-1.5v1.5h1.5v-1.5ZM9 19.5a.75.75 0 0 1-.75.75v1.5a2.25 2.25 0 0 0 2.25-2.25H9Zm-.75-.75a.75.75 0 0 1 .75.75h1.5a2.25 2.25 0 0 0-2.25-2.25v1.5Z" fill="#FFF"></path></svg></button>
                                    <button onClick={() => { wavesurfer.current.playPause() }} className="hover:shadow-form w-full max-w-[400px] rounded-md bg-red-600 hover:bg-red-700 py-3 px-8 text-base font-semibold text-white outline-none mb-2"><svg className="mx-auto h-10 w-10" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M13.5 13.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L16.28 27.99c-1.25.687-2.779-.217-2.779-1.643V13.653Z" fill="#fff"></path></svg></button>
                                    <button onClick={() => { wavesurfer.current.skip(15) }} className="hover:shadow-form w-full max-w-[200px] rounded-md bg-indigo-600 hover:bg-indigo-700 py-3 px-8 text-base font-semibold text-white outline-none mb-2"><svg className="mx-auto h-6 w-6" fill="none"><path d="M16.72 9.97a.75.75 0 1 0 1.06 1.06l-1.06-1.06ZM21 6.75l.53.53a.75.75 0 0 0 0-1.06l-.53.53Zm-3.22-4.28a.75.75 0 1 0-1.06 1.06l1.06-1.06ZM10.5 19.5a.75.75 0 0 0 0-1.5v1.5Zm3.75-4.5a.75.75 0 0 0 0 1.5V15Zm.75.75h.75A.75.75 0 0 0 15 15v.75ZM14.25 21a.75.75 0 0 0 1.5 0h-1.5Zm6-4.5a.75.75 0 0 0 0-1.5v1.5ZM18 15.75V15a.75.75 0 0 0-.75.75H18ZM18 18h-.75c0 .414.336.75.75.75V18Zm0 2.25a.75.75 0 0 0 0 1.5v-1.5Zm-.22-9.22 3.75-3.75-1.06-1.06-3.75 3.75 1.06 1.06Zm3.75-4.81-3.75-3.75-1.06 1.06 3.75 3.75 1.06-1.06ZM2.25 12.75A6.75 6.75 0 0 0 9 19.5V18a5.25 5.25 0 0 1-5.25-5.25h-1.5ZM9 6a6.75 6.75 0 0 0-6.75 6.75h1.5C3.75 9.85 6.1 7.5 9 7.5V6Zm0 1.5h12V6H9v1.5Zm0 12h1.5V18H9v1.5Zm5.25-3H15V15h-.75v1.5Zm0-.75V21h1.5v-5.25h-1.5Zm6-.75H18v1.5h2.25V15Zm-3 .75V18h1.5v-2.25h-1.5Zm.75 3h1.5v-1.5H18v1.5Zm1.5 1.5H18v1.5h1.5v-1.5Zm.75-.75a.75.75 0 0 1-.75.75v1.5a2.25 2.25 0 0 0 2.25-2.25h-1.5Zm-.75-.75a.75.75 0 0 1 .75.75h1.5a2.25 2.25 0 0 0-2.25-2.25v1.5Z" fill="#FFF"></path></svg></button>
                                </div>
                                <br />
                                {/* <div className="text-white mx-auto font-semibold">Add Comment   </div>
                                <div> 
                                <input type="text" height="200" placeholder="Add Comment" onChange={addcomment}></input>
                                </div>
                                <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => submitcomment()} >Add Comment</button>
                                <br/> */}

                                <div className="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Comments</h5>
                                    <div className="flex">
                                        {/* <input type="text" className="block rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={`From Time: $`} disabled /> */}
                                        {/* <input type="text" className="block rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={`From Time: $`} disabled /> */}
                                        <input id="commentinput" type="text" className="block w-full rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={comment} onChange={(e) => { setcomment(e.target.value) }} />
                                        <button className="inline-flex justify-center border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => { submitcomment(0) }} >Add</button>
                                        <button className="inline-flex justify-center rounded-r-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => { saveCommentsToDB() }}>Save</button>
                                    </div>
                                    <br />
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        From Time
                                                    </th>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        To Time
                                                    </th>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        Comment
                                                    </th>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        Delete
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {comments.map((arr) => (
                                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                        <th scope="row" className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <button onClick={() => { wavesurfer.current.setCurrentTime(arr.from) }} className="hover:underline">{arr.from}</button>
                                                        </th>
                                                        <th scope="row" className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            <button onClick={() => { wavesurfer.current.setCurrentTime(arr.to) }} className="hover:underline">{arr.to}</button>
                                                        </th>
                                                        <td className="px-6 py-4 text-center">
                                                            {arr.comment}
                                                        </td>
                                                        <td className="text-center px-6 py-4">
                                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => { deletecomment(arr.from, arr.to) }}>Delete</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* <br />
                                <div className="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Equalizer</h5>
                                    <div id="equalizer">
                                        <input type="range" min="-40" max="40" title="32" className="vertical"/>
                                        <input type="range" min="-40" max="40" title="64"/>
                                        <input type="range" min="-40" max="40" title="125"/>
                                        <input type="range" min="-40" max="40" title="250"/>
                                        <input type="range" min="-40" max="40" title="500"/>
                                        <input type="range" min="-40" max="40" title="1000"/>
                                        <input type="range" min="-40" max="40" title="2000"/>
                                        <input type="range" min="-40" max="40" title="4000"/>
                                        <input type="range" min="-40" max="40" title="8000"/>
                                        <input type="range" min="-40" max="40" title="16000"/>
                                    </div>
                                </div> */}

                                <br />
                                <div className="w-full p-4 text-center bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                                    <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Subtitles</h5>
                                    {subtitle === "/" &&
                                        <button className="hover:shadow-form w-full mt-4 rounded-md bg-red-600 hover:bg-red-700 py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => { audioToText() }}>Generate</button>
                                    }
                                    {subtitle === "-" &&
                                        <div className="text-center my-32">
                                            <br /><br /><br />
                                            <div className="lds-dual-ring"></div>
                                            <br /><br /><br />
                                        </div>
                                    }
                                    {text !== "/" &&
                                        <div>
                                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        From
                                                    </th>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        To
                                                    </th>
                                                    <th scope="col" className="text-center px-6 py-3">
                                                        Subtitle
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {subtitle.map((arr) => (
                                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                                        <td className="px-6 py-4 text-center">
                                                            {arr.from}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {arr.to}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {arr.text}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <br/>
                                        {/* <div className="text-white text-justify">{text}</div> */}
                                        </div>
                                    }
                                </div>
                                <button className="hover:shadow-form w-full mt-8 mb-6 rounded-md bg-red-600 hover:bg-red-700 py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => { downloadAudio() }}>Download Audio</button>
                                <button className="hover:shadow-form w-full rounded-md bg-indigo-600 hover:bg-indigo-700 py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => navigate("/video-to-audio")}>Convert Another Video</button>
                            </div>
                    }
                </div>
            </div>
        </>
    );
}
