import React from "react";
import { Linkedin, Twitter, Mail, Users, ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    position: "Chairman & Managing Director",
    image: "/api/placeholder/400/320",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "john@example.com",
    },
  },
  {
    name: "Jane Smith",
    position: "Director",
    image: "/api/placeholder/400/320",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "jane@example.com",
    },
  },
  {
    name: "Robert Brown",
    position: "Director",
    image: "/api/placeholder/400/320",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "robert@example.com",
    },
  },
];

const TeamMemberCard = ({ member }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#78004D]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
            <a href={member.socials.linkedin} className="bg-white p-2 rounded-full hover:bg-[#78004D] hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={member.socials.twitter} className="bg-white p-2 rounded-full hover:bg-[#78004D] hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={`mailto:${member.socials.email}`} className="bg-white p-2 rounded-full hover:bg-[#78004D] hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-[#78004D] transition-colors">
          {member.name}
        </h3>
        <p className="text-gray-600 mb-4">{member.position}</p>
        <div className="h-px w-16 bg-[#78004D] mx-auto"></div>
      </div>
    </div>
  );
};

const ProfessionalLeaders = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-6 h-6 text-[#78004D]" />
            <h2 className="text-[#78004D] uppercase text-sm font-semibold">
              Expert Team
            </h2>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Professional Leaders
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our exceptional team of industry experts who bring years of experience 
            and dedication to deliver excellence in every project.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="group inline-flex items-center gap-2 bg-[#78004D] text-white px-6 py-3 rounded-full hover:bg-[#8F005C] transition-colors">
            Join Our Team
            <ArrowUpRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLeaders;