'use client';
import { addToWaitList_FN, checkOTP_FN } from "@/util/Axios/Methods/POST";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSocket } from "@/util/socket";
import Link from "next/link";

export default function WaitListRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [persons, setPersons] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isOtpStage, setIsOtpStage] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter(); 
    const socket = getSocket();
    // Validation functions
    const validateName = (nameToValidate) => {
        if (nameToValidate.length < 3) {
            return "Name must be at least 3 characters long";
        }
        if (nameToValidate.length > 15) {
            return "Name must not exceed 15 characters";
        }
        return "";
    };
    const validatePhoneNumber = (phoneNum) => {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNum)) {
            return "Phone number must be exactly 10 digits";
        }
        return "";
    };
    const validatePersons = (personsCount) => {
        const parsedPersons = parseInt(personsCount);
        if (isNaN(parsedPersons) || parsedPersons <= 0) {
            return "Number of persons must be a positive number";
        }
        if(parsedPersons > 99) return "Number or person should be 2 digits";
        return "";
    };

    const handleSubmit = async () => {
        // Reset previous errors
        setError('');

        // Validate all fields
        const nameError = validateName(name);
        const phoneError = validatePhoneNumber(number);
        const personsError = validatePersons(persons);

        // Combine all errors
        if (nameError || phoneError || personsError) {
            const combinedError = [nameError, phoneError, personsError]
                .filter(err => err !== "")
                .join(". ");
            
            setError(combinedError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await addToWaitList_FN({ name, number, persons });
            if (response.status !== 200) {
                throw new Error('Failed to register');
            }
            // Emit socket event after successful registration
            socket.emit('new_waitlist_entry', {
                name,
                number,
                persons,
                time: new Date().toLocaleTimeString(),
                _id: response.data.data.insertedId,
            });
            if(response.data.otp == false){
                router.push('/success')
            }else{
                setIsOtpStage(true);
            }
        } catch (error) {
            setError(error.message || 'An error occurred while registering');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus to next input when a digit is entered
        if (value && index < 3) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
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

    const checkOTP = async() => {
        setIsLoading(true);
        setError(''); // Clear any previous errors
        try {
            const response = await checkOTP_FN(otp);
            if (response.status == 200) {
                router.push('/success');
            }
        } catch (err) {  
            // Set error message from the server or a generic error
            setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen gap-5 overflow-hidden justify-center">
            <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-5 md:px-28">
                <img src="Resto-mandi-logo.png" className="w-14 rounded-full" />
                <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">
                    {isOtpStage ? "Verify OTP" : "Join our waitlist"}
                </h1>
                <p className="text-xs text-gray-500 text-center md:text-left mt-2">
                    {isOtpStage
                        ? "Enter the OTP sent to your number to verify."
                        : "Enjoy your favorite dish with us."}
                </p>

                {/* Error Message Display */}
                {error && (
                    <div className="w-full md:w-72 mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

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
                            placeholder="Enter your name (3-15 characters)"
                        />

                        <label htmlFor="number" className="mt-4 text-sm font-semibold">Phone Number</label>
                        <input
                            type="tel"
                            name="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                            placeholder="10-digit phone number"
                        />

                        <label htmlFor="persons" className="mt-4 text-sm font-semibold">Number of persons</label>
                        <input
                            type="number"
                            name="persons"
                            value={persons}
                            onChange={(e) => setPersons(e.target.value)}
                            className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                            placeholder="Number of persons dining"
                            min="1"
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
                    className="border mt-3 w-full md:w-72 py-2 bg-[#7D0148] text-white rounded-lg"
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