import React, { useRef } from 'react';
import Hero from './components/Hero';
import Profiles from './components/Profiles';
import Gallery from './components/Gallery';
import Videos from './components/Videos';
import Quotes from './components/Quotes';
import Game from './components/Game';
import Footer from './components/Footer';
import FloatingDecorations from './components/FloatingDecorations';
import FloatingMelody from './components/FloatingMelody';

function App() {
  const heroAudioRef = useRef(null);

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-white/30 overflow-x-hidden font-sans">
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 overflow-hidden bg-black">
        <video 
          src="/video1.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[30px]"></div>
      </div>

      <FloatingDecorations />
      <FloatingMelody heroAudioRef={heroAudioRef} />

      {/* Content */}
      <div className="relative z-10">
        <Hero audioRef={heroAudioRef} />
        <Profiles />
        <Gallery />
        <Videos />
        <Quotes />
        <Game />
        <Footer />
      </div>
    </div>
  );
}

export default App;
