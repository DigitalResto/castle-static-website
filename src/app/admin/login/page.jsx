'use client';
import { Admin_Login_FN } from "@/util/Axios/Methods/POST";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkAdminAuth } from "@/util/auth";

export default function AdminLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    if(checkAdminAuth() == true){
        router.replace('/admin/dashboard')
    }
    console.log("Auth==>",checkAdminAuth())

    // Validation functions
    const validateUsername = (usernameToValidate) => {
        if (usernameToValidate.length < 3) {
            return "Username must be at least 3 characters long";
        }
        if (usernameToValidate.length > 15) {
            return "Username must not exceed 15 characters";
        }
        return "";
    };

    const validatePassword = (passwordToValidate) => {
        if (passwordToValidate.length < 3) {
            return "Password must be at least 3 characters long";
        }
        return "";
    };

    const handleSubmit = async () => {
        // Reset previous errors
        setError('');

        // Validate all fields
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        // Combine all errors
        if (usernameError || passwordError) {
            const combinedError = [usernameError, passwordError]
                .filter(err => err !== "")
                .join(". ");
            
            setError(combinedError);
            return;
        }

        setIsLoading(true);
        try {
            const response = await Admin_Login_FN({ username, password });
            if (response.status !== 200) {
                throw new Error('Invalid username or password');
            }
            console.log(response)
            // Assuming successful login should redirect to dashboard
            localStorage.setItem('admin',true);
            router.replace('/admin/dashboard');
        } catch (error) {
            console.log("Erorr=>",error)
            setError(error.response.data.message || 'Invalid username or password');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen gap-5 overflow-hidden justify-center">
            <div className="flex flex-col items-start justify-center w-full md:w-1/2 px-5 md:px-28">
                <img src="/Resto-mandi-logo.png" className="w-14 rounded-full" alt="Logo" />
                <h1 className="font-bold text-2xl md:text-3xl text-center md:text-left">
                    Admin Login
                </h1>

                {/* Error Message Display */}
                {error && (
                    <div className="w-full md:w-72 mt-3 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <label htmlFor="username" className="mt-4 text-sm font-semibold">Username</label>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                    placeholder="Enter your username"
                />

                <label htmlFor="password" className="mt-4 text-sm font-semibold">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg focus:outline-0 focus:border-green-800 w-full md:w-72 p-2"
                    placeholder="Enter your password"
                />

                <button
                    onClick={handleSubmit}
                    className="border mt-3 w-full md:w-72 py-2 bg-red-800 text-white rounded-lg"
                    disabled={isLoading}
                >
                    {isLoading ? "Logging in..." : "Login"}
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