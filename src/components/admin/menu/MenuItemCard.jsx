import React from "react";
import { Edit, Trash } from "lucide-react";

const MenuItemCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {item.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-lg font-bold text-green-600">
            ${parseFloat(item.price).toFixed(2)}
          </p>
        </div>

        {item.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {item.description}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
