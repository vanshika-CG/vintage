"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart } from "lucide-react"

const reasons = [
  "Your smile lights up my entire world",
  "The way you laugh at my terrible jokes",
  "How you make every ordinary day feel magical",
  "Your kindness touches everyone around you",
  "The way you hold me when I need comfort",
  "How you believe in my dreams even when I don't",
  "Your beautiful soul that shines so bright",
  "The way you make me want to be better",
]

export default function ReasonsILoveYou() {
  const [revealedCards, setRevealedCards] = useState<boolean[]>(new Array(8).fill(false))

  const revealCard = (index: number) => {
    const newRevealed = [...revealedCards]
    newRevealed[index] = !newRevealed[index]
    setRevealedCards(newRevealed)
  }

  return (
    <section className="py-24 px-4 luxury-gradient-primary relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blush-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0.5, 1, 0.5],
              opacity: [0.1, 0.4, 0.1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          className="text-6xl font-cursive text-burgundy-900 text-center mb-8 luxury-heartbeat gold-emboss"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          8 Reasons I Love You
        </motion.h2>

        <motion.p
          className="text-center text-burgundy-700 font-cursive text-2xl mb-16 luxury-heartbeat"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          animate={{ opacity: [0.7, 1, 0.7] }}
        >
          Click each card to reveal why you're so special ✨
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="relative h-56 cursor-pointer interactive floating-luxury"
              style={{ animationDelay: `${index * 0.2}s` }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => revealCard(index)}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Card container with luxury flip effect */}
              <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{ rotateY: revealedCards[index] ? 180 : 0 }}
                transition={{ duration: 1, type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front of card - Luxury design */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden velvet-texture rounded-2xl shadow-luxury flex flex-col items-center justify-center text-ivory-100 overflow-hidden border-2 border-gold-400"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Luxury background pattern */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(15)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-gold-300"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          rotate: [0, 360],
                          scale: [0.3, 0.8, 0.3],
                          opacity: [0.2, 0.6, 0.2],
                        }}
                        transition={{
                          duration: 5 + Math.random() * 3,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: Math.random() * 2,
                        }}
                      >
                        <Heart className="w-3 h-3 fill-current" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Card content */}
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="luxury-heartbeat"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <Heart className="w-16 h-16 fill-current mb-6 mx-auto text-gold-400 shadow-gold-glow" />
                    </motion.div>

                    <div className="text-3xl font-bold mb-3 gold-emboss">Reason #{index + 1}</div>
                    <div className="text-lg font-cursive opacity-90">Click to reveal</div>
                  </div>

                  {/* Luxury sparkle effects */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-gold-400 rounded-full shadow-gold-glow"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    />
                  ))}
                </div>

                {/* Back of card - Parchment luxury */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden parchment rounded-2xl shadow-luxury p-8 flex flex-col items-center justify-center text-center overflow-hidden border-2 border-blush-300"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {/* Luxury background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blush-100/50 to-quartz-100/50 opacity-60"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={revealedCards[index] ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      className="luxury-heartbeat"
                    >
                      <Heart className="w-10 h-10 text-burgundy-700 fill-current mb-6 mx-auto shadow-blush-glow" />
                    </motion.div>

                    <motion.p
                      className="text-burgundy-800 font-cursive text-xl leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={revealedCards[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {reason}
                    </motion.p>
                  </div>

                  {/* Luxury floating hearts */}
                  <AnimatePresence>
                    {revealedCards[index] && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-blush-400"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 1.2, 0],
                              y: -40,
                              rotate: 360,
                            }}
                            transition={{
                              duration: 2.5,
                              delay: i * 0.4,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatDelay: 4,
                            }}
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </motion.div>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Luxury completion celebration */}
        <AnimatePresence>
          {revealedCards.every((revealed) => revealed) && (
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
              >
                💕
              </motion.div>
              <h3 className="text-4xl font-cursive text-burgundy-900 mb-4 gold-emboss luxury-heartbeat">
                You've discovered all my reasons!
              </h3>
              <p className="text-2xl font-cursive text-burgundy-700">But honestly, there are countless more... ∞</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
