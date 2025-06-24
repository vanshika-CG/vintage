"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

// Import romantic fonts
const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;700&display=swap');
`

const timelineData = [
  {
    title: "Us Against the World",
    description: "Just two souls, one love, and a million memories in the making. Grateful for every moment together",
    image: "/mine1.jpg",
  },
  {
    title: "Eyes Full of Love",
    description: " The way he looks at me—like I’m his whole world. No words, just love in every glance.",
    image: "/mine2.jpg",
  },
  {
    title: "Just Us",
    description: "No fancy poses, no filters—just a moment, a smile, and the two of us.",
    image: "/mine3.jpg",
  },
  {
    title: "Love on Paper",
    description: "He held up a note that simply said I love you — no filter, no words needed, just pure feeling across the screen.",
    image: "/mine4.jpg",
  },
  {
    title: "When Sorry Looks This Cute",
    description: " He couldn’t stop smiling, hands on his ears, saying sorry like he meant every bit of it—and I melted.",
    image: "/mine5.jpg",
  },
  {
    title: "Today & Forever",
    description: "Your birthday and every day after, celebrating the amazing person you are.",
    image: "/mine6.jpg",
  },
]

export default function LoveTimeline() {
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const nextPage = () => {
    if (currentPage < timelineData.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-pink-100 via-rose-50 to-white relative overflow-hidden">
      <style jsx global>{fonts}</style>
      <div className="max-w-4xl mx-auto text-center perspective-1000">
        <motion.h2
          className="text-5xl font-[Great+Vibes] text-rose-700 mb-12 drop-shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Love Story
        </motion.h2>

        {/* Closed Book */}
        <AnimatePresence>
          {!isBookOpen && (
            <motion.div
              className="relative mx-auto cursor-pointer transform-gpu"
              style={{ width: "400px", height: "500px", transformStyle: "preserve-3d" }}
              onClick={() => setIsBookOpen(true)}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                rotateX: 5,
                boxShadow: "0 25px 50px rgba(244, 63, 94, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, rotateY: -20, rotateX: 10 }}
              animate={{ opacity: 1, rotateY: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Book Cover */}
              <div className="w-full h-full bg-gradient-to-br from-rose-900 via-red-800 to-rose-700 rounded-lg shadow-2xl relative overflow-hidden transform-gpu" style={{ transform: "translateZ(20px)" }}>
                {/* Velvet texture overlay */}
                <div className="absolute inset-0 bg-[url('/velvet-texture.png')] opacity-30 bg-cover bg-center"></div>

                {/* Gold heart emblem */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-28 h-28 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl border-2 border-yellow-300"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="text-rose-900 text-5xl">💖</div>
                  </motion.div>
                </div>

                {/* Title and Initials */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-yellow-200 font-[Great+Vibes] text-3xl tracking-wider drop-shadow-md">Our Story</div>
                  <div className="text-yellow-300 font-[Dancing+Script] text-xl mt-2">You & Me</div>
                </div>

                {/* Book spine */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-rose-950 to-rose-800 transform -translate-x-4 skew-y-12 shadow-lg" style={{ transform: "translateZ(-10px)" }}></div>
                {/* Page stack */}
                <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-amber-50 to-amber-100 transform translate-x-2 shadow-inner" style={{ transform: "translateZ(-5px)" }}>
                  <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 bg-cover"></div>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-rose-400/40 to-pink-400/40 rounded-lg"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Click instruction */}
              <motion.p
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-rose-700 font-[Dancing+Script] text-xl whitespace-nowrap"
                animate={{ opacity: [0.5, 1, 0.5], y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Open our love story ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Open Book */}
        <AnimatePresence>
          {isBookOpen && (
            <motion.div
              className="relative mx-auto bg-amber-50 rounded-lg shadow-2xl overflow-hidden transform-gpu"
              style={{ width: "800px", height: "500px", transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              {/* Book pages */}
              <div className="flex h-full relative" style={{ transformStyle: "preserve-3d" }}>
                {/* Left page - Image */}
                <motion.div
                  className="w-1/2 p-4 flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 transform-gpu relative"
                  key={`left-page-${currentPage}`}
                  initial={{ rotateY: 90, opacity: 0, transformOrigin: "right" }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transform: "translateZ(10px)", boxShadow: "2px 0 10px rgba(0,0,0,0.2)" }}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg border-2 border-amber-200 bg-[url('/paper-texture.png')] bg-cover">
                    <Image
                      src={timelineData[currentPage].image || "/placeholder.svg"}
                      alt={timelineData[currentPage].title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Right page - Text */}
                <motion.div
                  className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-bl from-amber-50 to-amber-100 transform-gpu relative"
                  key={`right-page-${currentPage}`}
                  initial={{ rotateY: -90, opacity: 0, transformOrigin: "left" }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transform: "translateZ(10px)", boxShadow: "-2px 0 10px rgba(0,0,0,0.2)" }}
                >
                  <h3 className="text-3xl font-[Great+Vibes] text-rose-700 mb-6 drop-shadow-sm">{timelineData[currentPage].title}</h3>
                  <p className="text-lg text-gray-700 leading-relaxed font-[Dancing+Script]">
                    {timelineData[currentPage].description}
                  </p>
                  {/* Page number */}
                  <div className="absolute bottom-4 right-8 text-rose-400 font-[Dancing+Script]">
                    {currentPage + 1} of {timelineData.length}
                  </div>
                </motion.div>
              </div>

              {/* Navigation buttons */}
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all interactive"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === timelineData.length - 1}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all interactive"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Close button */}
              <motion.button
                onClick={() => setIsBookOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 transition-all interactive"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Book binding */}
              <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-b from-rose-800 to-rose-900 transform -translate-x-1/2 shadow-inner" style={{ transform: "translateZ(0px)" }}></div>
              {/* Page stack edges */}
              <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-50 to-amber-100 transform -translate-x-1/2" style={{ transform: "translateZ(-5px)" }}>
                <div className="absolute inset-0 bg-[url('/paper-texture.png')] opacity-20 bg-cover"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background romantic effects */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-3 h-3 bg-rose-400 rounded-full opacity-30"
            animate={{
              x: [0, 150, 0],
              y: [0, 300, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: "10%", top: "15%" }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-rose-400 rounded-full opacity-30"
            animate={{
              x: [0, -120, 0],
              y: [0, 250, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ right: "12%", top: "25%" }}
          />
          <motion.div
            className="absolute w-3 h-3 bg-rose-400 rounded-full opacity-30"
            animate={{
              x: [0, 100, 0],
              y: [0, 200, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{ left: "20%", top: "40%" }}
          />
        </div>
      </div>
    </section>
  )
}