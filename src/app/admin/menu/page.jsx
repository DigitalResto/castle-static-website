"use client";
import { useState, useEffect } from "react";
import { Plus, Edit, Trash, Upload, X } from "lucide-react";

export default function AdminMenu() {
  const [menuData, setMenuData] = useState({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [newCategory, setNewCategory] = useState("");

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

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          name: newCategory,
        }),
      });

      if (response.ok) {
        fetchMenuData();
        setNewCategory("");
        setIsAddingCategory(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "category", categoryId }),
      });

      if (response.ok) {
        fetchMenuData();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "restaurant_menu");
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
      formData.append("timestamp", Date.now() / 1000);
      formData.append("folder", "restaurant");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      console.log("Uploading to cloud name:", cloudName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log("Cloudinary response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error?.message || "Upload failed");
      }

      return responseData.secure_url;
    } catch (error) {
      console.error("Detailed error:", error);
      throw error;
    }
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;

      if (imageFile) {
        setUploadProgress(10);
        imageUrl = await uploadToCloudinary(imageFile);
        setUploadProgress(100);
      }

      const url = "/api/menu";
      const method = editingItem ? "PUT" : "POST";
      const body = editingItem
        ? { ...formData, id: editingItem._id, imageUrl }
        : { ...formData, imageUrl };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        fetchMenuData();
        setIsAddingItem(false);
        setEditingItem(null);
        setFormData({
          categoryId: "",
          title: "",
          price: "",
          description: "",
          imageUrl: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error("Error saving menu item:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "item", itemId }),
      });

      if (response.ok) {
        fetchMenuData();
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      categoryId: item.categoryId,
      title: item.title,
      price: item.price,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
    });
    if (item.imageUrl) {
      setImagePreview(item.imageUrl);
    }
    setIsAddingItem(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Menu Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAddingCategory(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Category
          </button>
          <button
            onClick={() => setIsAddingItem(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Item
          </button>
        </div>
      </div>

      {/* Category Management Modal */}
      {isAddingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Management Modal */}
      {isAddingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
            </h2>
            <form onSubmit={handleSubmitItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {menuData.categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <div className="relative w-full max-w-[200px] mx-auto">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setFormData({ ...formData, imageUrl: "" });
                          }}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageSelect}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingItem(false);
                    setEditingItem(null);
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Menu Display */}
      {loading ? (
        <div className="text-center py-4">Loading menu data...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <div className="space-y-8">
          {menuData.categories.map((category) => (
            <div key={category._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{category.name}</h2>
                <button
                  onClick={() => handleDeleteCategory(category._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash size={20} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuData.items
                  .filter((item) => item.categoryId === category._id)
                  .map((item) => (
                    <div key={item._id} className="border rounded-lg p-4">
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-lg font-bold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 mb-4">{item.description}</p>
                      )}
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
