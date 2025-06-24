"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const trailRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    let lastUpdate = 0;
    const throttleDelay = 50; // Throttle to ~20 updates per second

    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleDelay) return;
      lastUpdate = now;

      setMousePosition({ x: e.clientX, y: e.clientY });

      // Update trail positions (CSS-based)
      if (trailRef.current.length > 0 && Math.random() > 0.8) {
        const trailElement = trailRef.current[trailRef.current.length - 1];
        trailElement.style.left = `${e.clientX - 8}px`;
        trailElement.style.top = `${e.clientY - 8}px`;
        trailElement.style.opacity = "0.6";
        setTimeout(() => {
          trailElement.style.opacity = "0";
        }, 500);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(target.tagName === "BUTTON" || target.classList.contains("interactive"));
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Trail (limited to 3 hearts for performance) */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el;
          }}
          className="fixed pointer-events-none z-40 transition-all duration-500 ease-out"
          style={{
            transform: "translate(-50%, -50%) scale(0.5)",
            opacity: 0,
          }}
        >
          <Heart className="w-4 h-4 text-blush-500 fill-current" />
        </div>
      ))}

      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 20 }}
      >
        <Heart className="w-6 h-6 text-burgundy-900 fill-blush-500 drop-shadow-md" />
      </motion.div>
    </>
  );
}