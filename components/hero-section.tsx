"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

export default function HeroSection() {
  const [candlesBlown, setCandlesBlown] = useState<boolean[]>(new Array(6).fill(false))
  const [allCandlesBlown, setAllCandlesBlown] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  const blowCandle = (index: number) => {
    if (candlesBlown[index]) return

    const newCandlesBlown = [...candlesBlown]
    newCandlesBlown[index] = true
    setCandlesBlown(newCandlesBlown)

    if (newCandlesBlown.every((blown) => blown)) {
      setAllCandlesBlown(true)
      triggerConfetti()
      setTimeout(() => setShowMessage(true), 1000)
    }
  }

  const triggerConfetti = () => {
    const colors = ["#F8B7CC", "#D4A017", "#FFD700", "#F7CAC9", "#D8BFD8"]
    const newConfetti = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -50,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setConfetti(newConfetti)

    setTimeout(() => setConfetti([]), 4000)
  }

  const messageText = "Happiest Birthday, My Love!"

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-starry-night">
      {/* Twinkling stars background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Heartbeat overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Heart className="w-8 h-8 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Luxury confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute w-4 h-4 rounded-full shadow-lg"
            style={{
              backgroundColor: piece.color,
              left: piece.x,
            }}
            initial={{ y: -50, rotate: 0, scale: 0 }}
            animate={{
              y: window.innerHeight + 50,
              rotate: 720,
              scale: [0, 1, 0.8],
              x: piece.x + (Math.random() - 0.5) * 300,
            }}
            transition={{ duration: 4, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Floating hearts celebration */}
      <AnimatePresence>
        {allCandlesBlown && (
          <>
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-blush-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.2, 0],
                  opacity: [0, 1, 0],
                  y: -150,
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  delay: Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 6,
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <div className="text-center relative z-10">
        {/* Luxury Birthday Cake */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          <div className="relative">
            {/* Main cake layer with luxury styling */}
            <div className="w-96 h-40 velvet-texture rounded-2xl mx-auto relative shadow-luxury">
              {/* Glossy 3D effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>

              {/* Top frosting */}
              <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-r from-blush-300 via-quartz-500 to-blush-300 rounded-t-2xl shadow-inner"></div>

              {/* Bottom frosting */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-blush-400 via-quartz-600 to-blush-400 rounded-b-2xl"></div>

              {/* Krish's name with gold embossing */}
              <div className="absolute top-8 left-4 right-4 flex justify-center">
                <div className="text-center">
                  <div className="text-3xl font-cursive gold-emboss font-bold tracking-wider luxury-heartbeat">
                    Krish
                  </div>
                  <div className="mt-2 text-lg font-cursive text-ivory-100 opacity-90">Happy Birthday!</div>
                </div>
              </div>

              {/* Luxury cake texture */}
              <div className="absolute inset-6 top-16 opacity-40">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="w-full h-0.5 bg-burgundy-800 mb-2 rounded-full"></div>
                ))}
              </div>

              {/* Elegant frosting drips */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 w-4 h-8 bg-gradient-to-b from-blush-300 to-blush-400"
                  style={{
                    left: `${8 + i * 7}%`,
                    borderRadius: "0 0 100% 100%",
                    transformOrigin: "top center",
                    transform: `scaleY(${0.7 + Math.random() * 0.5})`,
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)",
                  }}
                ></div>
              ))}
            </div>

            {/* Second luxury layer */}
            <div className="w-80 h-32 velvet-texture rounded-xl mx-auto -mt-20 relative shadow-velvet">
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent rounded-xl"></div>
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-quartz-300 via-blush-200 to-quartz-300 rounded-t-xl"></div>

              {/* Decorative elements */}
              <div className="absolute inset-x-0 top-10 flex justify-center space-x-12">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-ivory-100 shadow-gold-glow"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Luxury candles with enhanced flames */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex space-x-8">
              {candlesBlown.map((isBlown, index) => (
                <motion.div
                  key={index}
                  className="relative cursor-pointer interactive"
                  onClick={() => blowCandle(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Elegant candle */}
                  <div className="w-4 h-20 bg-gradient-to-b from-ivory-200 to-gold-300 rounded-sm shadow-lg border border-gold-400 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-sm"></div>
                  </div>

                  {/* Enhanced flame with flicker */}
                  <AnimatePresence>
                    {!isBlown && (
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                        style={{ animation: "flicker 1.5s ease-in-out infinite" }}
                        exit={{
                          scale: 0,
                          opacity: 0,
                          transition: { duration: 0.4 },
                        }}
                      >
                        <div className="w-5 h-6 bg-gradient-to-t from-gold-600 via-gold-400 to-ivory-200 rounded-full opacity-95 shadow-gold-glow border border-gold-300">
                          {/* Inner flame glow */}
                          <div className="absolute inset-1 bg-gradient-to-t from-gold-500 via-gold-300 to-ivory-100 rounded-full opacity-70 blur-sm"></div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Luxury smoke puff */}
                  <AnimatePresence>
                    {isBlown && (
                      <motion.div
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1.5, 2],
                          opacity: [0, 0.8, 0],
                          y: [0, -30, -60],
                        }}
                        transition={{ duration: 1.5 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-t from-gray-300 to-gray-100 rounded-full blur-md shadow-lg"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Elegant instructions */}
        {!allCandlesBlown && (
          <motion.p
            className="text-ivory-100 font-cursive text-2xl mb-12 luxury-heartbeat"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Click each candle to make a wish! ✨
          </motion.p>
        )}

        {/* Luxury birthday message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, type: "spring" }}
              className="text-center"
            >
              <motion.h1
                className="text-7xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-blush-400 to-gold-500 mb-6 romantic-glow"
                style={{ animation: "typewriter 3s steps(40, end)" }}
              >
                {messageText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                className="flex justify-center space-x-3 mt-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3, duration: 0.8, type: "spring" }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="luxury-heartbeat"
                    animate={{
                      scale: [1, 1.4, 1],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 4,
                    }}
                  >
                    <Heart className="w-10 h-10 text-blush-400 fill-current shadow-blush-glow" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
