import { useState } from "react";
import Link from "next/link";
import HeaderMenu from "../HeaderMenu/page";
import { X, Facebook, Instagram, Youtube } from "lucide-react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="relative flex justify-between items-center px-5 md:px-20 py-5 text-white">
            <div>
                <a href="/">
                    <img 
                        src="Resto-mandi-logo.png" 
                        alt="Logo" 
                        className="w-12 md:w-14 rounded-full" 
                    />
                </a>
            </div>

            <div className="hidden md:block">
                <HeaderMenu />
            </div>

            <div className="hidden md:block">
                <Link href="/reg-waitlist">
                    <button className="bg-[#024548] border-2 border-[#024548] px-6 py-2 rounded-md hover:bg-transparent hover:text-[#024548] transition duration-300">
                        Reserve
                    </button>
                </Link>
            </div>

            <div className="block md:hidden">
                <button 
                    onClick={toggleMobileMenu}
                    className="text-[#024548] focus:outline-none"
                    aria-label="Toggle mobile menu"
                >
                    {!isMobileMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    ) : (
                        <X className="w-8 h-8" />
                    )}
                </button>
            </div>

            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={toggleMobileMenu}
            />

            <div 
                className={`fixed right-0 top-0 h-full w-4/5 bg-[#1a1a1a] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    <button 
                        onClick={toggleMobileMenu}
                        className="self-end mb-8 text-[#024548]"
                        aria-label="Close mobile menu"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <nav className="flex flex-col space-y-6">
                        <Link 
                            href="/about"
                            className="text-lg font-bold text-[#024548] hover:text-[#013133] transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/menu"
                            className="text-lg font-bold text-[#024548] hover:text-[#013133] transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            Menu
                        </Link>
                        <Link 
                            href="/services"
                            className="text-lg font-bold text-[#024548] hover:text-[#013133] transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            Services
                        </Link>
                        <Link 
                            href="/reg-waitlist"
                            className="text-lg font-bold text-[#024548] hover:text-[#013133] transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            Reservations
                        </Link>
                    </nav>

                    <div className="mt-auto">
                        <Link 
                            href="/reg-waitlist"
                            onClick={toggleMobileMenu}
                        >
                            <button className="w-full bg-[#024548] text-white px-6 py-2 rounded-md hover:bg-[#013133] transition duration-300 mb-6">
                                Reserve Now
                            </button>
                        </Link>

                        <div className="flex justify-center space-x-6 pt-6 border-t border-[#024548]/20">
                            <a href="#" className="text-[#024548] hover:text-[#013133] transition duration-300">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#024548] hover:text-[#013133] transition duration-300">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-[#024548] hover:text-[#013133] transition duration-300">
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}