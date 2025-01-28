"use client";
import { useState, useEffect } from "react";

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
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-800">
      {/* Header */}
      <div className="text-white py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-2">Our Menu</h1>
          <p className="text-xl opacity-90">Select your items below</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-lg shadow-xl p-6">
          {/* Categories as vertical buttons */}
          <div className="w-full space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              Select Category
            </h2>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full text-left px-6 py-3 rounded-lg font-medium transition-all ${
                selectedCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Items
            </button>
            {menuData.categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category._id)}
                className={`w-full text-left px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === category._id
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading menu items...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p className="text-xl">{error}</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">
                No items found in this category.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const category = menuData.categories.find(
                  (cat) => cat._id === item.categoryId
                );
                return (
                  <div
                    key={item._id}
                    className="flex items-center bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    {item.imageUrl && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {category?.name || "Uncategorized"}
                          </p>
                        </div>
                        <p className="text-xl font-bold text-red-600">
                          ₹{item.price}
                        </p>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 text-sm">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
