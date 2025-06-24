"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw } from "lucide-react"

// Function to shuffle array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const quizData = [
  {
    question: "Which state do I most want to visit?",
    options: ["Kerala", "Rajasthan", "Himachal Pradesh", "Goa"],
    correctAnswer: "Kerala",
    feedback: {
      correct: "You got it, my love! Kerala’s lush greenery and backwaters are calling my name! 🌴💖",
      wrong: "Are you serious? It’s Kerala, you idiot! I’ll bury you in the desert if you forget again! 😡",
    },
  },
  {
    question: "What’s my favorite ice cream flavor?",
    options: ["Chocolate", "Vanilla Bean", "Mango Sorbet", "Butter Pecan"],
    correctAnswer: "Chocolate",
    feedback: {
      correct: "Yum, you know me so well! Chocolate ice cream is my ultimate treat! 🍫🍨",
      wrong: "Chocolate, you moron! I’ll shove that wrong flavor down your throat! 🍦🔪",
    },
  },
  {
    question: "Where’s my dream vacation spot?",
    options: ["Maldives", "Bali", "Santorini", "Bora Bora"],
    correctAnswer: "Maldives",
    feedback: {
      correct: "Yes, my love! The Maldives’ turquoise waters are my dream escape! 🏝️💕",
      wrong: "Maldives, you fool! Pick that again and I’ll drown you in the ocean! 🌊😤",
    },
  },
  {
    question: "How do I feel most loved?",
    options: ["Tight hugs", "Sweet compliments", "Quality time together", "Thoughtful gifts"],
    correctAnswer: "Tight hugs",
    feedback: {
      correct: "Aww, you nailed it! Your tight hugs make me feel so loved and safe! 🤗❤️",
      wrong: "Tight hugs, you dimwit! I’ll crush you if you mess this up again! 🥊",
    },
  },
  {
    question: "What’s my bucket list goal?",
    options: [
      "Country-to-country travel",
      "Skydiving adventure",
      "Learning a new language",
      "Building a dream home",
    ],
    correctAnswer: "Country-to-country travel",
    feedback: {
      correct: "Spot on! Exploring the world country by country with you is my dream! ✈️🌍",
      wrong: "Country-to-country travel, you loser! I’ll deport you if you get this wrong again! 🗺️😠",
    },
  },
]

export default function CoupleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [correctIndex, setCorrectIndex] = useState(0)

  // Shuffle options when the question changes
  useEffect(() => {
    const options = quizData[currentQuestion].options
    const shuffled = shuffleArray(options)
    setShuffledOptions(shuffled)
    setCorrectIndex(shuffled.indexOf(quizData[currentQuestion].correctAnswer))
  }, [currentQuestion])

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return

    setSelectedAnswer(answerIndex)
    setShowFeedback(true)

    if (answerIndex === correctIndex) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setQuizCompleted(true)
      }
    }, 3000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100
    if (percentage === 100) return "Perfect! You know me so well, my love! 💕"
    if (percentage >= 80) return "Amazing! You really pay attention to the little things! 🥰"
    if (percentage >= 60) return "Pretty good! You know me better than most! 😊"
    return "We need to make more memories together! 💫"
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl font-cursive text-rose-600 text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How Well Do You Know Me?
        </motion.h2>

        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key={currentQuestion}
                className="bg-white rounded-2xl p-8 shadow-2xl relative overflow-hidden"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background hearts */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-rose-200"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        rotate: [0, 360],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                      }}
                    >
                      <Heart className="w-6 h-6 fill-current" />
                    </motion.div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {quizData.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      Score: {score}/{currentQuestion + (showFeedback ? 1 : 0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <motion.h3
                  className="text-2xl font-cursive text-gray-800 mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {quizData[currentQuestion].question}
                </motion.h3>

                {/* Answer options */}
                <div className="space-y-4 mb-8">
                  {shuffledOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-300 interactive relative overflow-hidden ${
                        selectedAnswer === null
                          ? "bg-gray-50 hover:bg-rose-50 hover:border-rose-200 border-2 border-gray-200"
                          : selectedAnswer === index
                            ? index === correctIndex
                              ? "bg-green-100 border-2 border-green-400 text-green-800"
                              : "bg-red-100 border-2 border-red-400 text-red-800"
                            : index === correctIndex
                              ? "bg-green-100 border-2 border-green-400 text-green-800"
                              : "bg-gray-100 border-2 border-gray-300 text-gray-600"
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={selectedAnswer !== null}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                    >
                      {/* Heart-shaped bullet point */}
                      <div className="flex items-center">
                        <div
                          className={`mr-4 transition-colors duration-300 ${
                            selectedAnswer === null
                              ? "text-rose-400"
                              : selectedAnswer === index
                                ? index === correctIndex
                                  ? "text-green-500"
                                  : "text-red-500"
                                : index === correctIndex
                                  ? "text-green-500"
                                  : "text-gray-400"
                          }`}
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>

                      {/* Selection indicator */}
                      {selectedAnswer === index && (
                        <motion.div
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {index === correctIndex ? "✅" : "❌"}
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div
                      className="text-center p-6 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="text-4xl mb-3"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {selectedAnswer === correctIndex ? "🎉" : "💕"}
                      </motion.div>
                      <p className="text-lg font-cursive text-gray-700">
                        {selectedAnswer === correctIndex
                          ? quizData[currentQuestion].feedback.correct
                          : quizData[currentQuestion].feedback.wrong}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Quiz Results */
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Confetti */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ["#ff69b4", "#ffd700", "#ff1493", "#ff6347", "#da70d6"][
                        Math.floor(Math.random() * 5)
                      ],
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, 0],
                      rotate: [0, 360],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 3,
                      delay: Math.random() * 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                ))}

                <motion.div
                  className="text-6xl mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
                >
                  🎊
                </motion.div>

                <h3 className="text-4xl font-cursive text-rose-600 mb-4">Quiz Complete!</h3>

                <div className="text-6xl font-bold text-rose-500 mb-4">
                  {score}/{quizData.length}
                </div>

                <p className="text-xl font-cursive text-gray-700 mb-8">{getScoreMessage()}</p>

                <motion.button
                  onClick={resetQuiz}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 interactive"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Take Quiz Again
                </motion.button>

                {/* Floating hearts */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-rose-400"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [-20, -60, -20],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      delay: i * 0.5,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}