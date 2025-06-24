// ./components/egg-reveal.tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Heart } from "lucide-react"

export default function RomanticPearlEggReveal() {
  const [isCracking, setIsCracking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingHearts, setFloatingHearts] = useState([])

  // Mouse tracking for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById('egg-container')?.getBoundingClientRect()
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate floating hearts
  useEffect(() => {
    const generateHeart = () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: 100,
      size: 0.5 + Math.random() * 1,
      delay: Math.random() * 2
    })

    const interval = setInterval(() => {
      setFloatingHearts(prev => [
        ...prev.slice(-20),
        generateHeart()
      ])
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const handleEggClick = () => {
    if (!isCracking && !isOpen) {
      setIsCracking(true)
      setTimeout(() => {
        setIsOpen(true)
        setIsCracking(false)
        setTimeout(() => setShowVideo(true), 800)
      }, 2500)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-rose-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-pink-300 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300 pointer-events-none"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}rem`
            }}
            initial={{ y: "100vh", opacity: 0.8 }}
            animate={{ y: "-10vh", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 8,
              delay: heart.delay,
              ease: "linear"
            }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>

      <section className="py-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-6xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            A Magical Surprise Awaits ✨
          </motion.h2>

          <motion.p
            className="text-pink-200 text-xl mb-12 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Something beautiful is waiting to hatch from love...
          </motion.p>

          <div 
            id="egg-container"
            className="relative flex justify-center items-center" 
            style={{ height: "500px", perspective: "1000px" }}
          >
            {/* 3D Egg Container */}
            <motion.div
              className="relative cursor-pointer"
              onClick={handleEggClick}
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`
              }}
              whileHover={!isCracking && !isOpen ? { 
                scale: 1.1,
                rotateY: 5,
                transition: { duration: 0.3 }
              } : {}}
              whileTap={!isCracking && !isOpen ? { scale: 0.95 } : {}}
            >
              <motion.div
                className="w-80 h-96 relative"
                animate={
                  isCracking
                    ? {
                        rotateZ: [0, -3, 3, -2, 2, 0],
                        scale: [1, 1.02, 1, 1.02, 1]
                      }
                    : {}
                }
                transition={{ duration: 0.6, repeat: isCracking ? 4 : 0 }}
              >
                {/* Pearl Egg Shell with Romantic Colors */}
                <div 
                  className="w-full h-full relative rounded-full overflow-hidden"
                  style={{
                    background: `
                      radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.9) 0%, transparent 40%),
                      radial-gradient(ellipse at 75% 25%, rgba(255,192,203,0.6) 0%, transparent 30%),
                      radial-gradient(ellipse at 40% 80%, rgba(255,105,180,0.4) 0%, transparent 35%),
                      linear-gradient(135deg, 
                        #fff0f6 0%, 
                        #ffd1dc 15%, 
                        #ffabb6 30%, 
                        #ff8c9d 45%, 
                        #ff6b81 60%, 
                        #ff4c68 75%, 
                        #f43f5e 90%, 
                        #e11d48 100%
                      )
                    `,
                    boxShadow: `
                      0 0 80px rgba(255, 240, 246, 0.3),
                      inset 0 0 80px rgba(255, 255, 255, 0.2),
                      0 25px 50px rgba(0, 0, 0, 0.4),
                      inset -10px -10px 30px rgba(0, 0, 0, 0.1)
                    `,
                    filter: "drop-shadow(0 15px 30px rgba(255, 140, 157, 0.4))"
                  }}
                >
                  {/* Pearl luster effect */}
                  <div 
                    className="absolute inset-2 rounded-full opacity-80"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 70%, rgba(255,192,203,0.3) 0%, transparent 60%)
                      `
                    }}
                  />
                  
                  {/* Decorative bands */}
                  <div 
                    className="absolute inset-6 border-4 rounded-full opacity-60"
                    style={{
                      borderImage: "linear-gradient(45deg, #ff8c9d, #ff4c68, #e11d48) 1",
                      boxShadow: "0 0 15px rgba(255, 76, 104, 0.5)"
                    }}
                  />
                  <div 
                    className="absolute inset-12 border-2 rounded-full opacity-40"
                    style={{
                      borderColor: "#fff0f6",
                      boxShadow: "0 0 10px rgba(255, 240, 246, 0.5)"
                    }}
                  />
                  
                  {/* Small decorative hearts around the egg */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180)
                    const radius = 140
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-4 h-4"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          transform: "translate(-50%, -50%)",
                          color: "#ff8c9d",
                          textAlign: "center",
                          lineHeight: "16px"
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.1,
                          repeat: Infinity
                        }}
                      >
                        💖
                      </motion.div>
                    )
                  })}
                  
                  {/* Central heart */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div 
                      className="w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Heart className="w-10 h-10 text-white fill-current" />
                    </div>
                  </motion.div>

                  {/* Crack lines with romantic glow */}
                  <AnimatePresence>
                    {isCracking && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 rounded-full"
                            style={{
                              width: "3px",
                              height: `${60 + Math.random() * 120}px`,
                              left: `${15 + Math.random() * 70}%`,
                              top: `${5 + Math.random() * 90}%`,
                              transform: `rotate(${Math.random() * 360}deg)`,
                              boxShadow: "0 0 10px rgba(255, 76, 104, 0.8)"
                            }}
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.15 }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Egg halves when opening */}
                  <AnimatePresence>
                    {isOpen && (
                      <>
                        <motion.div
                          className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
                          style={{
                            background: `
                              radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.8) 0%, transparent 25px),
                              linear-gradient(to right, #fff0f6 0%, #ffd1dc 30%, #ffabb6 60%, #ff8c9d 100%)
                            `,
                            boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
                          }}
                          initial={{ y: 0, rotateX: 0 }}
                          animate={{ y: -120, rotateX: -25, rotateZ: -10 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-1/2 rounded-b-full"
                          style={{
                            background: `
                              radial-gradient(ellipse at 75% 85%, rgba(255,255,255,0.8) 0%, transparent 40px),
                              linear-gradient(to right, #ff8c9d 0%, #ffabb6 40%, #ffd1dc 70%, #fff0f6 100%)
                            `,
                            boxShadow: "0 -5px 20px rgba(0,0,0,0.3)"
                          }}
                          initial={{ y: 0, rotateX: 0 }}
                          animate={{ y: 120, rotateX: 25, rotateZ: 10 }}
                          transition={{ duration: 1.2, ease: "easeOut" }}
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sparkle effects */}
                <AnimatePresence>
                  {(isCracking || isOpen) && (
                    <>
                      {[...Array(20)].map((_, i) => (
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
                            x: (Math.random() - 0.5) * 300,
                            y: (Math.random() - 0.5) * 300,
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 2,
                            delay: Math.random() * 0.8,
                            repeat: 1,
                          }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{
                              background: "radial-gradient(circle, #fffd8c 0%, #ff8a80 100%)",
                              boxShadow: "0 0 10px rgba(255, 253, 140, 0.8)"
                            }}
                          />
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Click instruction */}
              {!isCracking && !isOpen && (
                <motion.div
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center"
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    y: [0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-pink-200 text-xl font-light mb-2">
                    Click to reveal the magic! ✨
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.2,
                          repeat: Infinity
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Video modal */}
            <AnimatePresence>
              {showVideo && (
                <motion.div
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="relative max-w-2xl w-full mx-4"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <div 
                      className="rounded-2xl p-8 shadow-2xl backdrop-blur-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                        border: "1px solid rgba(255,255,255,0.2)"
                      }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20" />
                        <Play className="w-20 h-20 text-pink-300 relative z-10" />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="text-center px-4">
                            <p className="text-pink-200 text-lg mb-2">
                              Your Special Video Goes Here! 🎥
                            </p>
                            <p className="text-pink-300 text-sm opacity-75">
                              Replace this with your romantic surprise
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <motion.button
                        onClick={() => setShowVideo(false)}
                        className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    )
}