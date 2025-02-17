import React from 'react';
import { ShoppingBag, Star, Heart, Plus } from 'lucide-react';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-xl p-6 transform transition-transform duration-300 hover:-translate-y-2">
      <div className="relative">
        <div className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md">
          <Heart className="w-5 h-5 text-[#024548] cursor-pointer" />
        </div>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-56 object-contain rounded-xl mb-4 transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute bottom-4 right-4 bg-[#024548] rounded-full p-2 cursor-pointer transform transition-transform duration-300 hover:scale-110">
          <Plus className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#024548] text-[#024548]" />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-[#024548] font-bold text-xl">${price}</p>
        </div>
      </div>
    </div>
  );
};

const ChooseYourItems = () => {
  const products = [
    {
      image: "peri-peri-mandi.png",
      name: "Double Cheese Pizza",
      price: "50.00",
    },
    {
      image: "peri-peri-mandi.png",
      name: "Pepperoni Pizza",
      price: "70.00",
    },
    {
      image: "peri-peri-mandi.png",
      name: "Mexican Green Wave",
      price: "29.00",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-white via-[#024548]/5 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ShoppingBag className="w-5 h-5 text-[#024548]" />
          <h2 className="text-center text-[#024548] uppercase text-sm font-semibold">
            Popular Products
          </h2>
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-4">
          Choose Your Items
        </h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Discover our handpicked selection of delicious items made with premium ingredients 
          and crafted with passion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseYourItems;