'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Coffee, ChefHat, Clock, User, MessageSquare, Sparkles } from 'lucide-react';
import Header from '@/components/Header/page';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const successAnimation = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

const LuxuryFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    visitDate: '',
    feedback: ''
  });

  const categories = [
    { name: 'Food Quality', icon: <ChefHat className="w-6 h-6" /> },
    { name: 'Service', icon: <Coffee className="w-6 h-6" /> },
    { name: 'Ambiance', icon: <Sparkles className="w-6 h-6" /> },
    { name: 'Wait Time', icon: <Clock className="w-6 h-6" /> }
  ];

  const [categoryRatings, setCategoryRatings] = useState(
    categories.reduce((acc, cat) => ({ ...acc, [cat.name]: 0 }), {})
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, categoryRatings, overallRating: rating })
      });

      if (response.ok) {
        setShowSuccess(true);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const handleAnimationComplete = () => {
    setShowSuccess(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      visitDate: '',
      feedback: ''
    });
    setCategoryRatings(categories.reduce((acc, cat) => ({ ...acc, [cat.name]: 0 }), {}));
    setRating(0);
    setHover(0);
  };

  return (
    <>
      <AnimatePresence>
        {showSuccess && <SuccessOverlay onAnimationComplete={handleAnimationComplete} />}
      </AnimatePresence>

      <motion.div 
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gradient-to-br from-[#76004C] via-[#8A0059] to-[#4A002F] p-4 md:p-8"
      >
        <Header/>
        <motion.div 
          variants={fadeIn}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center mb-12"
          >
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Share Your Dining Experience
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 text-lg"
            >
              We value your feedback to create an even more exceptional experience
            </motion.p>
          </motion.div>

          <motion.form 
            variants={staggerContainer}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            {/* Personal Information */}
            <motion.div 
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-200 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#76004C] transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-12 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </motion.div>

            {/* Category Ratings */}
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-r from-white/10 to-white/5 p-4 rounded-lg border border-white/20 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {category.icon}
                    <span className="text-white font-medium">{category.name}</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCategoryRatings({
                          ...categoryRatings,
                          [category.name]: star
                        })}
                        className={`transform transition-all ${
                          categoryRatings[category.name] >= star
                            ? 'text-yellow-400'
                            : 'text-white/30'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Overall Rating */}
            <motion.div 
              variants={fadeIn}
              className="text-center py-6"
            >
              <h3 className="text-white text-lg mb-4">Overall Experience</h3>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className={`transform transition-all ${
                      (hover || rating) >= star ? 'text-yellow-400' : 'text-white/30'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Feedback Text */}
            <motion.div 
              variants={fadeIn}
              className="relative"
            >
              <textarea
                placeholder="Share your experience with us..."
                className="w-full h-32 bg-white/20 border border-white/30 rounded-lg p-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group bg-gradient-to-r from-[#76004C] to-[#8A0059] hover:from-[#8A0059] hover:to-[#9A0066] text-white px-8 py-3 rounded-lg font-medium transition-all transform focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-[#4A002F] inline-flex items-center gap-2 shadow-lg"
              >
                Submit Feedback
                <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
};

const SuccessOverlay = ({ onAnimationComplete }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-[#76004C] via-[#8A0059] to-[#4A002F]"
    >
      <motion.div
        variants={successAnimation}
        onAnimationComplete={() => {
          setTimeout(onAnimationComplete, 1000); // Delay before closing
        }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 10,
            delay: 0.2
          }}
          className="mb-6"
        >
          <Star className="w-24 h-24 text-white mx-auto" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Thank You!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/80 text-lg"
        >
          Your feedback has been submitted successfully
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LuxuryFeedback;