import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ size = 24 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const ProfileImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl mb-4 ${!isLoaded ? 'skeleton' : ''}`}>
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

const Profiles = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
          {/* Profile 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -30, scale: 0.95, rotate: -2 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              duration: 1
            }}
            className="w-full md:w-1/2 glass-card flex flex-col items-center text-center text-white"
          >
            <ProfileImage src="/mandiri-boy-min.jpeg" alt="Boy" />
            <h2 className="text-2xl font-serif font-semibold mb-1">Fadil</h2>
            <a 
              href="https://www.instagram.com/muhammadfadilfajri/" 
              target="_blank" 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white hover:bg-white/20 hover:scale-105 transition-all mb-4"
            >
              <InstagramIcon size={14} />
              <span>@muhammadfadilfajri</span>
            </a>
            <p className="font-light text-white/90">"The one who always makes her laugh."</p>
          </motion.div>

          {/* Profile 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 30, scale: 0.95, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ 
              type: "spring",
              stiffness: 80,
              damping: 15,
              duration: 1,
              delay: 0.1
            }}
            className="w-full md:w-1/2 glass-card flex flex-col items-center text-center text-white"
          >
            <ProfileImage src="/mandiri-girl-min.jpeg" alt="Girl" />
            <h2 className="text-2xl font-serif font-semibold mb-1">Imma</h2>
            <a 
              href="https://www.instagram.com/nrrhkmaaaa/" 
              target="_blank" 
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white hover:bg-white/20 hover:scale-105 transition-all mb-4"
            >
              <InstagramIcon size={14} />
              <span>@nrrhkmaaaa</span>
            </a>
            <p className="font-light text-white/90">"The reason behind his smiles."</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Profiles;
