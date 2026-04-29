import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const FloatingDecorations = () => {
  const { scrollYProgress } = useScroll();
  
  // Different speeds and directions for the parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Left side */}
      <motion.div style={{ y: y1 }} className="absolute left-4 md:left-12 top-[15%] text-pink-400/70">
        <Heart size={48} fill="currentColor" className="animate-bounce" />
      </motion.div>

      {/* Right side */}
      <motion.div style={{ y: y4 }} className="absolute right-10 md:right-20 top-[65%] text-pink-300/70">
        <Heart size={44} fill="currentColor" className="animate-bounce" />
      </motion.div>
    </div>
  );
};

export default FloatingDecorations;
