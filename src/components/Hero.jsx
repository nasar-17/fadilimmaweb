import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const Hero = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (!hasStarted) {
        audioRef.current.currentTime = 118; // Jump to 01:58
        setHasStarted(true);
      }
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Main Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: "-50px" }}
        transition={{ 
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 1
        }}
        className="relative z-10 max-w-md w-full mx-4 glass-panel text-center text-white"
      >
        <h1 className="text-5xl font-serif font-semibold mb-3 tracking-wide">Our Story</h1>
        <p className="text-lg font-light text-white/80 mb-8 italic">"Every moment with you is a beautiful melody."</p>

        {/* Music Player */}
        <div className="flex items-center gap-4 bg-white/10 rounded-full p-2 pr-6 border border-white/20 backdrop-blur-md">
          <div 
            className={`w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative group cursor-pointer shadow-lg ${!isLoaded ? 'skeleton' : ''}`} 
            onClick={togglePlay}
          >
            <img 
              src="/foto cover-min.jpg" 
              alt="Album Cover" 
              className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
              {isPlaying ? <Pause size={20} className="text-white fill-white" /> : <Play size={20} className="text-white fill-white ml-1" />}
            </div>
          </div>
          <div className="text-left flex-1 overflow-hidden">
            <h3 className="text-sm font-medium truncate">MASA INI, NANTI, DAN MASA INDAH LAINNNYA</h3>
            <p className="text-xs text-white/60 truncate">Nuca</p>
          </div>
        </div>
        
        <audio ref={audioRef} src="/Nuca - MASA INI, NANTI, DAN MASA INDAH LAINNNYA Lyric Video.mp3" loop preload="none" />
      </motion.div>
    </section>
  );
};

export default Hero;
