"use client"

import { useState, useEffect, Suspense } from "react"
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

// Zappar components
const ZapparCanvas = dynamic(() => import("@zappar/zappar-react-three-fiber").then(mod => mod.Canvas), { ssr: false })
const ZapparCamera = dynamic(() => import("@zappar/zappar-react-three-fiber").then(mod => mod.ZapparCamera), { ssr: false })
const InstantTracker = dynamic(() => import("@zappar/zappar-react-three-fiber").then(mod => mod.InstantTracker), { ssr: false })

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

  // Configure textures (optional: adjust texture settings)
  textures.forEach((texture) => {
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.encoding = THREE.sRGBEncoding
  })

  return (
    <div className="h-[600px] w-full relative">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial attach="material-0" map={textures[0]} roughness={0.4} metalness={0.2} />
            <meshStandardMaterial attach="material-1" map={textures[1]} roughness={0.4} metalness={0.2} />
            <meshStandardMaterial attach="material-2" map={textures[2]} roughness={0.4} metalness={0.2} />
            <meshStandardMaterial attach="material-3" map={textures[3]} roughness={0.4} metalness={0.2} />
            <meshStandardMaterial attach="material-4" map={textures[4]} roughness={0.4} metalness={0.2} />
            <meshStandardMaterial attach="material-5" map={textures[5]} roughness={0.4} metalness={0.2} />
          </mesh>
          <OrbitControls enableZoom={false} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
      {/* Glowing effect */}
      <div className="absolute inset-0 romantic-glow pointer-events-none" />
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`cube-particle-${i}`}
          className="absolute w-4 h-4 text-blush-400 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          <Heart className="w-full h-full fill-current" />
        </motion.div>
      ))}
    </div>
  )
}

// Zappar-based AR Heart Filter Component
function ARHeartFilter() {
  const [arSupported, setArSupported] = useState(true)
  const [arActive, setArActive] = useState(false)

  useEffect(() => {
    // Check for WebGL and webcam support
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    if (!gl || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setArSupported(false)
    }
  }, [])

  const startAR = () => {
    setArActive(true)
  }

  return (
    <div className="my-12 relative">
      <div className="polaroid mx-auto max-w-[600px] p-8">
        {arActive && arSupported ? (
          <div className="relative">
            <div id="ar-container" className="w-full h-[400px]">
              <ZapparCanvas>
                <ZapparCamera userCameraMirrorMode="css" />
                <InstantTracker placement="floor">
                  <mesh position={[0, 0.5, 0]}>
                    <textGeometry args={["Happy Birthday Krish!", { font: "helvetiker", size: 0.2, height: 0.05 }]} />
                    <meshStandardMaterial color="#f8b7cc" />
                  </mesh>
                  <mesh position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[0.5, 0.5]} />
                    <meshStandardMaterial
                      map={new THREE.TextureLoader().load("/heart.png")}
                      transparent={true}
                    />
                    <animation
                      property="rotation.y"
                      to={Math.PI * 2}
                      dur={4000}
                      easing="linear"
                      loop={true}
                    />
                  </mesh>
                </InstantTracker>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
              </ZapparCanvas>
            </div>
            {/* Romantic frame around AR feed */}
            <div className="absolute inset-0 border-8 border-[#f8b7cc] rounded-lg shadow-lg pointer-events-none" />
            <p className="text-burgundy-800 mt-4 text-sm">
              Point your camera at a flat surface to see the AR effect!
            </p>
          </div>
        ) : (
          <div className="w-full h-[400px] bg-[#fff8e7] flex items-center justify-center relative">
            {/* Fallback static heart animation */}
            <motion.div
              className="text-blush-400"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <Heart className="w-32 h-32 fill-current" />
            </motion.div>
            <div className="absolute inset-0 border-8 border-[#f8b7cc] rounded-lg shadow-lg pointer-events-none" />
          </div>
        )}
        <div className="text-center mt-4">
          <button
            className="luxury-button px-6 py-3 rounded-full"
            onClick={startAR}
            disabled={!arSupported || arActive}
          >
            {arSupported ? "Activate AR Hearts" : "AR Not Supported"}
          </button>
          {!arSupported && (
            <p className="text-burgundy-800 mt-2 text-sm">
              Your device doesn't support AR. Enjoy the static heart animation instead!
            </p>
          )}
        </div>
      </div>
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
        <section className="py-12 luxury-gradient-primary text-center">
          <h2 className="text-4xl font-cursive text-burgundy-800 mb-8">Our Love in 3D</h2>
          <LoveCube />
        </section>
        {/* AR Heart Filter */}
        <section className="py-12 luxury-gradient-secondary text-center">
          <h2 className="text-4xl font-cursive text-burgundy-800 mb-8">Augmented Love</h2>
          <ARHeartFilter />
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