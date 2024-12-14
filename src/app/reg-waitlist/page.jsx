'use client';
import { addToWaitList_FN, checkOTP_FN } from "@/util/Axios/Methods/POST";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WaitListRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [persons, setPersons] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isOtpStage, setIsOtpStage] = useState(false); // Tracks the form stage
    const router = useRouter(); 

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await addToWaitList_FN({ name, number, persons });
            if (response.status !== 200) {
                throw new Error('Failed to register');
            }
            setIsOtpStage(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handlePaste = (e) => {
        const pastedData = e.clipboardData.getData('Text').split('');
        const newOtp = otp.map((_, i) => pastedData[i] || '');
        setOtp(newOtp);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const checkOTP = async() =>{
        try{
            const response = await checkOTP_FN(otp);
            console.log(response);
            if(response.status == 200){
                router.push('/success');
            }
        }catch(err){  
            console.log(err);
        }
    } 
    return (
        <div className="flex flex-col md:flex-row h-screen gap-5 overflow-hidden justify-center">
            <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-5 md:px-28">
                <img src="nahdi-mandi-logo.png" className="w-14 rounded-full" />
                <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">
                    {isOtpStage ? "Verify OTP" : "Join our waitlist"}
                </h1>
                <p className="text-xs text-gray-500 text-center md:text-left mt-2">
                    {isOtpStage
                        ? "Enter the OTP sent to your number to verify."
                        : "Enjoy your favorite dish with us."}
                </p>

                {/* Conditional rendering based on stage */}
                {!isOtpStage ? (
                    <>
                        <label htmlFor="Name" className="mt-4 text-sm font-semibold">Name</label>
                        <input
                            type="text"
                            name="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                        />

                        <label htmlFor="number" className="mt-4 text-sm font-semibold">Number</label>
                        <input
                            type="number"
                            name="number"
                            value={number}
                            minLength={10}
                            onChange={(e) => setNumber(e.target.value)}
                            className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                        />

                        <label htmlFor="persons" className="mt-4 text-sm font-semibold">Number of persons</label>
                        <input
                            type="number"
                            name="persons"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                            className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                        />
                    </>
                ) : (
                    <>
                        <label htmlFor="otp" className="mt-4 text-sm font-semibold">Enter OTP</label>
                        <div className="flex gap-2 mt-4" onPaste={handlePaste}>
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    id={`otp-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-12 h-12 text-center"
                                />
                            ))}
                        </div>
                    </>
                )}
                <button
                    onClick={isOtpStage ? checkOTP : handleSubmit}
                    className="border mt-3 w-full md:w-72 py-2 bg-red-800 text-white rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? (isOtpStage ? "Verifying..." : "Joining...") : (isOtpStage ? "Verify OTP" : "Join")}
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
    );
}
