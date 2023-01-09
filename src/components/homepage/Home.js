import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveEmail } from "../../api/newsletter";
import { toast } from 'react-toastify';
import "../../index.css";

export default function Home() {
    const navigate = useNavigate();
    const [email, setEmail] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        saveEmail(email)
            .then((res) => {
                console.log(res.data);
                toast.success("You're now subscribed to newsletter!");
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
                                Best place to convert any video to audio
                            </h1>

                            <div className="mt-8 space-y-5">
                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Clean and Simple Layout</span>
                                </p>

                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Free to Use</span>
                                </p>

                                <p className="flex items-center -mx-2 text-gray-700 dark:text-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                    <span className="mx-2">Easy to Use</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full h-96 lg:w-1/2">
                        <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="glasses" />
                    </div>
                </div>

                <div className="w-full bg-center bg-cover h-[32rem]" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)" }}>
                    <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">Convert Video To <span className="text-blue-400 underline">Audio</span></h1>
                            <button onClick={() => { navigate("/video-to-audio") }} className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Try Now</button>
                        </div>
                    </div>
                </div>

                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 py-10 mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">explore our <br /> awesome <span className="underline decoration-blue-500">Features</span></h1>

                        <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam voluptatibus
                        </p>

                        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                                <span className="inline-block text-blue-500 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                                    </svg>
                                </span>

                                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Video To Audio Converter</h1>

                                <p className="text-gray-500 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                </p>

                                <a href="/video-to-audio" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </a>
                            </div>

                            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                                <span className="inline-block text-blue-500 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                </span>

                                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Audio Comments and Markers</h1>

                                <p className="text-gray-500 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                </p>

                                <a href="/video-to-audio" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </a>
                            </div>

                            <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                                <span className="inline-block text-blue-500 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </span>

                                <h1 className="text-2xl font-semibold text-gray-700 capitalize dark:text-white">Audio to Text and Summarization</h1>

                                <p className="text-gray-500 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident ab nulla quod dignissimos vel non corrupti doloribus voluptatum eveniet
                                </p>

                                <a href="/video-to-audio" className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="container px-6 py-16 mx-auto pattern">
                    <div className="items-center lg:flex">
                        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                            <img className="w-full h-full max-w-md" src="https://merakiui.com/images/components/Email-campaign-bro.svg" alt="email illustration vector art" />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">Subscribe To The <span className="text-blue-500">Newsletter</span></h1>

                                <p className="mt-4 text-gray-600 dark:text-gray-400">be one of the first ones to get <span className="font-medium text-blue-500">newsletter</span> from EthosVTA</p>

                                <div className="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                                    <form onSubmit={handleSubmit} method="POST">
                                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" required />

                                        <button type="submit" className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}