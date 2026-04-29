import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const images = [
    '/4-min.jpeg', '/5-min.jpeg', '/6-min.jpeg', 
    '/7-min.jpeg', '/8-min.jpeg', '/9-min.jpeg'
  ];

  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-serif font-semibold text-white mb-4">Our Moments</h2>
          <p className="text-white/80 font-light max-w-lg mx-auto">Memories that we will cherish forever, captured in frames.</p>
        </motion.div>

        {/* Gallery Cards */}
        <div className="flex flex-col gap-8 items-center">
          {[
            ['/4-min.jpeg', '/5-min.jpeg'],
            ['/6-min.jpeg', '/7-min.jpeg'],
            ['/8-min.jpeg', '/9-min.jpeg']
          ].map((pair, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95, rotate: index % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 70,
                damping: 12,
                delay: index * 0.1 
              }}
              className="glass-card flex justify-center gap-4 sm:gap-8 w-full max-w-2xl bg-white/5"
            >
              {pair.map((img, i) => (
                <div 
                  key={i}
                  className={`bg-white/90 backdrop-blur-sm p-2 sm:p-3 pb-8 sm:pb-12 rounded-lg shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10 ${i % 2 === 0 ? '-rotate-3 hover:rotate-0' : 'rotate-3 hover:rotate-0'} w-1/2`}
                  onClick={() => setSelectedImg(img)}
                >
                  <div className="relative w-full aspect-square overflow-hidden rounded-md border border-gray-200">
                    <img src={img} alt={`Moment`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImg} 
              alt="Fullscreen Preview" 
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
