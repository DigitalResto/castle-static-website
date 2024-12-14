import React from 'react';

const ProductCard = ({ image, name, price }) => {
  return (
    <div className="bg-[#FFF6F0] rounded-lg shadow-md p-4 text-center">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-56 object-contain rounded-full mb-4 transition-transform duration-300 hover:rotate-[180deg]" 
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-orange-500 font-bold text-lg">${price}</p>
    </div>
  );
};

const ChooseYourItems = () => {
  const products = [
    {
      image: "peri-peri-mandi.png", // Replace with actual image URLs
      name: "Double Cheese Pizza",
      price: "50.00",
    },
    {
    image: "peri-peri-mandi.png", // Replace with actual image URLs
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
    <div className="py-12 bg-[#FFFAF5]">
      <h2 className="text-center text-orange-500 uppercase text-sm font-semibold mb-2">Popular Products</h2>
      <h1 className="text-center text-2xl font-bold text-gray-900 mb-8">Choose Your Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
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
  );
};

export default ChooseYourItems;
