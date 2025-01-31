'use client';
import React, { useState, useEffect } from 'react';
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

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/api/feedback');
        const data = await response.json();
        setFeedbacks(data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedbacks();
  }, []);

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
                  {feedbacks
                    .filter((feedback) =>
                      feedback.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .sort((a, b) => {
                      if (sortField === 'date') {
                        return sortDirection === 'asc'
                          ? new Date(a.date) - new Date(b.date)
                          : new Date(b.date) - new Date(a.date);
                      } else if (sortField === 'rating') {
                        return sortDirection === 'asc'
                          ? a.overallRating - b.overallRating
                          : b.overallRating - a.overallRating;
                      }
                      return 0;
                    })
                    .map((feedback) => (
                      <tr
                        key={feedback._id}
                        className="border-b border-white/20 hover:bg-white/10 cursor-pointer"
                        onClick={() => setSelectedFeedback(feedback)}
                      >
                        <td className="p-4 text-white">{new Date(feedback.date).toLocaleDateString()}</td>
                        <td className="p-4 text-white">{feedback.name}</td>
                        <td className={`p-4 ${getRatingColor(feedback.overallRating)}`}>
                          {feedback.overallRating} <Star className="inline w-4 h-4" />
                        </td>
                        <td className="p-4 text-white">
                          {Object.entries(feedback.categoryRatings).map(([category, rating]) => (
                            <div key={category} className="flex items-center gap-2">
                              {category === 'Food Quality' && <ChefHat className="w-4 h-4" />}
                              {category === 'Service' && <Coffee className="w-4 h-4" />}
                              {category === 'Ambiance' && <Sparkles className="w-4 h-4" />}
                              {category === 'Wait Time' && <Clock className="w-4 h-4" />}
                              <span>{category}: {rating}</span>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Feedback Details */}
          {selectedFeedback && (
            <motion.div
              variants={fadeIn}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Feedback Details</h2>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="text-white hover:text-red-500 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-white/50" />
                  <span className="text-white">{selectedFeedback.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-white/50" />
                  <span className="text-white">{new Date(selectedFeedback.visitDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-white/50" />
                  <span className={`text-white ${getRatingColor(selectedFeedback.overallRating)}`}>
                    {selectedFeedback.overallRating}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Category Ratings:</h3>
                  {Object.entries(selectedFeedback.categoryRatings).map(([category, rating]) => (
                    <div key={category} className="flex items-center gap-2">
                      {category === 'Food Quality' && <ChefHat className="w-4 h-4 text-white/50" />}
                      {category === 'Service' && <Coffee className="w-4 h-4 text-white/50" />}
                      {category === 'Ambiance' && <Sparkles className="w-4 h-4 text-white/50" />}
                      {category === 'Wait Time' && <Clock className="w-4 h-4 text-white/50" />}
                      <span className="text-white">{category}: {rating}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Feedback:</h3>
                  <p className="text-white">{selectedFeedback.feedback}</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FeedbackDashboard;