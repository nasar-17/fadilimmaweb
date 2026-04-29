import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const FloatingMelody = ({ heroAudioRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const kataAudioRef = useRef(null);

  const toggleKataKata = () => {
    if (isPlaying) {
      // Stop kata-kata audio
      kataAudioRef.current.pause();
      kataAudioRef.current.currentTime = 0;
      setIsPlaying(false);

      // Restore hero volume
      if (heroAudioRef?.current) {
        heroAudioRef.current.volume = 1.0;
      }
    } else {
      // Start kata-kata audio
      if (kataAudioRef.current) {
        kataAudioRef.current.play().catch(err => console.error("Playback failed:", err));
        setIsPlaying(true);

        // Reduce hero volume by 50%
        if (heroAudioRef?.current) {
          heroAudioRef.current.volume = 0.5;
        }
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    // Restore hero volume when kata-kata finishes
    if (heroAudioRef?.current) {
      heroAudioRef.current.volume = 1.0;
    }
  };

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleKataKata}
        className={`
          fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
          flex items-center justify-center cursor-pointer
          shadow-xl border transition-all duration-300
          ${isPlaying 
            ? 'bg-rose-500/30 border-rose-400/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]' 
            : 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30'
          }
          backdrop-blur-md
        `}
      >
        <Music 
          size={24} 
          className={`transition-all duration-300 ${isPlaying ? 'text-rose-300 animate-pulse' : 'text-white/80'}`} 
        />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-rose-400 animate-ping"></span>
        )}
      </motion.button>

      <audio 
        ref={kataAudioRef} 
        src="/kata%20kata.mp3" 
        onEnded={handleEnded} 
        preload="auto" 
        onCanPlayThrough={() => {
          if (kataAudioRef.current) kataAudioRef.current.volume = 1.0;
        }}
      />
    </>
  );
};

export default FloatingMelody;
