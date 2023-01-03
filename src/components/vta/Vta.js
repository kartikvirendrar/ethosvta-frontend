import React from "react";
import { useState } from "react";
import convert from "./vtalib";
import { uploadAudio } from "../../api/cloudinary";
import { saveHistory } from "../../api/history";
import { useNavigate } from 'react-router-dom';

export default function VTA() {
    const navigate = useNavigate();
    const [video, setVideo] = useState("No Video Selected");
    const [audioF, setAF] = useState("mp3");

    function blobToDataUrl(blob) {
        return new Promise(r => { let a = new FileReader(); a.onload = r; a.readAsDataURL(blob) }).then(e => e.target.result);
    }

    async function convertToAudio() {
        let sourceVideoFile = document.getElementById('video').files[0];
        const varr = video.split(String.fromCharCode(92));
        let convertedAudioDataObj = await convert(sourceVideoFile, audioF);
        console.log(convertedAudioDataObj.data);
        let dataUrl = await blobToDataUrl(convertedAudioDataObj.blb);
        await uploadAudio(dataUrl, convertedAudioDataObj.format)
            .then((res) => {
                let userid = window.localStorage.getItem("userid") || process.env.REACT_APP_ADMIN_ID;
                let audioname = convertedAudioDataObj.name+"."+convertedAudioDataObj.format;
                saveHistory(userid, res.data.url, convertedAudioDataObj.format, String(audioname), varr.at(-1))
                    .then((res) => {
                        navigate(`/video-to-audio/${res.data._id}`);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="flex items-center justify-center p-12 bg-white dark:bg-gray-900">
                <div className="mx-auto w-full max-w-[550px]">
                            <div>
                                <div className="mb-6 pt-4">
                                    <label className="mb-5 block text-xl font-semibold text-white">
                                        Upload Video
                                    </label>

                                    <div className="mb-8">
                                        <input type="file" accept=".mp4, .avi, .mov" name="video" id="video" onChange={(e) => { setVideo(e.target.value); e.preventDefault(); }} className="sr-only" required />
                                        <label
                                            for="video"
                                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                                        >
                                            <div>
                                                <span className="mb-2 block text-xl font-semibold text-white">
                                                    Drop files here
                                                </span>
                                                <span className="mb-2 block text-base font-medium text-white">
                                                    Or
                                                </span>
                                                <span
                                                    className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white"
                                                >
                                                    Browse
                                                </span>
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
                                        <select id="countries" className="border text-center p-1 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-900 dark:border-white dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setAF(e.target.value)}>
                                            <option value="mp3">mp3</option>
                                            <option value="wav">wav</option>
                                            <option value="aac">aac</option>
                                        </select>
                                    </div>

                                </div>


                                <button
                                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={() => convertToAudio()}
                                >
                                    Convert to Audio
                                </button>
                            </div>
                </div>
            </div>
        </>
    );
}
