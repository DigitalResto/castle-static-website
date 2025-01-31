'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Download,
  Menu,
  X
} from 'lucide-react';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDetailView, setIsDetailView] = useState(false);

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
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const slideIn = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25 } }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-emerald-500';
    if (rating >= 3) return 'text-amber-500';
    return 'text-rose-500';
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleFeedbackSelect = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDetailView(true);
  };

  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedFeedback(null);
  };

  const FeedbackCard = ({ feedback }) => (
    <motion.div
      layoutId={`feedback-${feedback._id}`}
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleFeedbackSelect(feedback)}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-gray-900">{feedback.name}</h3>
          <p className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString()}</p>
        </div>
        <div className={`flex items-center gap-1 ${getRatingColor(feedback.overallRating)}`}>
          <Star className="w-5 h-5 fill-current" />
          <span className="font-medium">{feedback.overallRating}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(feedback.categoryRatings).map(([category, rating]) => (
          <div key={category} className="flex items-center gap-2 text-sm text-gray-600">
            {category === 'Food Quality' && <ChefHat className="w-4 h-4 text-orange-500" />}
            {category === 'Service' && <Coffee className="w-4 h-4 text-blue-500" />}
            {category === 'Ambiance' && <Sparkles className="w-4 h-4 text-purple-500" />}
            {category === 'Wait Time' && <Clock className="w-4 h-4 text-green-500" />}
            <span>{rating}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-6"
      >
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Feedback Dashboard</h1>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search feedback..."
                      className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2 text-gray-600 hover:bg-gray-50"
                    onClick={() => handleSort('rating')}
                  >
                    <Star className="w-5 h-5" />
                    Sort by Rating
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900">Customer Feedback Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search feedback..."
                  className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="bg-white border border-gray-200 rounded-lg p-2 text-gray-600 hover:bg-gray-50"
                title="Export Data"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!isDetailView ? (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
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
                  <FeedbackCard key={feedback._id} feedback={feedback} />
                ))}
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={slideIn}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handleBackToList}
                  className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <ChevronDown className="w-5 h-5 rotate-90" />
                  Back to List
                </button>
                <div className={`flex items-center gap-2 ${getRatingColor(selectedFeedback.overallRating)}`}>
                  <Star className="w-6 h-6 fill-current" />
                  <span className="text-xl font-medium">{selectedFeedback.overallRating}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-900">{selectedFeedback.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Visit Date</p>
                      <p className="text-gray-900">
                        {new Date(selectedFeedback.visitDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Category Ratings</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedFeedback.categoryRatings).map(([category, rating]) => (
                      <div key={category} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {category === 'Food Quality' && <ChefHat className="w-5 h-5 text-orange-500" />}
                          {category === 'Service' && <Coffee className="w-5 h-5 text-blue-500" />}
                          {category === 'Ambiance' && <Sparkles className="w-5 h-5 text-purple-500" />}
                          {category === 'Wait Time' && <Clock className="w-5 h-5 text-green-500" />}
                          <span className="text-gray-600">{category}</span>
                        </div>
                        <p className="text-2xl font-medium text-gray-900">{rating}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Feedback</h3>
                  <p className="text-gray-600 bg-gray-50 rounded-lg p-4">
                    {selectedFeedback.feedback}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FeedbackDashboard;