import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { Star, Google, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    username: "Sarah Johnson",
    rating: 5,
    message: "Absolutely amazing experience! The ambiance was perfect and the food was extraordinary. Will definitely be coming back!",
    platform: "Google",
    date: "2 days ago"
  },
  {
    id: 2,
    username: "Michael Chen",
    rating: 4,
    message: "Great service and delicious food. The wine selection was impressive and the staff were very knowledgeable.",
    platform: "Google",
    date: "1 week ago"
  },
  {
    id: 3,
    username: "Emma Williams",
    rating: 5,
    message: "One of the best dining experiences I've had in years. The chef's tasting menu was outstanding!",
    platform: "Google",
    date: "2 weeks ago"
  },
  {
    id: 4,
    username: "David Rodriguez",
    rating: 5,
    message: "Exceptional dining experience! The fusion of flavors in each dish was perfectly balanced.",
    platform: "Google",
    date: "3 weeks ago"
  },
  {
    id: 5,
    username: "Lisa Thompson",
    rating: 4,
    message: "Beautiful atmosphere and fantastic service. The dessert menu was particularly impressive!",
    platform: "Google",
    date: "1 month ago"
  },
  {
    id: 6,
    username: "James Wilson",
    rating: 5,
    message: "The tasting menu was a culinary journey! Each course was better than the last.",
    platform: "Google",
    date: "1 month ago"
  }
];

const ReviewCard = ({ review }) => {
  const stars = Array(5).fill(0);
  
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 mb-6 min-w-[300px] md:min-w-[350px]"
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-[#7D0148] rounded-full flex items-center justify-center text-white font-semibold">
            {review.username.charAt(0)}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-gray-800">{review.username}</h3>
            <motion.div 
              className="flex items-center"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {stars.map((_, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                >
                  <Star
                    size={16}
                    className={`${
                      index < review.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          {/* <Google size={20} className="text-[#7D0148]" /> */}
        </motion.div>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 mb-2"
      >
        {review.message}
      </motion.p>
      <span className="text-sm text-gray-400">{review.date}</span>
    </motion.div>
  );
};

const ReviewSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });
  const [scrollX, setScrollX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [duplicatedReviews, setDuplicatedReviews] = useState([]);

  useEffect(() => {
    // Create triple set of reviews for smooth infinite scroll
    setDuplicatedReviews([...reviews, ...reviews, ...reviews]);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
    }
  }, [duplicatedReviews]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = 350; // Width of a single card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      const currentScroll = container.scrollLeft;
      const reviewsSetWidth = reviews.length * cardWidth;

      let newScrollX = currentScroll + scrollAmount;

      // Check if we need to loop
      if (currentScroll >= reviewsSetWidth * 2) {
        // If we're in the last set, jump back to middle set
        newScrollX = reviewsSetWidth + (currentScroll % reviewsSetWidth);
        container.scrollLeft = newScrollX - scrollAmount;
      } else if (currentScroll <= 0 && direction === 'left') {
        // If we're at the start and going left, jump to middle set
        newScrollX = reviewsSetWidth;
        container.scrollLeft = newScrollX - scrollAmount;
      }

      container.scrollTo({
        left: newScrollX,
        behavior: 'smooth'
      });
      setScrollX(newScrollX);
    }
  };

  // Auto scroll
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 3000); // Scroll every 3 seconds

    return () => clearInterval(interval);
  }, [scrollX]);

  return (
    <div className="py-16 px-4 bg-gray-50 overflow-hidden">
      <motion.div 
        ref={headingRef}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12 relative"
      >
        <h2 className="text-4xl font-bold text-[#7D0148] mb-4">What Our Guests Say</h2>
        <p className="text-gray-600 text-lg">Read reviews from our valued customers</p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronLeft size={24} className="text-[#7D0148]" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
        >
          <ChevronRight size={24} className="text-[#7D0148]" />
        </motion.button>

        <motion.div
          ref={containerRef}
          className="overflow-x-scroll scrollbar-hide flex gap-6 px-12"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Add custom scrollbar hiding
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default ReviewSection;