"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Heart } from "lucide-react"

export default function FireworksShow() {
  const [showFireworks, setShowFireworks] = useState(false)
  const [showClouds, setShowClouds] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [fireworks, setFireworks] = useState<Array<{ id: number; x: number; y: number; color: string; size: number }>>([])
  const [clouds, setClouds] = useState<Array<{ id: number; x: number; y: number }>>([])

  const colors = ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FFD700", "#FF1493", "#DA70D6", "#FF6347", "#FFE4E1"]

  const launchFireworks = useCallback(() => {
    if (showFireworks) return

    setShowFireworks(true)
    setShowClouds(true)

    // Create clouds
    const newClouds = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 800,
      y: 400 + Math.random() * 100,
    }))
    setClouds(newClouds)

    // Clear clouds and start fireworks
    setTimeout(() => {
      setShowClouds(false)
      setClouds([])

      // Create firework bursts
      for (let burst = 0; burst < 5; burst++) {
        setTimeout(() => {
          const newFireworks = Array.from({ length: 25 }, (_, i) => ({
            id: Date.now() + i + burst * 100,
            x: 200 + Math.random() * 400,
            y: 100 + Math.random() * 200,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 8,
          }))
          setFireworks((prev) => [...prev, ...newFireworks])
        }, burst * 600)
      }
    }, 3000)

    // Show "I Love You" message
    setTimeout(() => {
      setShowMessage(true)
    }, 6000)

    // Reset
    setTimeout(() => {
      setFireworks([])
      setShowFireworks(false)
      setShowMessage(false)
    }, 12000)
  }, [showFireworks])

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900">
      {/* Animated background with romantic gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-800/60 to-pink-800/80 animate-pulse"></div>
      
      {/* Romantic aurora effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255,192,203,0.4) 0%, rgba(255,105,180,0.3) 30%, rgba(138,43,226,0.2) 60%, transparent 100%)'
        }}
        animate={{ 
          scale: [1, 1.3, 1.1, 1], 
          opacity: [0.3, 0.6, 0.4, 0.3],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* Enhanced twinkling stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(150)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `radial-gradient(circle, ${['#FFD700', '#FF69B4', '#FFF', '#FFB6C1'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
              boxShadow: `0 0 ${5 + Math.random() * 10}px ${['#FFD700', '#FF69B4', '#FFF', '#FFB6C1'][Math.floor(Math.random() * 4)]}`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Floating hearts */}
      <AnimatePresence>
        {!showMessage && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-pink-300 text-4xl opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -400, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  rotate: [0, 360],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                💕
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Enhanced rose petals */}
      <AnimatePresence>
        {!showMessage && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`petal-${i}`}
                className="absolute text-rose-400 text-3xl opacity-70"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, 500, 0],
                  x: [0, (Math.random() - 0.5) * 150],
                  rotate: [0, 720],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 4,
                }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
              >
                🌸
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Clouds with romantic styling */}
      <AnimatePresence>
        {showClouds && clouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className="absolute rounded-full shadow-2xl"
            style={{
              left: cloud.x,
              top: cloud.y,
              width: '200px',
              height: '80px',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.9) 0%, rgba(255,192,203,0.7) 50%, rgba(255,182,193,0.5) 100%)',
              filter: 'blur(12px)',
              boxShadow: '0 0 40px rgba(255,192,203,0.6)',
            }}
            initial={{ opacity: 0, y: 100, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 0],
              y: -300,
              x: (Math.random() - 0.5) * 200,
              scale: [0.5, 1.5, 1],
            }}
            transition={{ duration: 4, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        {/* Elegant title */}
        <AnimatePresence>
          {!showMessage && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              exit={{ opacity: 0, y: -50, transition: { duration: 0.8 } }}
            >
              <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 to-rose-300 bg-clip-text text-transparent mb-4">
                Light Up Our Sky
              </h1>
              <motion.div
                className="text-2xl text-pink-200 font-light tracking-wide"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✨ A Romantic Fireworks Experience ✨
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced launch button */}
        {!showFireworks && (
          <motion.button
            onClick={launchFireworks}
            className="relative group px-16 py-8 rounded-full text-3xl font-bold text-white overflow-hidden"
            style={{
              background: 'linear-gradient(45deg, #FF1493, #FF69B4, #FFB6C1, #FF1493)',
              backgroundSize: '300% 300%',
              boxShadow: '0 0 40px rgba(255,20,147,0.6), inset 0 0 40px rgba(255,255,255,0.2)',
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 60px rgba(255,20,147,0.8), inset 0 0 60px rgba(255,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              backgroundPosition: { duration: 5, repeat: Infinity }
            }}
          >
            <div className="flex items-center space-x-4">
              <Heart className="w-10 h-10 text-white" />
              <span>Launch Fireworks</span>
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)'
              }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        )}

        {/* Enhanced fireworks */}
        <AnimatePresence>
          {fireworks.map((firework) => (
            <motion.div
              key={firework.id}
              className="absolute rounded-full"
              style={{
                left: firework.x,
                top: firework.y,
                width: firework.size,
                height: firework.size,
                background: `radial-gradient(circle, ${firework.color} 0%, ${firework.color}80 50%, transparent 100%)`,
                boxShadow: `0 0 ${firework.size * 2}px ${firework.color}, 0 0 ${firework.size * 4}px ${firework.color}40`,
                filter: 'brightness(1.5)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 6, 0],
                opacity: [1, 0.8, 0],
                x: (Math.random() - 0.5) * 300,
                y: (Math.random() - 0.5) * 300,
              }}
              transition={{ duration: 3, ease: "easeOut" }}
              exit={{ opacity: 0 }}
            />
          ))}
        </AnimatePresence>

        {/* Enhanced heart fireworks */}
        <AnimatePresence>
          {showFireworks && (
            <>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`heart-firework-${i}`}
                  className="absolute text-6xl"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                    filter: 'drop-shadow(0 0 20px #FF69B4)',
                  }}
                  initial={{ scale: 0, opacity: 0, rotate: 0 }}
                  animate={{
                    scale: [0, 3, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                >
                  💖
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Enhanced "I Love You" message */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, type: "spring", bounce: 0.4 }}
            >
              <div className="relative">
                <motion.h2
                  className="text-8xl md:text-9xl font-bold text-center"
                  style={{
                    background: 'linear-gradient(45deg, #FFD700, #FF69B4, #FFB6C1, #FF1493)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 40px rgba(255,105,180,0.8)',
                    filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    backgroundPosition: { duration: 3, repeat: Infinity }
                  }}
                >
                  I Love You
                </motion.h2>
                
                {/* Enhanced sparkle particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: `${Math.random() * 400 - 200}px`,
                      top: `${Math.random() * 200 - 100}px`,
                      width: '6px',
                      height: '6px',
                      background: `radial-gradient(circle, ${['#FFD700', '#FF69B4', '#FFF', '#FFB6C1'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
                      boxShadow: `0 0 15px ${['#FFD700', '#FF69B4', '#FFF', '#FFB6C1'][Math.floor(Math.random() * 4)]}`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 2, 0],
                      x: (Math.random() - 0.5) * 100,
                      y: (Math.random() - 0.5) * 100,
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.05,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}