"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header/page";

export default function Menu() {
  const [menuData, setMenuData] = useState({ categories: [], items: [] });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/menu");
      const data = await response.json();
      setMenuData({
        categories: Array.isArray(data.categories) ? data.categories : [],
        items: Array.isArray(data.items) ? data.items : [],
      });
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setError("Failed to fetch menu data");
    } finally {
      setLoading(false);
    }
  };

  const filteredItems =
    selectedCategory === "all"
      ? menuData.items
      : menuData.items.filter((item) => {
          const category = menuData.categories.find(
            (cat) => cat._id === item.categoryId
          );
          return category?._id === selectedCategory;
        });

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-[#76004C] via-[#4A0030] to-[#2D001D]">
      {/* Animated Header */}
      <Header/>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white py-16 px-4 relative"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            className="text-6xl font-serif mb-4 tracking-wider"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Our Culinary Selection
          </motion.h1>
          <motion.div 
            className="h-0.5 w-32 bg-white mx-auto mb-4"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-xl italic opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            A Journey Through Exquisite Flavors
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8"
        >
          {/* Categories as horizontal elegant buttons */}
          <motion.div 
            className="w-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-serif text-[#76004C] mb-6 text-center">
              CURATED SELECTIONS
            </h2>
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center items-center space-x-6">
                <motion.div 
                  className="h-px w-16 bg-[#76004C]"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 1 }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory("all")}
                  className={`text-xl tracking-widest font-bold transition-all ${
                    selectedCategory === "all"
                      ? "text-[#76004C]"
                      : "text-[#76004C]/60 hover:text-[#76004C]"
                  }`}
                >
                  ALL
                </motion.button>
                <motion.div 
                  className="h-px w-16 bg-[#76004C]"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                {menuData.categories.map((category) => (
                  <motion.button
                    key={category._id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`text-xl tracking-widest font-bold transition-all ${
                      selectedCategory === category._id
                        ? "text-[#76004C]"
                        : "text-[#76004C]/60 hover:text-[#76004C]"
                    }`}
                  >
                    {category.name.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Menu Items */}
          {loading ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#76004C] mx-auto"></div>
              <p className="mt-4 text-[#76004C] font-serif">Preparing your menu...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              className="text-center py-16 text-[#76004C]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl font-serif">{error}</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid gap-8"
              >
                {filteredItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                  >
                    <p className="text-2xl text-[#76004C] font-bold tracking-wide">
                      No selections available in this category.
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredItems.map((item, index) => {
                      const category = menuData.categories.find(
                        (cat) => cat._id === item.categoryId
                      );
                      return (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group relative bg-white rounded-xl overflow-hidden shadow-lg"
                        >
                          {item.imageUrl && (
                            <motion.div 
                              className="h-48 w-full overflow-hidden"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                              />
                            </motion.div>
                          )}
                          <motion.div 
                            className="p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="mb-4">
                              <motion.h3 
                                className="text-2xl font-bold text-[#76004C] tracking-wide mb-2 group-hover:text-[#76004C]/80 transition-colors"
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {item.title}
                              </motion.h3>
                              <p className="text-sm uppercase tracking-wider text-[#76004C]/70 font-medium">
                                {category?.name || "Chef's Special"}
                              </p>
                            </div>
                            {item.description && (
                              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                                {item.description}
                              </p>
                            )}
                            <motion.div
                              className="flex justify-between items-center"
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <div className="h-px flex-grow bg-[#76004C]/20"></div>
                              <p className="text-2xl font-bold text-[#76004C] px-4">
                                ₹{item.price}
                              </p>
                              <div className="h-px flex-grow bg-[#76004C]/20"></div>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
    </>
  );
}