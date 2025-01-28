import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    username: "Vineeth Krishnan C",
    rating: 5,
    message: "If you're looking for a delicious Mandi experience, this restaurant is a must-visit! The unlimited Mandi is incredibly tasty and perfect for sharing with friends. The customer service is excellent, making every visit enjoyable. Highly recommend it for anyone craving authentic flavors and a great dining atmosphere!",
    link: "https://goo.gl/maps/example1",
    date: "2 months ago"
  },
  {
    id: 2,
    username: "Koushik Tamilmaran",
    rating: 4,
    message: "A very detailed Mandi place that offers great combinations and a great view. The service is great and the ambience is great. The prices are moderate to high. A good place for dates. And the taste is good to very good. The variety of food is also pretty high with lot of options for Mandi and Al Fam.",
    link: "https://goo.gl/maps/example2",
    date: "4 months ago"
  },
  {
    id: 3,
    username: "Crystal Snow",
    rating: 4,
    message: "One of the nice restaurants I've visited. The ambience as well as the staff behavior was good😊 We ordered Corn ginger and garlic, Mushroom manchurian, Paneer Tikka masala, Naan, Laccha paratha and Veg schezwan fried rice. All of them were delicious except Laccha paratha, which was much oily. Overall good experience😎would visit again!",
    link: "https://goo.gl/maps/example3", 
    date: "5 months ago"
  },
  {
    id: 4,
    username: "Danish Jaffar",
    rating: 5,
    message: "I've been visiting this restaurant for the past 2.5 years, and it never fails to impress me! The food is consistently delicious, with every dish prepared to perfection. The staff is incredibly welcoming, attentive, and always make me feel at home. I highly recommend this place to anyone looking for an exceptional dining experience.",
    link: "https://goo.gl/maps/example4",
    date: "1 week ago" 
  },
  {
    id: 5,
    username: "Nilesh Pawar",  
    rating: 5,
    message: "I have been visiting this fantastic hotel in BTM Layout, Bangalore, for the past year, and it has never failed to impress me. The food here is consistently delightful, offering a perfect blend of taste and quality. The staff is well-trained, courteous, and always goes the extra mile to ensure a pleasant dining experience.",
    link: "https://goo.gl/maps/example5",
    date: "1 month ago"
  },
  {  
    id: 6,
    username: "Ann Das",
    rating: 5, 
    message: "I had the pleasure of lunch at Castle Restaurant today, and I must say, it was an incredible experience! The ambiance was stunning, with elegant decor and a warm, inviting atmosphere. The staff were attentive, friendly, and provided excellent service throughout my visit.",
    link: "https://goo.gl/maps/example6",
    date: "2 weeks ago"
  }
];

const ReviewCard = ({ review }) => {
  const stars = Array(5).fill(0);
  
  return (
    <motion.a 
      href={review.link}
      target="_blank"
      className="bg-white rounded-lg shadow-lg p-6 mb-6 min-w-[300px] md:min-w-[350px] block"
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
    </motion.a>
  );
};

const ReviewSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });
  const [scrollX, setScrollX] = React.useState(0);
  const [maxScroll, setMaxScroll] = React.useState(0);

  React.useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth);
    }
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const newScrollX = direction === 'left' 
        ? Math.max(scrollX - 400, 0)
        : Math.min(scrollX + 400, maxScroll);
      
      containerRef.current.scrollTo({
        left: newScrollX,
        behavior: 'smooth'
      });
      setScrollX(newScrollX);
    }
  };

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
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg ${
            scrollX === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          disabled={scrollX === 0}
        >
          <ChevronLeft size={24} className="text-[#7D0148]" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg ${
            scrollX >= maxScroll ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
          }`}
          disabled={scrollX >= maxScroll}
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
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSection;