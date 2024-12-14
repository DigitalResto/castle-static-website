import React from "react";

const teamMembers = [
  {
    name: "Muhammed Haris",
    position: "Chairman & Managing Director",
    image: "peri-peri-mandi.png",
  },
  {
    name: "Muhammed Muhsin",
    position: "Director",
    image: "peri-peri-mandi.png",
  },
  {
    name: "Ashraf",
    position: "Director",
    image: "peri-peri-mandi.png",
  },
];

const ProfessionalLeaders = () => {
  return (
    <div className="bg-[#FFF7F2] py-10 px-5">
      <div className="text-center">
        <h2 className="text-orange-600 uppercase text-sm font-semibold">Expert Chef</h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-2">Professional Leaders</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-60 object-contain"
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalLeaders;
