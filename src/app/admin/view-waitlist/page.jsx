"use client";
import { changeStatus_FN, GET_WAITLIST_FN } from '@/util/Axios/Methods/POST';
import React, { useEffect, useState } from 'react';

export default function WaitList() {
    // State to store waitlist data
    const [waitlistData, setWaitlistData] = useState([]);
    
    // State to manage loading and error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await GET_WAITLIST_FN();
                console.log("Waitlist data ==>", response.data);
                
                // Assuming the API returns data in response.data.data
                setWaitlistData(response.data.data || []);
            } catch (err) {
                console.error("Error fetching waitlist:", err);
                setError("Failed to fetch waitlist. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchData();
    }, []);

    // Function to handle accept/reject actions
    const handleAction = async(id, action) => {
        const response = await changeStatus_FN(id, action);
        console.log("Response ==>",response)
        console.log(`${action} action for item with ID: ${id}`);
    };

    // Render loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6 overflow-auto">
            <h1 className="text-4xl md:text-5xl">Waiting List</h1>
            
            {waitlistData.length === 0 ? (
                <div className="text-gray-500">No waiting list items found.</div>
            ) : (
                waitlistData.map((item, index) => (
                    <div
                        key={item._id || index}
                        className="flex flex-col md:flex-row w-full max-w-lg justify-between rounded-lg bg-white p-4 md:p-6 shadow-2xl"
                    >
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-4 md:gap-10">
                                <div className="font-medium text-gray-800">
                                    {/* Assuming you have a time field, adjust as needed */}
                                    {item.time || '08:00 AM'}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {item.name || 'Unknown'}
                                </div>
                                <div className="text-gray-500 text-sm">
                                    {item.persons || 'N/A'}
                                </div>
                            </div>
                            <div className="text-gray-500 text-sm">
                                {item.number || 'No mobile number'}
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            <button 
                                onClick={() => handleAction(item._id, 'accept')}
                                className="rounded border px-2 hover:bg-green-100 transition"
                            >
                                ✅
                            </button>
                            <button 
                                onClick={() => handleAction(item._id, 'reject')}
                                className="rounded border px-2 hover:bg-red-100 transition"
                            >
                                ❌
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}