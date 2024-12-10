import HeaderMenu from "../HeaderMenu/page";

export default function Header() {
    return (
        <header className="flex justify-between items-center px-5 md:px-20 py-5 text-white">
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

            {/* Navigation Menu */}
            <div className="hidden md:block">
                <HeaderMenu />
            </div>

            {/* Reservation Button */}
            <div className="hidden md:block">
                <button className="border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-gray-900 transition">
                    Reservation
                </button>
            </div>

            {/* Mobile Menu */}
            <div className="block md:hidden">
                <button className="text-white focus:outline-none">
                    {/* Replace this with a hamburger menu icon */}
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
                </button>
            </div>
        </header>
    );
}
