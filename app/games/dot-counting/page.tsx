"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Howl } from "howler"
import GameLayout from "@/components/game-layout"
import ObjectDisplay from "@/components/object-display"
import Confetti from "@/components/confetti"
import { motion } from "framer-motion"

export default function DotCountingGame() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showObjects, setShowObjects] = useState(false)
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro")
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  // Sound effects
  const correctSound = new Howl({
    src: ["/sounds/correct.mp3"],
    volume: 0.7,
  })

  const incorrectSound = new Howl({
    src: ["/sounds/incorrect.mp3"],
    volume: 0.5,
  })

  const questions = [
    {
      count: 3,
      options: [2, 3, 4],
      objects: [
        { type: "🎈", color: "#FF5252" },
        { type: "🎈", color: "#4CAF50" },
        { type: "🎈", color: "#2196F3" },
      ],
    },
    {
      count: 5,
      options: [4, 5, 6],
      objects: [
        { type: "🍎", color: "#FF5252" },
        { type: "🍎", color: "#FF5252" },
        { type: "🍎", color: "#FF5252" },
        { type: "🍎", color: "#FF5252" },
        { type: "🍎", color: "#FF5252" },
      ],
    },
    {
      count: 2,
      options: [1, 2, 3],
      objects: [
        { type: "🥭", color: "#FFC107" },
        { type: "🥭", color: "#FFC107" },
      ],
    },
    {
      count: 4,
      options: [3, 4, 5],
      objects: [
        { type: "🪁", color: "#9C27B0" },
        { type: "🪁", color: "#E91E63" },
        { type: "🪁", color: "#3F51B5" },
        { type: "🪁", color: "#009688" },
      ],
    },
    {
      count: 6,
      options: [5, 6, 7],
      objects: [
        { type: "⚽", color: "#000000" },
        { type: "⚽", color: "#000000" },
        { type: "⚽", color: "#000000" },
        { type: "⚽", color: "#000000" },
        { type: "⚽", color: "#000000" },
        { type: "⚽", color: "#000000" },
      ],
    },
  ]

  const startGame = () => {
    setGameState("playing")
    showObjectsForDuration()
  }

  const showObjectsForDuration = () => {
    setShowObjects(true)
    setTimeout(() => {
      setShowObjects(false)
    }, 2000) // Show objects for 2 seconds
  }

  const handleAnswer = (answer: number) => {
    if (selectedAnswer !== null) return // Prevent multiple answers

    setSelectedAnswer(answer)
    const correct = answer === questions[currentQuestion].count
    setIsCorrect(correct)

    if (correct) {
      correctSound.play()
      setScore(score + 1)
      if (currentQuestion === questions.length - 1) {
        setShowConfetti(true)
      }
    } else {
      incorrectSound.play()
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setIsCorrect(null)
        showObjectsForDuration()
      } else {
        setGameState("result")
      }
    }, 1500)
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setGameState("intro")
    setShowConfetti(false)
  }

  useEffect(() => {
    if (gameState === "result" && score === questions.length) {
      setShowConfetti(true)
    }
  }, [gameState, score, questions.length])

  return (
    <GameLayout
      title="Quick Count Challenge"
      icon="🎮"
      ageGroup="6-7 years"
      progress={gameState === "playing" ? (currentQuestion / questions.length) * 100 : 0}
    >
      {showConfetti && <Confetti />}

      {gameState === "intro" && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl shadow-inner">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">How to Play</h2>
            <div className="space-y-4">
              <p className="text-xl text-indigo-600">You will see some fun objects for a short time.</p>
              <p className="text-xl text-indigo-600">Count them quickly before they disappear!</p>
              <p className="text-xl text-indigo-600">Then tap the correct number.</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-2xl px-10 py-8 h-auto rounded-2xl shadow-lg"
            >
              Let's Play! 🎮
            </Button>
          </motion.div>
        </motion.div>
      )}

      {gameState === "playing" && (
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {showObjects ? "How many do you see?" : "How many did you see?"}
            </h2>
          </div>

          <motion.div
            className="w-full max-w-md h-64 flex items-center justify-center mb-8 bg-white rounded-3xl border-4 border-indigo-200 shadow-lg"
            animate={showObjects ? { scale: 1 } : { scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {showObjects ? (
              <ObjectDisplay objects={questions[currentQuestion].objects} />
            ) : (
              <div className="text-6xl animate-bounce-slow">❓</div>
            )}
          </motion.div>

          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            {questions[currentQuestion].options.map((option) => (
              <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`text-3xl h-24 w-full rounded-2xl shadow-md ${
                    selectedAnswer === option
                      ? isCorrect
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : "bg-gradient-to-r from-red-400 to-pink-500"
                      : "bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600"
                  }`}
                >
                  {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {gameState === "result" && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Game Complete!
          </h2>
          <div className="mb-8 p-8 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl shadow-lg">
            <p className="text-2xl text-indigo-700 mb-4">Your Score:</p>
            <div className="relative">
              <p className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
                {score} / {questions.length}
              </p>
              {score === questions.length && (
                <div className="absolute -top-6 -right-6">
                  <span className="text-5xl animate-bounce-slow">🏆</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={restartGame}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-xl px-8 py-6 h-auto rounded-2xl shadow-md"
                >
                  Play Again 🔄
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => router.push("/")}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-xl px-8 py-6 h-auto rounded-2xl shadow-md"
                >
                  More Games 🎮
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </GameLayout>
  )
}
