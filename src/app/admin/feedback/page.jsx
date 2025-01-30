'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Search,
  Filter,
  ChevronDown,
  Mail,
  Calendar,
  ArrowUpDown,
  ChefHat,
  Coffee,
  Clock,
  Sparkles,
  XCircle,
  Download
} from 'lucide-react';

// Sample data structure
const sampleFeedback = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "2024-01-28",
    ratings: {
      'Food Quality': 5,
      'Service': 4,
      'Ambiance': 5,
      'Wait Time': 4
    },
    overallRating: 5,
    feedback: "Exceptional dining experience! The atmosphere was perfect for our anniversary celebration."
  },
  // Add more sample data as needed
];

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState(sampleFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-red-500';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#76004C] via-[#8A0059] to-[#4A002F]">
      <motion.div
        initial="hidden"
        animate="visible"
        className="container mx-auto p-6"
      >
        {/* Header Section */}
        <motion.div
          variants={fadeIn}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Customer Feedback Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="bg-white/20 border border-white/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#76004C] w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <button
                className="bg-white/20 border border-white/30 rounded-lg p-2 text-white hover:bg-white/30 transition-colors"
                title="Export Data"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feedback List */}
          <motion.div
            variants={fadeIn}
            className="lg:col-span-2 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-4 text-left text-white">
                      <button
                        onClick={() => handleSort('date')}
                        className="flex items-center gap-2 hover:text-white/80"
                      >
                        Date
                        <ArrowUpDown className="w-4 h-4" />
                      </button>
                    </th>
                    <th className="p-4 text-left text-white">Customer</th>
                    <th className="p-4 text-left text-white">Rating</th>
                    <th className="p-4 text-left text-white">Categories</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <motion.tr
                      key={feedback.id}
                      className="border-b border-white/10 cursor-pointer hover:bg-white/5"
                      onClick={() => setSelectedFeedback(feedback)}
                      whileHover={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="p-4 text-white/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(feedback.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-white">{feedback.name}</span>
                          <span className="text-white/60 text-sm">{feedback.email}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < feedback.overallRating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-white/30'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(feedback.ratings).map(([category, rating]) => (
                            <span
                              key={category}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/10 text-white/80 text-sm"
                            >
                              {rating}/5
                              {category === 'Food Quality' && <ChefHat className="w-3 h-3" />}
                              {category === 'Service' && <Coffee className="w-3 h-3" />}
                              {category === 'Ambiance' && <Sparkles className="w-3 h-3" />}
                              {category === 'Wait Time' && <Clock className="w-3 h-3" />}
                            </span>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Feedback Detail Panel */}
          <motion.div
            variants={fadeIn}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 h-fit"
          >
            {selectedFeedback ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-white">Feedback Details</h2>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-white/60 hover:text-white"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white/60 mb-1">Customer Information</h3>
                    <p className="text-white">{selectedFeedback.name}</p>
                    <p className="text-white/80">{selectedFeedback.email}</p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-1">Date</h3>
                    <p className="text-white">
                      {new Date(selectedFeedback.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-1">Category Ratings</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(selectedFeedback.ratings).map(([category, rating]) => (
                        <div key={category} className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            {category === 'Food Quality' && <ChefHat className="w-4 h-4" />}
                            {category === 'Service' && <Coffee className="w-4 h-4" />}
                            {category === 'Ambiance' && <Sparkles className="w-4 h-4" />}
                            {category === 'Wait Time' && <Clock className="w-4 h-4" />}
                            <span className="text-white/80">{category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, index) => (
                              <Star
                                key={index}
                                className={`w-4 h-4 ${
                                  index < rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-white/30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/60 mb-1">Feedback</h3>
                    <p className="text-white bg-white/5 rounded-lg p-4">
                      {selectedFeedback.feedback}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/60 py-8">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a feedback to view details</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackDashboard;