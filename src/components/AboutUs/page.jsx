import React from 'react';

const AboutUs = () => {
    return (
        <div className="flex items-center justify-center min-h-screen text-black py-10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#FFD700]">About Us</h2>
                        <p className="mb-4">
                            The food of Restaurant Istanbul Oriental comes from where the east meets the west: from aroma of spices, garlic, yogurt and goat cheese, fresh ingredients and centuries-old cooking expertise.
                        </p>
                        <p>
                            On Special Nights you can participate in a culinary atmosphere in a unique way. In addition to enjoying your food, you and your company have the privilege of cooking and exploring the secrets of the Turkish kitchen yourself.
                        </p>

                        <div className='bg-[#FFD700] h-1 w-44 m-5 mx-auto'></div>
                    </div>

                    <div className='p-20'>
                        <img
                            src="about-us-image.jpg"
                            alt="Restaurant Interior"
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
