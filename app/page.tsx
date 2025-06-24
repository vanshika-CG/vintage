"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import { Heart } from "lucide-react"
import * as THREE from "three"
import HeroSection from "@/components/hero-section"
import LoveTimeline from "@/components/love-timeline"
import ReasonsILoveYou from "@/components/reasons-i-love-you"
import EggReveal from "@/components/egg-reveal"
import PoemLetter from "@/components/poem-letter"
import GiftReveal from "@/components/gift-reveal"
import CoupleQuiz from "@/components/couple-quiz"
import FireworksShow from "@/components/fireworks-show"
import CustomCursor from "@/components/custom-cursor"

// Dynamically import Canvas and related components to avoid SSR issues
const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), { ssr: false })
const OrbitControls = dynamic(() => import("@react-three/drei").then(mod => mod.OrbitControls), { ssr: false })
const Environment = dynamic(() => import("@react-three/drei").then(mod => mod.Environment), { ssr: false })

// 3D Love Cube Component
function LoveCube() {
  // Load textures for each face
  const textureLoader = new THREE.TextureLoader()
  const textures = [
    textureLoader.load("/image1.jpg"), // Right face
    textureLoader.load("/image2.jpg"), // Left face
    textureLoader.load("/image3.jpg"), // Top face
    textureLoader.load("/image4.jpg"), // Bottom face
    textureLoader.load("/image5.jpg"), // Front face
    textureLoader.load("/image6.jpg"), // Back face
  ]

  // Configure textures
  textures.forEach((texture) => {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.encoding = THREE.sRGBEncoding
  })

  // Add rotation animation using framer-motion's useAnimationFrame
  const meshRef = useRef()
  useEffect(() => {
    const animate = (time) => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.005
        meshRef.current.rotation.y += 0.005
      }
      requestAnimationFrame(animate)
    }
    const id = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="h-[700px] w-full relative overflow-hidden rounded-lg shadow-2xl">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />
          <mesh ref={meshRef}>
            <boxGeometry args={[2.5, 2.5, 2.5]} /> {/* Increased cube size */}
            <meshStandardMaterial attach="material-0" map={textures[0]} roughness={0.3} metalness={0.3} />
            <meshStandardMaterial attach="material-1" map={textures[1]} roughness={0.3} metalness={0.3} />
            <meshStandardMaterial attach="material-2" map={textures[2]} roughness={0.3} metalness={0.3} />
            <meshStandardMaterial attach="material-3" map={textures[3]} roughness={0.3} metalness={0.3} />
            <meshStandardMaterial attach="material-4" map={textures[4]} roughness={0.3} metalness={0.3} />
            <meshStandardMaterial attach="material-5" map={textures[5]} roughness={0.3} metalness={0.3} />
          </mesh>
          <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={1.5} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      {/* Enhanced glowing effect */}
      <div className="absolute inset-0 bg-gradient-radial from-pink-300/20 to-transparent pointer-events-none" />
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`cube-particle-${i}`}
          className="absolute w-5 h-5 text-pink-400 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.6, 1.2, 0.6],
            opacity: [0.3, 0.9, 0.3],
            rotate: [0, 360],
            x: Math.sin(i) * 20,
            y: Math.cos(i) * 20,
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-full h-full fill-current" />
        </motion.div>
      ))}
    </div>
  )
}

export default function RomanticBirthdayWebsite() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <CustomCursor />
      {/* Love particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`love-particle-${i}`}
          className="fixed w-8 h-8 text-blush-400 pointer-events-none z-30"
          style={{
            left: `${Math.random() * 100}vw`,
            bottom: `-30px`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            y: -Math.random() * 400 - 200,
            opacity: [0, 0.8, 0],
            rotate: Math.random() * 720,
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 8,
          }}
        >
          {Math.random() > 0.5 ? <Heart className="w-full h-full fill-current" /> : "💖"}
        </motion.div>
      ))}

      <main className="relative z-10">
        <HeroSection />
        {/* 3D Love Cube */}
        <section className="py-16 luxury-gradient-primary text-center">
          <h2 className="text-4xl font-cursive text-burgundy-800 mb-8">Our Love in 3D</h2>
          <LoveCube />
        </section>
        <LoveTimeline />
        <ReasonsILoveYou />
        <EggReveal />
        <PoemLetter />
        <GiftReveal />
        <CoupleQuiz />
        <FireworksShow />
       
        {/* Luxury Footer */}
        <footer className="py-12 luxury-gradient-primary text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-burgundy-300"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.2, 0.5, 0.2],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 4,
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </div>
          <motion.p
            className="text-2xl font-cursive text-burgundy-800 luxury-heartbeat relative z-10"
            animate={{
              textShadow: [
                "0 0 10px rgba(212, 160, 23, 0.5)",
                "0 0 20px rgba(248, 183, 204, 0.8)",
                "0 0 10px rgba(212, 160, 23, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            Made with endless love for you, Krish ❤️
          </motion.p>
          <motion.div
            className="mt-4 flex justify-center space-x-2"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className="w-6 h-6 text-burgundy-600 fill-current" />
            ))}
          </motion.div>
        </footer>
      </main>
    </div>
  )
}