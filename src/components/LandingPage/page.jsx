import AboutUs from "../AboutUs/page";
import Card from "../Card/page";
import Footer from "../Footer/page";
import Header from "../Header/page";
import ProfessionalLeaders from "../Members/page";
import ChooseYourItems from "../Menu/page";
import PricingMenu from "../Pricing/page";

export default function LandingPage() {
    return (
        <>
            <section 
                className="flex flex-col justify-center text-center bg-cover bg-center h-screen"
                style={{
                    backgroundImage: 'url(/hero-bg-image.jpg)',
                }}
            >
                <Header />
                <div className="flex flex-col justify-center items-center h-full space-y-4 px-4">
                    <h1>✨</h1>
                    <h1 className="text-5xl md:text-6xl lg:text-9xl md:font-extralight text-white font-extrabold">
                        Castle Resto
                    </h1>
                </div>
            </section>
            <AboutUs />
            {/* <div className="my-10 px-4">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-extralight text-center text-red-700 mb-8">
                    Best Choice
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div> */}
            <PricingMenu/>
            <ChooseYourItems/>
            <ProfessionalLeaders/>
            <Footer/>
        </>
    );
}
