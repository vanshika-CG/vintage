"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PoemLetter() {
  const [isOpen, setIsOpen] = useState(false)

  const poemLines = [
    "In the code of life, you’re my main class,",
    "No need to debug — our love will last.",
    "Like functions that always return what's true,",
    "Every heartbeat compiles for you.",
    "",
    "You're my favorite algorithm, clean and wise,",
    "With you, each loop feels like a sweet surprise. ",
    "No runtime errors, no crash or delay, ",
    "Just endless joy, line by line, every day. ",
    "",
    "So here’s to you, my coder, my flame,",
    "In this love program, I’m glad you came.",
    "Happy birthday — you’re my perfect array,",
    "Let’s keep building love, day by day. 💖",
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-100">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-5xl font-cursive text-rose-600 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          A Love Letter For You
        </motion.h2>

        <div className="relative flex justify-center items-center" style={{ height: "400px" }}>
          {/* Closed Envelope */}
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                className="relative cursor-pointer interactive"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                {/* Envelope */}
                <div className="w-80 h-56 relative">
                  {/* Envelope body */}
                  <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-2xl relative">
                    {/* Envelope flap */}
                    <div
                      className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-amber-200 to-amber-300"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      }}
                    />

                    {/* Wax seal */}
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-lg flex items-center justify-center">
                      <div className="text-2xl">💕</div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <p className="text-amber-800 font-cursive text-lg">For My Love</p>
                    </div>
                  </div>

                  {/* Floating petals */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-rose-300 rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        x: [-5, 5, -5],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Click instruction */}
                <motion.p
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-rose-600 font-cursive text-lg whitespace-nowrap"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Click to open the letter 💌
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Open Letter */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="relative bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl p-8 max-w-2xl w-full mx-4"
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Parchment texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-amber-200/50 rounded-lg"></div>

                {/* Rose watermark */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl opacity-10">
                  🌹
                </div>

                {/* Poem content */}
                <div className="relative z-10">
                  <motion.div
                    className="text-center mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-3xl font-cursive text-rose-700 mb-2">My Dearest Love</h3>
                    <div className="w-24 h-0.5 bg-rose-400 mx-auto"></div>
                  </motion.div>

                  <div className="space-y-2 text-gray-700 font-serif text-lg leading-relaxed">
                    {poemLines.map((line, index) => (
                      <motion.p
                        key={index}
                        className={`text-center ${line === "" ? "h-4" : ""}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="text-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                  >
                    <p className="text-rose-600 font-cursive text-xl">Forever yours,</p>
                    <p className="text-rose-600 font-cursive text-2xl mt-2">Your Love 💕</p>
                  </motion.div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors interactive"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Decorative corners */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-rose-300"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-rose-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-rose-300"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-rose-300"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
