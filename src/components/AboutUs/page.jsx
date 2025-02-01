import React from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  Award, 
  Users, 
  Star,
  ChefHat,
  Leaf,
  Heart
} from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#660050] mb-4">
              About Castle Resto
            </h1>
            <div className="w-24 h-1 bg-[#660050] mx-auto mb-8"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left side - Text Content */}
            <div className="space-y-6 p-8 bg-white rounded-2xl shadow-lg border border-[#660050]/10">
              <p className="text-lg text-gray-700 leading-relaxed">
                Since its inception in 2013, Castle Resto Mandi has swiftly risen to prominence 
                as a leading Mandi Restaurant, specializing in Authentic Arabian cuisine in the 
                vibrant state of Kerala, India.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our remarkable journey is a testament to our unwavering determination, 
                boundless passion, and distinctive culinary expertise that sets us apart.
              </p>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-4 bg-[#660050]/5 rounded-lg hover:bg-[#660050]/10 transition-colors">
                  <Clock className="w-8 h-8 text-[#660050] mx-auto mb-2" />
                  <p className="font-bold text-2xl text-gray-800">10+</p>
                  <p className="text-sm text-gray-600">Years of Excellence</p>
                </div>
                <div className="text-center p-4 bg-[#660050]/5 rounded-lg hover:bg-[#660050]/10 transition-colors">
                  <Award className="w-8 h-8 text-[#660050] mx-auto mb-2" />
                  <p className="font-bold text-2xl text-gray-800">50+</p>
                  <p className="text-sm text-gray-600">Awards Won</p>
                </div>
                <div className="text-center p-4 bg-[#660050]/5 rounded-lg hover:bg-[#660050]/10 transition-colors">
                  <Users className="w-8 h-8 text-[#660050] mx-auto mb-2" />
                  <p className="font-bold text-2xl text-gray-800">100K+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right side - Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <img
                src="ss01.png"
                alt="Restaurant Interior"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                src="peri-peri-mandi.png"
                alt="Signature Dish"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                src="Resto-mandi-logo.png"
                alt="Chef at Work"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
              <img
                src="image02.jpg"
                alt="Restaurant Ambiance"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#660050]/5 group border border-[#660050]/10">
              <ChefHat className="w-12 h-12 text-[#660050] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-[#660050]">Expert Chefs</h3>
              <p className="text-gray-600">Our master chefs bring years of experience in authentic Arabian cuisine.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#660050]/5 group border border-[#660050]/10">
              <Leaf className="w-12 h-12 text-[#660050] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-[#660050]">Fresh Ingredients</h3>
              <p className="text-gray-600">We source only the finest and freshest ingredients for our dishes.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#660050]/5 group border border-[#660050]/10">
              <UtensilsCrossed className="w-12 h-12 text-[#660050] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-[#660050]">Authentic Taste</h3>
              <p className="text-gray-600">Experience the true flavors of traditional Arabian cuisine.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#660050]/5 group border border-[#660050]/10">
              <Heart className="w-12 h-12 text-[#660050] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-[#660050]">Made with Love</h3>
              <p className="text-gray-600">Every dish is prepared with passion and attention to detail.</p>
            </div>
          </div>

          {/* Testimonial Section */}
          <div className="bg-[#660050]/5 rounded-2xl p-8 text-center max-w-3xl mx-auto border border-[#660050]/10">
            <Star className="w-12 h-12 text-[#660050] mx-auto mb-6" />
            <p className="text-xl italic text-gray-700 mb-6">
              "Castle Resto offers an unforgettable dining experience with its authentic Arabian flavors 
              and exceptional service. A true gem in Kerala's culinary landscape."
            </p>
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4 text-[#660050]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#660050]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#660050]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#660050]" fill="currentColor" />
              <Star className="w-4 h-4 text-[#660050]" fill="currentColor" />
            </div>
            <p className="text-sm text-gray-600 mt-2">4.9/5 Average Customer Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;