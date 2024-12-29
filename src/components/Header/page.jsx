import { useState } from "react";
import Link from "next/link";
import HeaderMenu from "../HeaderMenu/page";
import { X } from "lucide-react";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="relative flex justify-between items-center px-5 md:px-20 py-5 text-white">
            {/* Logo */}
            <div>
                <a href="/">
                    <img 
                        src="/nahdi-mandi-logo.png" 
                        alt="Logo" 
                        className="w-12 md:w-14 rounded-full" 
                    />
                </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
                <HeaderMenu />
            </div>

            {/* Desktop Reservation Button */}
            <div className="hidden md:block">
                <Link href="/reg-waitlist">
                    <button className="border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition">
                        Reserve
                    </button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="block md:hidden">
                <button 
                    onClick={toggleMobileMenu}
                    className="text-white focus:outline-none"
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

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
                    isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={toggleMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <div 
                className={`fixed right-0 top-0 h-full w-4/5 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Mobile Menu Close Button */}
                    <button 
                        onClick={toggleMobileMenu}
                        className="self-end mb-8"
                        aria-label="Close mobile menu"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Mobile Menu Items */}
                    <nav className="flex flex-col space-y-6">
                        <Link 
                            href="/about/mission"
                            className="text-lg font-bold hover:text-gray-300"
                            onClick={toggleMobileMenu}
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/menu/signature-dishes"
                            className="text-lg font-bold hover:text-gray-300"
                            onClick={toggleMobileMenu}
                        >
                            Menu
                        </Link>
                        <Link 
                            href="/services/private-dining"
                            className="text-lg font-bold hover:text-gray-300"
                            onClick={toggleMobileMenu}
                        >
                            Services
                        </Link>
                        <Link 
                            href="/reg-waitlist"
                            className="text-lg font-bold hover:text-gray-300"
                            onClick={toggleMobileMenu}
                        >
                            Reservations
                        </Link>
                    </nav>

                    {/* Mobile Reservation Button */}
                    <Link 
                        href="/reg-waitlist"
                        className="mt-auto"
                        onClick={toggleMobileMenu}
                    >
                        <button className="w-full border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition">
                            Reserve Now
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
}