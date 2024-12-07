export default function Header() {
    return (
        <header className="flex justify-between items-center my-10 md:mx-20 mx-5">
            <div>
                <a href="/">
                    <img src="/logo.jpg" alt="Logo" className="w-14 rounded-full" />
                </a>
            </div>

            <div className="hidden md:block">
            {/* <HeaderMenu /> */}
            </div>

            <div className="mt-4 md:mt-0">
                <button
                className="border-2 border-black px-8 py-2 rounded-md"
                >Reservation</button>
            </div>
        </header>
    )
}