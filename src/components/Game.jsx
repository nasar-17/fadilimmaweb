import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Trophy, RotateCcw, Heart } from 'lucide-react';

const TOTAL_ROUNDS = 5;
const TOTAL_BOXES = 5;

// Generate a short "pop" sound via Web Audio API
const playSound = (correct) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (correct) {
      // Happy chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, ctx.currentTime);
      osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.4);
    } else {
      // Dull buzz
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    // Audio not supported, silently fail
  }
};

const Game = () => {
  const [phase, setPhase] = useState('LOCKED'); // LOCKED | PLAYING | GAME_OVER
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctBox, setCorrectBox] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [chosen, setChosen] = useState(null);
  const timerRef = useRef(null);

  // Randomize the correct box for the current round
  const randomizeBox = useCallback(() => {
    setCorrectBox(Math.floor(Math.random() * TOTAL_BOXES));
    setRevealed(false);
    setChosen(null);
  }, []);

  // Start the game after password unlock
  const startGame = () => {
    setRound(1);
    setScore(0);
    randomizeBox();
    setPhase('PLAYING');
  };

  // Handle password submit
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'fadilimma') {
      setPwError(false);
      startGame();
    } else {
      setPwError(true);
    }
  };

  // Handle box click
  const handleBoxClick = (index) => {
    if (revealed) return;

    setChosen(index);
    setRevealed(true);

    const isCorrect = index === correctBox;
    playSound(isCorrect);

    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    // Proceed to next round or end game
    timerRef.current = setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        setPhase('GAME_OVER');
      } else {
        setRound((r) => r + 1);
        randomizeBox();
      }
    }, 1200);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Reset entire game
  const handlePlayAgain = () => {
    startGame();
  };

  const handleLock = () => {
    setPhase('LOCKED');
    setPassword('');
    setPwError(false);
  };

  // ─── LOCKED SCREEN ───
  const renderLocked = () => (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-50px' }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
      className="glass-panel max-w-md mx-auto text-center text-white"
    >
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 border border-white/20">
        <Lock size={28} className="text-white/80" />
      </div>
      <h2 className="text-3xl font-serif font-semibold mb-2">Secret Game</h2>
      <p className="text-white/70 font-light mb-8">Masukkan password untuk membuka game rahasia ini.</p>

      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setPwError(false); }}
          placeholder="Masukkan password..."
          className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all text-center backdrop-blur-sm"
        />
        {pwError && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-rose-400 text-sm"
          >
            Password salah, coba lagi!
          </motion.p>
        )}
        <button
          type="submit"
          className="px-8 py-3 bg-white text-black font-medium rounded-full shadow-lg hover:bg-white/90 hover:scale-105 transition-all"
        >
          Buka Game
        </button>
      </form>
    </motion.div>
  );

  // ─── PLAYING SCREEN ───
  const renderPlaying = () => (
    <motion.div
      key={`round-${round}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto text-center text-white"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 glass-card bg-white/5 py-3 px-6">
        <div className="text-left">
          <p className="text-xs text-white/50 uppercase tracking-wider">Ronde</p>
          <p className="text-2xl font-serif font-semibold">{round}<span className="text-white/40 text-lg">/{TOTAL_ROUNDS}</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/50 uppercase tracking-wider">Skor</p>
          <p className="text-2xl font-serif font-semibold text-rose-300">{score}<span className="text-white/40 text-lg">/{TOTAL_ROUNDS}</span></p>
        </div>
      </div>

      <p className="text-white/80 font-light mb-6">Tebak kotak mana yang berisi foto tersembunyi!</p>

      {/* Boxes */}
      <div className="grid grid-cols-5 gap-3 sm:gap-4 mb-6">
        {Array.from({ length: TOTAL_BOXES }).map((_, i) => {
          const isCorrect = i === correctBox;
          const isChosen = i === chosen;
          const showResult = revealed;

          return (
            <motion.button
              key={i}
              whileHover={!revealed ? { scale: 1.08 } : {}}
              whileTap={!revealed ? { scale: 0.95 } : {}}
              onClick={() => handleBoxClick(i)}
              disabled={revealed}
              className={`
                relative aspect-square rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${showResult && isCorrect
                  ? 'border-green-400 bg-green-400/20 shadow-[0_0_20px_rgba(74,222,128,0.3)]'
                  : showResult && isChosen && !isCorrect
                    ? 'border-rose-400 bg-rose-400/20 shadow-[0_0_20px_rgba(251,113,133,0.3)]'
                    : 'border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/30'
                }
              `}
            >
              {/* Hidden content - show on reveal */}
              <AnimatePresence>
                {showResult && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center p-2"
                  >
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/40">
                      <img
                        src="/mandiri-boy.jpeg"
                        alt="Found!"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Question mark when not revealed */}
              {!showResult && (
                <span className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-serif text-white/40">?</span>
              )}

              {/* Wrong X */}
              {showResult && isChosen && !isCorrect && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-3xl text-rose-400"
                >
                  ✕
                </motion.span>
              )}

              {/* Show where it was if user chose wrong */}
              {showResult && !isChosen && !isCorrect && (
                <span className="absolute inset-0 flex items-center justify-center text-xl text-white/20">✕</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card bg-white/5 py-3"
          >
            {chosen === correctBox ? (
              <p className="text-green-300 font-medium flex items-center justify-center gap-2">
                <Heart size={16} className="fill-green-300" /> Benar! Kamu menemukannya!
              </p>
            ) : (
              <p className="text-rose-300 font-medium">Salah! Coba lagi di ronde berikutnya.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  // ─── GAME OVER SCREEN ───
  const renderGameOver = () => {
    const isWin = score === TOTAL_ROUNDS;
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="glass-panel max-w-md mx-auto text-center text-white"
      >
        {isWin ? (
          <>
            <div className="w-20 h-20 rounded-full bg-yellow-400/20 flex items-center justify-center mx-auto mb-6 border border-yellow-400/40">
              <Trophy size={36} className="text-yellow-400" />
            </div>
            <h2 className="text-4xl font-serif font-semibold mb-2">Selamat! 🎉</h2>
            <p className="text-white/70 font-light mb-2">Skor sempurna!</p>
            <p className="text-3xl font-serif font-semibold text-yellow-300 mb-8">{score}/{TOTAL_ROUNDS}</p>
          </>
        ) : (
          <>
            <div className="w-20 h-20 rounded-full bg-rose-400/20 flex items-center justify-center mx-auto mb-6 border border-rose-400/40">
              <Heart size={36} className="text-rose-400" />
            </div>
            <h2 className="text-4xl font-serif font-semibold mb-2">Coba Lagi!</h2>
            <p className="text-white/70 font-light mb-2">Hampir berhasil, semangat!</p>
            <p className="text-3xl font-serif font-semibold text-rose-300 mb-8">{score}/{TOTAL_ROUNDS}</p>
          </>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handlePlayAgain}
            className="px-8 py-3 bg-white text-black font-medium rounded-full shadow-lg hover:bg-white/90 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} /> Main Lagi
          </button>
          <button
            onClick={handleLock}
            className="px-8 py-3 bg-white/10 text-white border border-white/20 font-medium rounded-full hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Kunci
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="relative w-full py-20 overflow-hidden min-h-screen flex items-center">
      <div className="relative z-10 container mx-auto px-4">
        {phase === 'LOCKED' && renderLocked()}
        {phase === 'PLAYING' && renderPlaying()}
        {phase === 'GAME_OVER' && renderGameOver()}
      </div>
    </section>
  );
};

export default Game;
