'use client';
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header/page";
const menuData = {
  categories: [
    { _id: "soups", name: "Soups" },
    { _id: "salads", name: "Salads" },
    { _id: "shawarma", name: "Shawarma" },
    { _id: "sizzlers", name: "Arabic Sizzlers" },
    { _id: "starters", name: "Andhra Starters" },
    { _id: "platters", name: "Castle Special Platter" },
    { _id: "mandi", name: "Mandi & Arabic Rice" },
    { _id: "indian_biriyani", name: "Indian Biriyani & Rice" },
    { _id: "chinese_nonveg", name: "Chinese Non Veg" },
    { _id: "chinese_seafood", name: "Sea Food Chinese" },
    { _id: "veg_chinese", name: "Veg Chinese" },
    { _id: "breads", name: "Breads" },
    { _id: "indian_veg", name: "Indian Currys Veg" },
    { _id: "indian_egg", name: "Indian Currys Egg" },
    { _id: "noodles", name: "Noodles" },
    { _id: "nonveg_gravy", name: "Non Veg Gravy" },
    { _id: "seafood_gravy", name: "Sea Food Gravy" },
    { _id: "fried_rice", name: "Fried Rice" },
    { _id: "fresh_juices", name: "Fresh Juices" },
    { _id: "milkshakes", name: "Milkshakes" },
    { _id: "mojito", name: "Mojito" },
    { _id: "falooda", name: "Falooda" },
    { _id: "icecream", name: "Ice Cream" },
    { _id: "fruit_cream", name: "Fruit with Cream" }
  ],
  items: [
    // Soups
    {
      _id: "s1",
      categoryId: "soups",
      title: "Mutton Soup",
      price: "160",
      description: "Traditional mutton soup"
    },
    {
      _id: "s2",
      categoryId: "soups",
      title: "Clear Soup",
      price: "90/150",
      description: "Veg/Non-veg clear soup"
    },
    {
      _id: "s3",
      categoryId: "soups",
      title: "Hot & Sour",
      price: "90/130"
    },
    {
      _id: "s4",
      categoryId: "soups",
      title: "Manchow",
      price: "90/130"
    },
    {
      _id: "s5",
      categoryId: "soups",
      title: "Noodle Soup",
      price: "90/130"
    },
    {
      _id: "s6",
      categoryId: "soups",
      title: "Pepper Soup",
      price: "90/130"
    },
    {
      _id: "s7",
      categoryId: "soups",
      title: "Sweet Corn",
      price: "90/130"
    },
    {
      _id: "s8",
      categoryId: "soups",
      title: "Cream of Mushroom",
      price: "100"
    },
    {
      _id: "s9",
      categoryId: "soups",
      title: "Cream of Tomato",
      price: "100"
    },
    {
      _id: "s10",
      categoryId: "soups",
      title: "Dragon Soup",
      price: "100/130"
    },
    {
      _id: "s11",
      categoryId: "soups",
      title: "Lemon Coriander Soup",
      price: "100/130"
    },
    {
      _id: "s12",
      categoryId: "soups",
      title: "Lung Fung",
      price: "120"
    },
    {
      _id: "s13",
      categoryId: "soups",
      title: "Sea Food Soup",
      price: "130"
    },

    // Salads
    {
      _id: "sal1",
      categoryId: "salads",
      title: "Hummus",
      price: "50/130/200",
      description: "Classic Arabic dip"
    },
    {
      _id: "sal2",
      categoryId: "salads",
      title: "Thoum (Garlic Mayo)",
      price: "30/70/130"
    },
    {
      _id: "sal3",
      categoryId: "salads",
      title: "Mixed Raitha",
      price: "50"
    },
    {
      _id: "sal4",
      categoryId: "salads",
      title: "Plain Curd",
      price: "50"
    },
    {
      _id: "sal5",
      categoryId: "salads",
      title: "Green Salad",
      price: "80"
    },
    {
      _id: "sal6",
      categoryId: "salads",
      title: "Darjeeling Salad",
      price: "140"
    },
    {
      _id: "sal7",
      categoryId: "salads",
      title: "Russian Salad",
      price: "140"
    },
    {
      _id: "sal8",
      categoryId: "salads",
      title: "Castle Spl. Salad",
      price: "150"
    },
    {
      _id: "sal9",
      categoryId: "salads",
      title: "Huwain Chicken Salad",
      price: "160"
    },
    {
      _id: "sal10",
      categoryId: "salads",
      title: "Chicken Tikka Salad",
      price: "170"
    },

    // Continue adding all items following this pattern...
    
    // Last section - Fruit with Cream
    {
      _id: "fc1",
      categoryId: "fruit_cream",
      title: "Strawberry Cream",
      price: "180"
    },
    {
      _id: "fc2",
      categoryId: "fruit_cream",
      title: "Mixed Fruit Cream",
      price: "200"
    },
    {
      _id: "fc3",
      categoryId: "fruit_cream",
      title: "Apple Cream",
      price: "200"
    },
    {
      _id: "fc4",
      categoryId: "fruit_cream",
      title: "Dry Fruit Cream",
      price: "240",
      description: "Chef's special"
    },
    {
      _id: "fc5",
      categoryId: "fruit_cream",
      title: "Avacado Cream",
      price: "240"
    }
  ]
};

const MenuItem = ({ item }) => (
  <div className="min-w-[300px] bg-black/20 backdrop-blur rounded-lg overflow-hidden mr-4 flex-shrink-0">
    <img 
      src={item.imageUrl || "/api/placeholder/300/200"} 
      alt={item.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
      {item.description && (
        <p className="text-sm text-gray-300 mb-2">{item.description}</p>
      )}
      <p className="text-[#76004C] font-bold">₹{item.price}</p>
    </div>
  </div>
);

const CategorySection = ({ category, items }) => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-4 px-4">{category.name}</h2>
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="text-white" />
        </button>
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide px-4 py-2 scroll-smooth"
        >
          {items.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default function Menu() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#76004C] via-[#4A0030] to-[#2D001D]">
      <Header />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] mb-8">
        <img
          src="/api/placeholder/1920/1080"
          alt="Featured Dish"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#76004C] via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Castle Special Mandi</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-6">
              Experience our signature dish - slow-cooked aromatic rice with tender meat, 
              served with special sauces and fresh salad.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-[#76004C] bg-white px-3 py-1 rounded-full font-bold">
                Chef's Special
              </span>
              <span className="text-white">₹799 onwards</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="pb-16">
        {menuData.categories.map((category) => {
          const categoryItems = menuData.items.filter(
            (item) => item.categoryId === category._id
          );
          if (categoryItems.length === 0) return null;
          return (
            <CategorySection 
              key={category._id} 
              category={category} 
              items={categoryItems} 
            />
          );
        })}
      </div>
    </div>
  );
}