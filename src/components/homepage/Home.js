import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {saveEmail} from "../../api/newsletter";
import { toast } from 'react-toastify';

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
              .catch((err) => 
              {console.log(err);
        });
          };
    return (
    <>
    <section className="bg-white dark:bg-gray-900">
    <div className="container flex flex-col px-6 py-10 mx-auto space-y-6 lg:h-[32rem] lg:py-16 lg:flex-row lg:items-center">
        <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
                <h1 className="text-3xl font-bold tracking-wide text-gray-800 dark:text-white lg:text-5xl">
                    Best place to create and keep a track of day to day tasks
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
            <img className="object-cover w-full h-full mx-auto rounded-md lg:max-w-2xl" src="https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="glasses"/>
        </div>
    </div>

    <div className="w-full bg-center bg-cover h-[32rem]" style={{backgroundImage: "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"}}>
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-white uppercase lg:text-3xl">Create your new <span className="text-blue-400 underline">Tasks</span></h1>
                <button onClick={() => {navigate("/tasks/add")}} className="w-full px-4 py-2 mt-4 text-sm font-medium text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Add Task</button>
            </div>
        </div>
    </div>

    <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">User Reviews
        </h1>

        <p className="mt-4 text-center text-gray-500 dark:text-gray-300">
            What Our Clients Are Saying About Tasker
        </p>


        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
            <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80')"}}>
                <div
                    className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                    <h2 className="mt-4 text-2xl font-semibold text-white capitalize">Best Tasking Website</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">- Kunal R.</p>
                </div>
            </div>

            <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{backgroundImage: "url('https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')"}}>
                <div
                    className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                    <h2 className="mt-4 text-2xl font-semibold text-white capitalize">Thankyou Tasker</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">- Harsh D.</p>
                </div>
            </div>

            <div className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{backgroundImage:"url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"}}>
                <div
                    className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                    <h2 className="mt-4 text-2xl font-semibold text-white capitalize">Made my life easier</h2>
                    <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">- Pushkar H.</p>
                </div>
            </div>
        </div>
    </div>

    <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img className="w-full h-full max-w-md" src="https://merakiui.com/images/components/Email-campaign-bro.svg" alt="email illustration vector art"/>
            </div>
            <div className="w-full lg:w-1/2">
                <div className="lg:max-w-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">Subscribe To The <span className="text-blue-500">Newsletter</span></h1>

                    <p className="mt-4 text-gray-600 dark:text-gray-400">be one of the first ones to get <span className="font-medium text-blue-500">newsletter</span> from Tasker</p>

                    <div className="flex flex-col mt-8 space-y-3 lg:space-y-0 lg:flex-row">
                        <form onSubmit={handleSubmit} method="POST">
                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address" required/>

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