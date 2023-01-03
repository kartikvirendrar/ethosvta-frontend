import React from "react";

export default function Navbar() {
    return (
        <>
            <nav className="relative bg-white shadow dark:bg-gray-800">
                <div className="container flex items-center justify-between py-4 px-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
                    <div className="text-xl font-semibold text-gray-700">
                        <a className="text-2xl font-bold text-gray-800 transition-colors duration-300 transform dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="/">Ethos VTA</a>
                    </div>

                    <div className="flex items-center">
                        <a href="/video-to-audio" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Video To Audio</a>
                        <a href="/team" className="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Team</a>
                        <div className="ml-6 flex items-center mt-4 lg:mt-0">
                            <a href="/profile" type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="user" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}