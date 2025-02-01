import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    id: 1,
    username: "Anshid Rahman",
    rating: 4,
    message:
      "One of the Restaurant in Bangalore, situated in Madiwala. Best food spot in Madiwala. They have variety of food options. Their mandi is special in the menu. They do accept payment as UPI and Cash. They accept party orders also. Nice ambience and parking is limited. Service is good. Food quality is good",
    link: "https://g.co/kgs/EMTQeoU",
    date: "a month ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjWbFbNdGNuELLzchwfZlcOzyuyGI-2qdvC8WdL1ZNVtaS_DdhQZMQ=s64-c-rp-mo-ba6-br100",
  },
  {
    id: 2,
    username: "Shimil Mohandas",
    rating: 5,
    message:
      "As an Arabic food enthusiast, I was blown away by the authentic flavors and outstanding service at this restaurant! The Madhghut was absolutely delicious, and every bite was a testament to the chef's skill. If you're in Bangalore, this place is a must-visit for a truly exceptional dining experience that will leave you craving for more.",
    link: "https://g.co/kgs/gi8sxC5",
    date: "1 month ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjU_pWEukgi4ccZMk3S7DWhwQ_JK3rpZNfPqd6QQ2UcglkezhlH4KQ=s64-c-rp-mo-ba5-br100",
  },
  {
    id: 3,
    username: "George Francis",
    rating: 5,
    message:
      "Castle Restaurant serves one of the best Mandi in Bangalore. Located in the busy streets of Madiwala, getting parking for cars would be a pain. They have limited seating at the outlet near Tea Time, but service is relatively quick, so we didn't have to wait much to get seated.",
    link: "https://g.co/kgs/GVuLewL",
    date: "3 months ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjW6siPv_u72Rwi7DVXamNAKSQt7mWndtcEYlB1_WT_xDvLnfitJ_w=s64-c-rp-mo-ba6-br100",
  },
  {
    id: 4,
    username: "Nabeel Muhammed",
    rating: 4,
    message:
      "Had their masala shawai mandi and Malabar chicken biriyani. Tasted above average. The shawai chicken was juicy and tender.",
    link: "https://g.co/kgs/aBF7czx",
    date: "2 weeks ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXB0sgzd67yzQsXso5mEvRknLDFC8JWdu50neGrseEWSekf304j=s64-c-rp-mo-ba4-br100",
  },
  {
    id: 5,
    username: "Asifali Shaz",
    rating: 4,
    message:
      "The mandhi and arabian dishes are quite good. And maybe this is one of the oldest mandhi brand in madiwala keeping its taste as it is.",
    link: "https://g.co/kgs/t8HwfPy",
    date: "1 week ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXSz87rILikNmG0cFVkgCv2C7E8BrHxesDOksxdh-Bgtyvy3zNX=s64-c-rp-mo-ba4-br100",
  },
  {
    id: 6,
    username: "Rahul Raveendran",
    rating: 5,
    message:
      "The best mandi restaurant in Madiwala is undoubtedly Castle Restaurant. They offer an extensive variety of chicken and mutton mandi, each prepared with authentic flavors and high-quality ingredients. The menu caters to a wide range of preferences.",
    link: "https://g.co/kgs/KN6hz8g",
    date: "5 days ago",
    imageUrl:
      "https://lh3.googleusercontent.com/a-/ALV-UjXIrEGOzGN-oMidmbxl-wHi_hhze618QkpewtwiTfwDDi5HYGYxHQ=s64-c-rp-mo-ba5-br100",
  },
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
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div className="flex items-center" whileHover={{ scale: 1.05 }}>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
              src={review.imageUrl}
              alt={review.username}
              className="w-full h-full object-cover"
            />
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
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {stars.map((_, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                >
                  <Star
                    size={16}
                    className={`${
                      index < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
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
      setMaxScroll(
        containerRef.current.scrollWidth - containerRef.current.clientWidth
      );
    }
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const newScrollX =
        direction === "left"
          ? Math.max(scrollX - 400, 0)
          : Math.min(scrollX + 400, maxScroll);

      containerRef.current.scrollTo({
        left: newScrollX,
        behavior: "smooth",
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
        <h2 className="text-4xl font-bold text-[#7D0148] mb-4">
          What Our Guests Say
        </h2>
        <p className="text-gray-600 text-lg">
          Read reviews from our valued customers
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll("left")}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg ${
            scrollX === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={scrollX === 0}
        >
          <ChevronLeft size={24} className="text-[#7D0148]" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll("right")}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg ${
            scrollX >= maxScroll
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100"
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
        <div className="flex justify-center my-5">
          <Link href={'/feedback'}>
          <button className="group inline-flex items-center gap-2 bg-[#78004D] text-white px-6 py-3 rounded-full hover:bg-[#8F005C] transition-colors">
            Give Your Feedback
            <ArrowUpRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
