import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingDecorations = () => {
  const { scrollYProgress } = useScroll();
  
  // Reduced number of parallax elements for better performance
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden sm:block">
      {/* Left side */}
      <motion.div style={{ y: y1 }} className="absolute left-4 md:left-12 top-[15%] text-pink-400/50">
        <Heart size={48} fill="currentColor" className="animate-bounce" />
      </motion.div>

      {/* Right side */}
      <motion.div style={{ y: y2 }} className="absolute right-10 md:right-20 top-[65%] text-pink-300/50">
        <Heart size={44} fill="currentColor" className="animate-bounce" />
      </motion.div>
    </div>
  );
};

export default FloatingDecorations;
