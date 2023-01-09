import React from "react";
import { useState } from "react";
import convert from "./vtalib";
import { uploadAudio } from "../../api/cloudinary";
import { saveHistory } from "../../api/history";
import { useNavigate } from 'react-router-dom';
import convert2 from "./vtalib2";
import { toast } from 'react-toastify';
import "../../index.css";

export default function VTA() {
    const navigate = useNavigate();
    const [video, setVideo] = useState("No Video Selected");
    const [audio, setAudio] = useState("No Audio Selected");
    const [audioF, setAF] = useState("wav");
    const [videoSel, setVideoSel] = useState("1");
    const [videoLink, setVideoL] = useState("");
    const [videoName, setVideoName] = useState("sampleVideo");
    const [audioName, setAudioName] = useState("sampleAudio");
    const [audioLink, setAudioL] = useState("");

    function blobToDataUrl(blob) {
        return new Promise(r => { let a = new FileReader(); a.onload = r; a.readAsDataURL(blob) }).then(e => e.target.result);
    }

    async function convertToAudio() {
        let sourceVideoFile, convertedAudioDataObj, varr, dataUrl;
        if (videoSel === "1") {
            setVideoSel("5");
            sourceVideoFile = document.getElementById('video').files[0];
            convertedAudioDataObj = await convert(sourceVideoFile, audioF);
            console.log(convertedAudioDataObj);
            varr = video.split(String.fromCharCode(92));
            dataUrl = await blobToDataUrl(convertedAudioDataObj.blb);
        } else if (videoSel === "2") {
            setVideoSel("5");
            let blob = await fetch(videoLink).then(r => r.blob());
            sourceVideoFile = blob;
            convertedAudioDataObj = await convert2(sourceVideoFile, audioF, videoName);
            console.log(convertedAudioDataObj);
            varr = "Video from link : " + videoLink;
            dataUrl = await blobToDataUrl(convertedAudioDataObj.blb);
        }
        else if (videoSel === "3") {
            setVideoSel("5");
            sourceVideoFile = document.getElementById('audio').files[0];
            var reader = new FileReader();
            reader.readAsDataURL(sourceVideoFile);
            reader.onload = async function () {
                await uploadAudio(reader.result, convertedAudioDataObj.format)
                    .then((res) => {
                        console.log(res.data.url);
                        let userid = window.localStorage.getItem("userid") || process.env.REACT_APP_ADMIN_ID;
                        let audioname = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
                        saveHistory(userid, res.data.url, convertedAudioDataObj.format, String(audioname), varr.at(-1), '[]')
                            .then((res) => {
                                navigate(`/video-to-audio/${res.data._id}`);
                            })
                            .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
                    })
                    .catch((err) => { console.log(err); toast.error("Please try again");; window.location.reload(); });
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                toast.errot("Please try again");
                ; window.location.reload();
            };
            varr = audio.split(String.fromCharCode(92));
            let a = varr.at(-1).split(".");
            convertedAudioDataObj = { name: a.at(0), format: a.at(-1) };
        }
        else if (videoSel === "4") {
            setVideoSel("5");
            let userid = window.localStorage.getItem("userid") || process.env.REACT_APP_ADMIN_ID;
            let a = audioLink.split(".");
            saveHistory(userid, audioLink, a.at(-1), audioName + "." + a.at(-1), "Audio from link : " + audioLink, '[]')
                .then((res) => {
                    navigate(`/video-to-audio/${res.data._id}`);
                })
                .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
        }
        if (videoSel === "1" || videoSel === "2") {
            await uploadAudio(dataUrl, convertedAudioDataObj.format)
                .then((res) => {
                    let userid = window.localStorage.getItem("userid") || process.env.REACT_APP_ADMIN_ID;
                    let audioname = convertedAudioDataObj.name + "." + convertedAudioDataObj.format;
                    saveHistory(userid, res.data.url, convertedAudioDataObj.format, String(audioname), varr.at(-1), '[]')
                        .then((res) => {
                            navigate(`/video-to-audio/${res.data._id}`);
                        })
                        .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
                })
                .catch((err) => { console.log(err); toast.error("Please try again"); window.location.reload(); });
        }
    }

    return (
        <>
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900">
                <div className="mx-auto w-full max-w-[550px]">
                    <div className="text-center text-xl font-bold text-white">Video To Audio Converter</div>
                    <br />
                    <div className="flex flex-col">
                        <select id="countries" className="border text-center p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setVideoSel(e.target.value)}>
                            <option value="1">Upload Video from Device</option>
                            <option value="2">Upload Video from Link</option>
                            <option value="3">Upload Audio from Device</option>
                            <option value="4">Upload Audio from Link</option>
                        </select>
                    </div>
                    <div>
                        <div className="mb-6 pt-4">
                            {videoSel === "1" &&
                                <div>
                                    <label className="mb-5 block text-xl font-semibold text-white">
                                        Upload Video
                                    </label>

                                    <div className="mb-8">
                                        <input type="file" accept=".mp4, .avi, .mov" name="video" id="video" onChange={(e) => { setVideo(e.target.value); e.preventDefault(); }} className="sr-only" required />
                                        <label
                                            for="video"
                                            className="pattern relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                                        >
                                            <div>
                                                <span className="mb-2 block text-xl font-semibold text-white">
                                                    Drop files here
                                                </span>
                                                <span className="mb-2 block text-base font-medium text-white">
                                                    Or
                                                </span>
                                                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white">Browse</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="mb-5 rounded-md py-4 px-8">
                                        <div className="text-center rounded-md border border-dashed border-white">
                                            <span className="truncate pr-3 font-medium text-white">
                                                {video}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-white text-base font-large my-auto pr-4">Output Audio Format : </h3>
                                        <select id="countries" className="border text-center p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setAF("wav") }>
                                            <option value="mp3">mp3</option>
                                            <option value="wav">wav</option>
                                            <option value="aac">aac</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            {videoSel === "2" &&
                                <div>
                                    <div className="mt-16 mb-8 flex rounded-md shadow-sm">
                                        <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-white bg-gray-900 px-3 text-sm text-white">Video Link</span>
                                        <input type="text" className="block w-full text-white flex-1 bg-gray-800 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com" onChange={(e) => { setVideoL(e.target.value) }} required />
                                    </div>
                                    <div className="mb-16 flex rounded-md shadow-sm">
                                        <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-white bg-gray-900 px-3 text-sm text-white">Video Name</span>
                                        <input type="text" className="block w-full text-white flex-1 bg-gray-800 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={videoName} onChange={(e) => { setVideoName(e.target.value) }} required />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-white text-base font-large my-auto pr-4">Output Audio Format : </h3>
                                        <select id="countries" className="border text-center p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setAF("wav")}>
                                            <option value="mp3">mp3</option>
                                            <option value="wav">wav</option>
                                            <option value="aac">aac</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            {videoSel === "3" &&
                                <div>
                                    <label className="mb-5 block text-xl font-semibold text-white">
                                        Upload Audio
                                    </label>

                                    <div className="mb-8">
                                        <input type="file" accept=".mp3, .wav, .aac" name="audio" id="audio" onChange={(e) => { setAudio(e.target.value); e.preventDefault(); }} className="sr-only" required />
                                        <label
                                            for="audio"
                                            className="pattern relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer"
                                        >
                                            <div>
                                                <span className="mb-2 block text-xl font-semibold text-white">
                                                    Drop files here
                                                </span>
                                                <span className="mb-2 block text-base font-medium text-white">
                                                    Or
                                                </span>
                                                <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white">Browse</span>
                                            </div>
                                        </label>
                                    </div>

                                    <div className="mb-5 rounded-md py-4 px-8">
                                        <div className="text-center rounded-md border border-dashed border-white">
                                            <span className="truncate pr-3 font-medium text-white">
                                                {audio}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                            {videoSel === "4" &&
                                <div>
                                    <br />
                                    <div className="mt-16 mb-8 flex rounded-md shadow-sm">
                                        <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-white bg-gray-900 px-3 text-sm text-white">Audio Link</span>
                                        <input type="text" className="block w-full text-white flex-1 bg-gray-800 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com" onChange={(e) => { setAudioL(e.target.value) }} required />
                                    </div>
                                    <div className="mb-16 flex rounded-md shadow-sm">
                                        <span className="w-28 inline-flex items-center rounded-l-md border border-r-0 border-white bg-gray-900 px-3 text-sm text-white">Audio Name</span>
                                        <input type="text" className="block w-full text-white flex-1 bg-gray-800 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={audioName} onChange={(e) => { setAudioName(e.target.value) }} required />
                                    </div>
                                    <br />
                                </div>
                            }
                            {videoSel === "5" &&
                                <div className="text-center my-32">
                                    <div className="lds-dual-ring"></div>
                                </div>
                            }

                        </div>

                        <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => convertToAudio()}>Convert to Audio</button>
                    </div>
                </div>
            </div>
        </>
    );
}
