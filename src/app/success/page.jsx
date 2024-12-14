"use client";

import dynamic from "next/dynamic";
import animation from '../../../public/animation.json';
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { useRouter } from "next/navigation";

const Success = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center text-center h-screen ">
            <Lottie animationData={animation} loop={true}  className="w-32"/>
            <h2 className="text-2xl font-semibold">We are reserving your seat.</h2>
            <p className="mt-2 text-lg">You will get a call once reserved.</p>
            <button 
            onClick={()=>{
                router.push('/');
            }}
            className="m-10  text-white bg-[#A50202] px-28 rounded-lg py-2">Menu</button>
        </div>
    );
};

export default Success;