"use client";
import { changeStatus_FN, GET_WAITLIST_FN } from '@/util/Axios/Methods/POST';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Search, LogOut, ArrowLeft, Check, X, ClipboardCopy } from 'lucide-react';
import { getSocket } from '@/util/socket';

export default function WaitList() {
    const [waitlistData, setWaitlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const audioRef = useRef(null);
    useEffect(() => {
        audioRef.current = new Audio('/notification.mp3');
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await GET_WAITLIST_FN();
                setWaitlistData(response.data.data || []);
            } catch (err) {
                console.error("Error fetching waitlist:", err);
                setError("Failed to fetch waitlist. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        // Initialize socket connection
        const socket = getSocket();
        socket.on('new_waitlist_entry', (newEntry) => {
            console.log("Event Recieved ==>" , newEntry);
            if (audioRef.current) { // Add safety check
                audioRef.current.play().catch(err => console.error('Error playing sound:', err));
            }
            setWaitlistData(prevData => [...prevData,newEntry]);
        });
        fetchData();
        return () => {
            socket.off('new_waitlist_entry');
        };
    }, []);

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    const handleAction = async (id, action) => {
        try {
            const response = await changeStatus_FN(id, action);
            if (response.status === 200 || response.status === 201) {
                setWaitlistData(prevData => prevData.filter(item => item._id !== id));
            }
        } catch (err) {
            console.error(`Error ${action}ing item:`, err);
        }
    };

    const filteredWaitlist = waitlistData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.number.includes(searchTerm)
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <img src="Resto-mandi-logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
                        <h1 className="text-2xl font-bold text-gray-900">Waiting List</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/admin/dashboard')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Dashboard
                        </button>
                        <button
                            onClick={() => router.push('/login')}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 md:mb-0">Current Waitlist</h2>

                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Search by name or phone..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                        </div>

                        {/* Waitlist Table */}
                        <div className="overflow-x-auto">
                            {filteredWaitlist.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">No waiting list items found.</div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persons</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[...filteredWaitlist].reverse().map((item) => (
                                            <tr key={item._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {item.time || '08:00 AM'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {item.name || 'Unknown'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.persons || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                                                    <span>{item.number || "No mobile number"}</span>
                                                    {item.number && (
                                                        <ClipboardCopy
                                                            className="text-gray-500 hover:text-gray-700 cursor-pointer w-5"
                                                            onClick={() => copyToClipboard(item.number)}
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    <button
                                                        onClick={() => handleAction(item._id, 'accept')}
                                                        className="inline-flex items-center p-1 border border-transparent rounded-full text-green-600 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    >
                                                        <Check className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(item._id, 'reject')}
                                                        className="inline-flex items-center p-1 border border-transparent rounded-full text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}