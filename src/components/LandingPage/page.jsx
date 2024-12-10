import AboutUs from "../AboutUs/page";
import Card from "../Card/page";
import Header from "../Header/page";

export default function LandingPage() {
    return (
        <>
            {/* Hero Section */}
            <section 
                className="flex flex-col justify-center text-center bg-cover bg-center h-screen"
                style={{
                    backgroundImage: 'url(/hero-bg-image.jpg)',
                }}
            >
                <Header />
                <div className="flex flex-col justify-center items-center h-full space-y-4 px-4">
                    <h1>✨</h1>
                    <h1 className="text-5xl md:text-6xl lg:text-9xl font-extralight text-white">
                        Nahdi Mandhi
                    </h1>
                </div>
            </section>

            <AboutUs />

            {/* Best Choice Section */}
            <div className="my-10 px-4">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-extralight text-center text-red-700 mb-8">
                    Best Choice
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    );
}
