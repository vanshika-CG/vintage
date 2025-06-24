"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function GiftReveal() {
  const [isOpening, setIsOpening] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('gift-container')?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 20,
          y: (e.clientY - rect.top - rect.height / 2) / 20
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGiftClick = () => {
    if (!isOpening && !isOpen) {
      setIsOpening(true)
      setTimeout(() => {
        setIsOpen(true)
        setIsOpening(false)
      }, 2000)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-6xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          A Gift Just For You
        </motion.h2>

        <div 
          id="gift-container"
          className="relative flex justify-center items-center" 
          style={{ height: "500px", perspective: "1000px" }}
        >
          {/* Ambient romantic particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-pink-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, -100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* 3D Gift Box Container */}
          <motion.div
            className="relative cursor-pointer"
            onClick={handleGiftClick}
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
            }}
            animate={
              isOpening
                ? {
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }
                : {
                    rotateY: [0, 10, -10, 0],
                  }
            }
            transition={{
              rotateY: isOpening ? { duration: 2, ease: "easeInOut" } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 0.5, repeat: isOpening ? 4 : 0 }
            }}
            whileHover={{ scale: 1.05 }}
          >
            {/* 3D Gift Box */}
            <div 
              className="relative w-72 h-72"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Box faces */}
              {/* Front face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-500 via-red-600 to-red-800 border-2 border-red-400 shadow-2xl"
                style={{
                  transform: "translateZ(136px)",
                  backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, transparent 50%),
                    linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)
                  `
                }}
                animate={isOpening ? { opacity: 0.7 } : {}}
              />

              {/* Back face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-600 via-red-700 to-red-900 border-2 border-red-500"
                style={{
                  transform: "translateZ(-136px) rotateY(180deg)",
                }}
              />

              {/* Left face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-700 via-red-800 to-red-900 border-2 border-red-600"
                style={{
                  transform: "rotateY(-90deg) translateZ(136px)",
                }}
              />

              {/* Right face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-600 via-red-700 to-red-800 border-2 border-red-500"
                style={{
                  transform: "rotateY(90deg) translateZ(136px)",
                }}
              />

              {/* Top face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-400 via-red-500 to-red-600 border-2 border-red-300"
                style={{
                  transform: "rotateX(90deg) translateZ(136px)",
                }}
                animate={isOpen ? { 
                  rotateX: -180,
                  translateZ: 200,
                  transition: { duration: 1.5, ease: "easeOut" }
                } : {}}
              />

              {/* Bottom face */}
              <motion.div
                className="absolute w-72 h-72 bg-gradient-to-br from-red-800 via-red-900 to-red-950 border-2 border-red-700"
                style={{
                  transform: "rotateX(-90deg) translateZ(136px)",
                }}
              />

              {/* Golden Ribbon - Horizontal */}
              <motion.div
                className="absolute top-1/2 left-0 right-0 h-12 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 transform -translate-y-1/2 shadow-lg z-10"
                style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                    linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)
                  `,
                  borderTop: "2px solid rgba(255,255,255,0.3)",
                  borderBottom: "2px solid rgba(0,0,0,0.2)"
                }}
                animate={
                  isOpening 
                    ? { 
                        scaleY: [1, 1.3, 1], 
                        boxShadow: [
                          "0 0 20px rgba(255,215,0,0.5)",
                          "0 0 40px rgba(255,215,0,0.8)",
                          "0 0 20px rgba(255,215,0,0.5)"
                        ]
                      } 
                    : {}
                }
                transition={{ duration: 0.4, repeat: isOpening ? 5 : 0 }}
              />

              {/* Golden Ribbon - Vertical */}
              <motion.div
                className="absolute top-0 bottom-0 left-1/2 w-12 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-300 transform -translate-x-1/2 shadow-lg z-10"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%),
                    linear-gradient(90deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)
                  `,
                  borderLeft: "2px solid rgba(255,255,255,0.3)",
                  borderRight: "2px solid rgba(0,0,0,0.2)"
                }}
                animate={
                  isOpening 
                    ? { 
                        scaleX: [1, 1.3, 1],
                        boxShadow: [
                          "0 0 20px rgba(255,215,0,0.5)",
                          "0 0 40px rgba(255,215,0,0.8)",
                          "0 0 20px rgba(255,215,0,0.5)"
                        ]
                      } 
                    : {}
                }
                transition={{ duration: 0.4, repeat: isOpening ? 5 : 0 }}
              />

              {/* Luxurious 3D Bow */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={
                      isOpening
                        ? {
                            rotateY: [0, 360],
                            scale: [1, 1.2, 1],
                            y: [0, -10, 0],
                          }
                        : {
                            rotateY: [0, 15, -15, 0],
                          }
                    }
                    transition={{ 
                      duration: isOpening ? 1.5 : 3, 
                      repeat: isOpening ? 1 : Infinity,
                      ease: "easeInOut"
                    }}
                    exit={{
                      scale: 0,
                      rotateY: 720,
                      y: -100,
                      transition: { duration: 1.2, ease: "easeOut" },
                    }}
                  >
                    {/* Left bow loop */}
                    <motion.div
                      className="absolute w-16 h-12 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 rounded-full shadow-xl"
                      style={{
                        transform: "rotateY(-20deg) rotateZ(-15deg) translateX(-8px)",
                        backgroundImage: `
                          radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.5) 0%, transparent 70%),
                          linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)
                        `
                      }}
                    />
                    
                    {/* Right bow loop */}
                    <motion.div
                      className="absolute w-16 h-12 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-500 rounded-full shadow-xl"
                      style={{
                        transform: "rotateY(20deg) rotateZ(15deg) translateX(8px)",
                        backgroundImage: `
                          radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.5) 0%, transparent 70%),
                          linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)
                        `
                      }}
                    />
                    
                    {/* Bow center knot */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-8 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 rounded-lg shadow-lg z-10"
                      style={{
                        backgroundImage: `
                          radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.4) 0%, transparent 70%),
                          linear-gradient(0deg, rgba(0,0,0,0.1) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)
                        `
                      }}
                    />

                    {/* Bow tails */}
                    <motion.div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2"
                      animate={
                        isOpening ? {} : {
                          rotateZ: [0, 2, -2, 0],
                        }
                      }
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="w-3 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 transform -rotate-12 -translate-x-2 shadow-md"></div>
                      <div className="w-3 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 transform rotate-12 translate-x-2 -translate-y-12 shadow-md"></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Magical sparkle effects */}
              <AnimatePresence>
                {(isOpening || isOpen) && (
                  <>
                    {[...Array(25)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                          x: (Math.random() - 0.5) * 400,
                          y: (Math.random() - 0.5) * 400,
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: Math.random() * 1,
                          repeat: 1,
                          ease: "easeOut"
                        }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-br from-yellow-300 to-yellow-500 rotate-45 shadow-lg"></div>
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Romantic glow effect */}
            <motion.div
              className="absolute inset-0 rounded-lg"
              style={{
                background: "radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
                transform: "translateZ(-10px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Click instruction */}
            {!isOpening && !isOpen && (
              <motion.p
                className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-pink-300 font-bold text-xl whitespace-nowrap"
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  y: [0, -5, 0],
                  textShadow: [
                    "0 0 10px rgba(255,182,193,0.5)",
                    "0 0 20px rgba(255,182,193,0.8)",
                    "0 0 10px rgba(255,182,193,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Click to unwrap your gift! ✨💝
              </motion.p>
            )}
          </motion.div>

          {/* Revealed Photo */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: "backOut" }}
              >
                <div className="relative">
                  {/* Elegant photo frame */}
                  <motion.div
                    className="bg-gradient-to-br from-rose-100 to-pink-50 p-6 pb-20 shadow-2xl border-4 border-rose-200"
                    style={{
                      transform: "rotate(2deg)",
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.3))"
                    }}
                    whileHover={{ 
                      rotate: 0,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="w-80 h-60 bg-gray-200 relative overflow-hidden border-2 border-rose-100">
                      {/* Photo placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-50">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📸</div>
                          <p className="text-gray-600 text-lg font-medium">Your special photo goes here!</p>
                          <p className="text-gray-500 text-sm mt-2">Upload your favorite memory</p>
                        </div>
                      </div>
                    </div>

                    {/* Romantic caption */}
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <motion.p 
                        className="text-rose-600 font-bold text-xl"
                        animate={{
                          color: ["#e11d48", "#f43f5e", "#e11d48"],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Forever in my heart ❤️
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Floating romantic elements */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [-30, -80, -30],
                        x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 0.5],
                        rotate: [0, 360, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 0.4,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    >
                      {['❤️', '💕', '💖', '💝', '🌹'][Math.floor(Math.random() * 5)]}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}