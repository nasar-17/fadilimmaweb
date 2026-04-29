import React from 'react';
import { motion } from 'framer-motion';

const VideoCard = ({ src, title, caption }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className="glass-card flex flex-col w-full max-w-2xl mx-auto mb-8 bg-white/5"
    >
      <div className="relative w-full rounded-xl overflow-hidden mb-4">
        <video 
          src={src} 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="text-white text-center">
        <h3 className="text-xl font-serif font-semibold mb-1">{title}</h3>
        <p className="text-sm font-light text-white/70">{caption}</p>
      </div>
    </motion.div>
  );
};

const Videos = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden min-h-screen flex items-center border-t border-white/10">
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-semibold text-white mb-4">Special Videos</h2>
          <p className="text-white/80 font-light">Moments in motion.</p>
        </motion.div>

        <div className="flex flex-col gap-8">
          <VideoCard 
            src="/video1.mp4" 
            title="Our Trip" 
            caption="Written in waves and sunsets." 
          />
          <VideoCard 
            src="/video2.mp4" 
            title="Café Moments" 
            caption="Every sip, a memory." 
          />
        </div>
      </div>
    </section>
  );
};

export default Videos;
