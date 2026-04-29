import React from 'react';
import { motion } from 'framer-motion';

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const WhatsAppIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const GlobeIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
);

const Footer = () => {
  return (
    <footer className="relative w-full py-10 overflow-hidden text-white bg-transparent">
      <div className="relative z-10 container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto glass-card bg-white/5 border border-white/10 p-6 md:px-10 rounded-[2rem]"
        >
          {/* Promo Section */}
          <div className="text-center mb-8">
            <p className="text-white/80 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto italic">
              Ingin momen seperti ini?
              Mulai bersama Drena Creative. Klik salah satu kontak di bawah!
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/10 pt-6">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shadow-lg">
                <img src="/Logo.png" alt="Drena Creative Logo" className="w-full h-full object-contain p-1.5" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-white/90 tracking-[0.2em] text-xs uppercase">Drena Creative</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Digital Agency</span>
              </div>
            </div>

            {/* Links Section */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
              <a 
                href="https://www.instagram.com/drena_creative/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-all"
              >
                <InstagramIcon size={18} />
                <span className="text-[10px] uppercase tracking-widest font-medium">Instagram</span>
              </a>
              <a 
                href="https://wa.me/6288242328927" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-all"
              >
                <WhatsAppIcon size={18} />
                <span className="text-[10px] uppercase tracking-widest font-medium">WhatsApp</span>
              </a>
              <a 
                href="https://drenacreative.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 text-white/60 hover:text-white transition-all"
              >
                <GlobeIcon size={18} />
                <span className="text-[10px] uppercase tracking-widest font-medium">Website</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
