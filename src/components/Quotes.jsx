import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import quotesData from '../data/quotes';

const Quotes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotesData.length);
    }, 8000); // Change every 8 seconds (to allow time for typing)

    return () => clearInterval(timer);
  }, []);

  const currentQuote = quotesData[currentIndex];

  // Typing animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Speed of typing
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    },
  };

  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center border-t border-white/10">
      <div className="relative z-10 container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="glass-card bg-white/5 border border-white/10 p-8 md:p-16 rounded-[3rem] text-center relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <Quote size={200} className="absolute -top-10 -left-10 rotate-12" />
            <Quote size={200} className="absolute -bottom-10 -right-10 -rotate-12" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              {/* Quote Text with Typing Effect */}
              <motion.h3 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-2xl md:text-3xl font-serif font-medium text-white mb-8 leading-relaxed italic"
              >
                "{currentQuote.text.split("").map((char, index) => (
                  <motion.span key={`${currentIndex}-${index}`} variants={letterVariants}>
                    {char}
                  </motion.span>
                ))}"
              </motion.h3>

              {/* Attribution */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: currentQuote.text.length * 0.04 + 0.2 }}
                className="flex items-center justify-center gap-2 text-white/50 text-sm tracking-[0.2em] uppercase font-light"
              >
                <span className="w-8 h-[1px] bg-white/20"></span>
                <span>Seperti di lagu</span>
                <span className="text-white font-medium tracking-widest">{currentQuote.author}</span>
                <span className="w-8 h-[1px] bg-white/20"></span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Quotes;
