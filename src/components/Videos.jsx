import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const VideoCard = ({ src, title, caption }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 80,
        damping: 15
      }}
      className="glass-card flex flex-col w-full max-w-2xl mx-auto mb-8 bg-white/5 group"
    >
      <div 
        className="relative w-full rounded-xl overflow-hidden mb-4 cursor-pointer aspect-video bg-black/20"
        onClick={togglePlay}
      >
        <video 
          ref={videoRef}
          src={src} 
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        
        {/* Play/Pause Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isPlaying ? 'bg-black/0 group-hover:bg-black/30' : 'bg-black/40'}`}>
          <AnimatePresence>
            {(!isPlaying || (isPlaying && true)) && ( // Always show on hover via CSS group-hover
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: isPlaying ? 0.8 : 1, 
                  opacity: isPlaying ? 0 : 1 
                }}
                whileHover={{ scale: 1.1 }}
                className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              >
                {isPlaying ? <Pause size={30} fill="currentColor" /> : <Play size={30} fill="currentColor" className="ml-1" />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="text-white text-center pb-2">
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
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
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
