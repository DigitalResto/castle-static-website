"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  X, 
  Edit3, 
  Package, 
  Utensils, 
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  FolderPlus,
  ImagePlus
} from "lucide-react";
import Modal from "./Modal";
import MenuItemCard from "./MenuItemCard";
import MenuItemForm from "./MenuItemForm";

export default function AdminMenu() {
  const [menuData, setMenuData] = useState({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    price: "",
    description: "",
    imageBlob: null,
    imagePreview: null,
  });

  useEffect(() => {
    fetchMenuData();
  }, []);

  const showAlert = (message, type = "error") => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
  };

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/menu");
      if (!response.ok) throw new Error("Failed to fetch menu data");
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

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "restaurant_menu");

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleSubmitItem = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;

      if (formData.imageBlob) {
        imageUrl = await uploadToCloudinary(formData.imageBlob);
      }

      if (!imageUrl && !editingItem && !formData.imageBlob) {
        showAlert("Please add an image for the menu item");
        return;
      }

      const url = "/api/menu";
      const method = editingItem ? "PUT" : "POST";
      const body = {
        ...(editingItem && { id: editingItem._id }),
        categoryId: formData.categoryId,
        title: formData.title,
        price: parseFloat(formData.price).toFixed(2),
        description: formData.description,
        imageUrl,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to save menu item");

      await fetchMenuData();
      resetFormAndModals();
      showAlert(
        `Menu item ${editingItem ? "updated" : "added"} successfully`,
        "success"
      );
    } catch (error) {
      console.error("Error saving menu item:", error);
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "category",
          name: newCategory.trim(),
        }),
      });

      if (!response.ok) throw new Error("Failed to add category");

      await fetchMenuData();
      setNewCategory("");
      setIsAddingCategory(false);
      showAlert("Category added successfully", "success");
    } catch (error) {
      console.error("Error adding category:", error);
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "category", categoryId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete category");
      }

      await fetchMenuData();
      showAlert("Category deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting category:", error);
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/menu", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "item", itemId }),
      });

      if (!response.ok) throw new Error("Failed to delete menu item");

      await fetchMenuData();
      showAlert("Menu item deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      showAlert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndModals = () => {
    setIsAddingItem(false);
    setEditingItem(null);
    setFormData({
      categoryId: "",
      title: "",
      price: "",
      description: "",
      imageBlob: null,
      imagePreview: null,
    });
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setFormData({
      categoryId: item.categoryId,
      title: item.title,
      price: item.price,
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      imagePreview: item.imageUrl || "",
    });
    setIsAddingItem(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Menu</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchMenuData}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        {alert.show && (
          <div
            className={`mb-6 p-4 rounded-lg shadow-sm flex items-center justify-between ${
              alert.type === "error"
                ? "bg-red-50 text-red-700 border-l-4 border-red-500"
                : "bg-green-50 text-green-700 border-l-4 border-green-500"
            }`}
          >
            <div className="flex items-center gap-3">
              {alert.type === "error" ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
              <p className="font-medium">{alert.message}</p>
            </div>
            <button
              onClick={() => setAlert({ show: false, message: "", type: "" })}
              className="p-1 hover:bg-white/50 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Utensils className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-gray-800">Menu Management</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsAddingCategory(true)}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
              >
                <FolderPlus className="h-4 w-4" /> Add Category
              </button>
              <button
                onClick={() => setIsAddingItem(true)}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-sm"
              >
                <ImagePlus className="h-4 w-4" /> Add Item
              </button>
            </div>
          </div>
        </div>

        {/* Categories and Items Display */}
        <div className="space-y-8">
          {menuData.categories.map((category) => (
            <div key={category._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-gray-500" />
                    <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    disabled={isSubmitting}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <Trash2 className="h-5 w-5 transform group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.items
                    .filter((item) => item.categoryId === category._id)
                    .map((item) => (
                      <div key={item._id} className="bg-gray-50 rounded-lg p-4 group hover:shadow-md transition-all">
                        <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-blue-500">${item.price}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(item)}
                              disabled={isSubmitting}
                              className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item._id)}
                              disabled={isSubmitting}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals remain the same */}
      <Modal
        isOpen={isAddingCategory}
        onClose={() => !isSubmitting && setIsAddingCategory(false)}
        title="Add New Category"
      >
        <form onSubmit={handleAddCategory} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setIsAddingCategory(false)}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Adding..." : "Add Category"}
            </button>
          </div>
        </form>
      </Modal>

      <MenuItemForm
        isOpen={isAddingItem}
        onClose={() => !isSubmitting && resetFormAndModals()}
        onSubmit={handleSubmitItem}
        editingItem={editingItem}
        categories={menuData.categories}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
