"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import animation from '../../../public/animation.json';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useRouter } from "next/navigation";

const Success = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsModalOpen(true);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center h-screen">
            <Lottie animationData={animation} loop={true} className="w-32" />
            <h2 className="text-2xl font-semibold">We are reserving your seat.</h2>
            <p className="mt-2 text-lg">You will get a call once reserved.</p>
            <button
                onClick={() => {
                    router.push('/');
                }}
                className="m-10 text-white bg-[#7D0148] px-28 rounded-lg py-2"
            >
                Menu
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 text-center shadow-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-black"
                        >
                            ✖
                        </button>

                        <h3 className="text-xl font-bold mb-4">Wanna check how many mandi you can eat?</h3>
                        <button
                            onClick={() => router.push('/game')}
                            className="bg-[#7D0148] text-white px-6 py-2 rounded-lg"
                        >
                            Let's check
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Success;
