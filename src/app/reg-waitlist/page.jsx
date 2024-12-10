'use client';
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function WaitListRegister() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
        <div className="flex flex-col md:flex-row h-screen gap-5 overflow-hidden justify-center">
            <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-5 md:px-28">
                <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">Join our waitlist</h1>
                <p className="text-xs text-gray-500 text-center md:text-left mt-2">
                    Enjoy your favorite dish with us.
                </p>

                <label htmlFor="Name" className="mt-4 text-sm font-semibold">Name</label>
                <input 
                    type="text" 
                    name="Name" 
                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2" 
                />

                <label htmlFor="number" className="mt-4 text-sm font-semibold">Number</label>
                <input 
                    type="number" 
                    name="number" 
                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2" 
                />

                <label htmlFor="persons" className="mt-4 text-sm font-semibold">Number of persons</label>
                <input 
                    type="number" 
                    name="persons" 
                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2" 
                />

                <button 
                    className="border mt-3 w-full md:w-72 py-2 bg-green-800 text-white rounded-lg"
                >
                    Join
                </button>
            </div>
            <div className="w-full md:w-1/2 hidden md:flex items-center justify-center p-5">
                <img 
                    src="/about-us-image.jpg" 
                    alt="About Us" 
                    className="object-cover w-full h-full max-h-screen rounded-2xl" 
                />
            </div>
        </div>
        </>
    );
}
