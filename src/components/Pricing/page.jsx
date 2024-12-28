import React, { useState } from "react";

const PricingMenu = () => {
  const [activeTab, setActiveTab] = useState("AL FAHM");

  const tabs = ["AL FAHM", "Mandi", "Shakes"];

  const menuItems = [
    {
      category: "AL FAHM",
      items: [
        {
          name: "Peri Peri Al Fahm",
          description: "Juicy chicken marinated with spicy peri peri sauce, grilled to perfection.",
          price: 150,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Al Fahm",
          description: "Traditional grilled chicken marinated in rich Arabian spices.",
          price: 130,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Green Chilli Al Fahm",
          description: "Spicy green chilli marinade for a fiery grilled chicken experience.",
          price: 160,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Shawaya",
          description: "Mildly spiced chicken grilled to golden perfection.",
          price: 120,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Turkish Al Fahm",
          description: "A Turkish twist to classic Al Fahm with unique spices.",
          price: 170,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Honey Chilli Al Fahm",
          description: "Sweet and spicy honey chilli glaze on tender grilled chicken.",
          price: 160,
          image: "peri-peri-mandi.png"
        }
        
      ],
    },
    {
      category: "Mandi",
      items: [
        {
          name: "Chicken Mandi",
          description: "Delicious rice with tender chicken cooked in Mandi spices.",
          price: 180,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Shawaya Mandi",
          description: "Mandi rice served with juicy grilled Shawaya chicken.",
          price: 200,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Chicken Madfoon",
          description: "Slow-cooked chicken with aromatic spices served with Mandi rice.",
          price: 200,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Al Fahm Mandi",
          description: "Juicy Al Fahm chicken served with fragrant Mandi rice.",
          price: 200,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Green Chilli Al Fahm Mandi",
          description: "Spicy green chilli Al Fahm served with traditional Mandi rice.",
          price: 220,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Peri Peri Al Fahm Mandi",
          description: "Flavorful peri peri Al Fahm served with aromatic Mandi rice.",
          price: 220,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Honey Chilli Al Fahm Mandi",
          description: "Sweet and spicy honey chilli Al Fahm with Mandi rice.",
          price: 220,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Turkish Al Fahm Mandi",
          description: "A Turkish twist to Al Fahm served with Mandi rice.",
          price: 240,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Grilled Mutton Mandi",
          description: "Flavorful grilled mutton served with fragrant Mandi rice.",
          price: 240,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Grilled Beef Mandi",
          description: "Succulent grilled beef served with aromatic Mandi rice.",
          price: 280,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Mandi Rice",
          description: "Traditional fragrant rice cooked with Mandi spices.",
          price: 120,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Beef Mandi",
          description: "Tender beef cooked with Mandi spices and served with rice.",
          price: 220,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Mutton Mandi",
          description: "Juicy mutton cooked with traditional Mandi spices and rice.",
          price: 260,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Mandi Platter - 4 Pax",
          description: "A platter for 4 with assorted Mandi flavors and grilled meats.",
          price: 600,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Mandi Platter - 6 Pax",
          description: "A larger platter for 6, perfect for a family feast.",
          price: 850,
          image: "peri-peri-mandi.png",
        },
        {
          name: "Mandi Chicken",
          description: "Classic Mandi chicken served with flavorful rice.",
          price: 120,
          image: "peri-peri-mandi.png",
        },
      ],
    },
    {
      category: "Shakes",
      items: [
        {
          name: "Galaxy Shake",
          description: "Rich and creamy shake with a galaxy of flavors.",
          price: 140,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Pop Corn Shake",
          description: "A unique shake with a hint of sweet and salty popcorn flavor.",
          price: 130,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Bounty Shake",
          description: "A creamy shake with coconut and chocolate flavors.",
          price: 150,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Dairy Milk Shake",
          description: "Smooth and rich shake made with Dairy Milk chocolate.",
          price: 120,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Nutella Shake",
          description: "Thick shake made with creamy Nutella and chocolate drizzle.",
          price: 150,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Belgium Shake",
          description: "Luxurious shake with rich Belgian chocolate flavor.",
          price: 180,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Brownie Shake",
          description: "Creamy shake blended with chunks of rich brownie.",
          price: 160,
          image: "peri-peri-mandi.png"
        },
        {
          name: "Bubblegum Shake",
          description: "A fun and sweet bubblegum-flavored creamy shake.",
          price: 100,
          image: "peri-peri-mandi.png"
        }
        
        
      ],
    },
  ];

  const activeItems = menuItems.find((menu) => menu.category === activeTab)?.items || [];

  return (
    <div className="bg-cream text-center py-10 px-5 flex items-center justify-center min-h-screen">
      <div>
        <h1 className="text-orange-600 font-semibold text-sm">PRICING MENU</h1>
        <h2 className="text-4xl font-bold text-gray-800 my-4">DELICIOUS DEALS FOR YOU</h2>
        <div className="flex justify-center gap-4 mt-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-700 shadow"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover p-2"
              />
              <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {item.description}
                </p>
              </div>
              <div className="text-red-500 font-bold text-lg px-4">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingMenu;
