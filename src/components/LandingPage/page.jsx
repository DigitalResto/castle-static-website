import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AboutUs from "../AboutUs/page";
import Card from "../Card/page";
import ReviewSection from "../Feedback/page";
import Footer from "../Footer/page";
import Header from "../Header/page";
import ProfessionalLeaders from "../Members/page";
import ChooseYourItems from "../Menu/page";
import PricingMenu from "../Pricing/page";
import Link from 'next/link';

const AnimatedTitle = () => {
  const letters = "Castle Resto".split("");
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] space-y-4 px-4"
    >
      <motion.h1 className="text-8xl md:text-6xl lg:text-9xl md:font-extrabold text-white font-extrabold flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { 
                opacity: 0,
                y: 50,
                rotate: -20
              },
              visible: {
                opacity: 1,
                y: 0,
                rotate: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1
                }
              }
            }}
            className={letter === " " ? "mx-4" : "hover:text-[#7D0148] transition-colors duration-300"}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex flex-col items-center space-y-4"
      >
        <p className="text-white text-xl md:text-2xl font-light italic">
          Where Royal Dining Meets Arabian Elegance
        </p>
        
        <div className="flex items-center space-x-2">
          <motion.span 
            className="text-3xl md:text-4xl font-bold text-[#7D0148]"
            whileHover={{ scale: 1.1 }}
          >
            Mandhi
          </motion.span>
          <span className="text-white text-lg md:text-xl">
            - Our Signature Dish
          </span>
        </div>

<Link href={'/reg-waitlist'}>
<motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#7D0148] text-white px-8 py-3 rounded-full text-lg font-semibold mt-4"
        >
          Reserve Your Table
        </motion.button>
</Link>
      </motion.div>
    </motion.div>
  );
};

export default function LandingPage() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#7D0148] transform origin-left z-50"
                style={{ scaleX }}
            />
            
            <section className="relative min-h-screen">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(/image01.jpg)',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                    {/* Header at the top */}
                    <Header />
                    
                    {/* Hero content */}
                    <AnimatedTitle />
                </div>
            </section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <AboutUs />
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <PricingMenu />
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <ChooseYourItems />
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <ReviewSection />
            </motion.section>

            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
            >
                <ProfessionalLeaders />
            </motion.section>
            <Footer />
        </>
    );
}