"use client"

import Link from "next/link"
import { useState, useEffect, createContext, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

// --- Age Context Setup ---
type AgeContextType = {
  age: string
  setAge: (age: string) => void
}
const AgeContext = createContext<AgeContextType | undefined>(undefined)
export const useAge = () => {
  const ctx = useContext(AgeContext)
  if (!ctx) throw new Error("useAge must be used within AgeProvider")
  return ctx
}
const AgeProvider = ({ children }: { children: React.ReactNode }) => {
  const [age, setAge] = useState<string>("")
  useEffect(() => {
    // Optionally persist age in localStorage
    const stored = typeof window !== "undefined" ? localStorage.getItem("user-age") : null
    if (stored) setAge(stored)
  }, [])
  useEffect(() => {
    if (age) localStorage.setItem("user-age", age)
  }, [age])
  return <AgeContext.Provider value={{ age, setAge }}>{children}</AgeContext.Provider>
}
// --- End Age Context ---

function AgeModal() {
  const { age, setAge } = useAge()
  const [input, setInput] = useState(age)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input || isNaN(Number(input)) || Number(input) < 5 || Number(input) > 18) {
      setError("Please enter a valid age between 5 and 18.")
      return
    }
    setAge(input)
  }

  if (age) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center min-w-[320px]"
      >
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Welcome!</h2>
        <label htmlFor="age-modal-input" className="mb-2 text-lg font-medium text-indigo-700">
          Please enter your age to continue:
        </label>
        <input
          id="age-modal-input"
          type="number"
          min={5}
          max={18}
          value={input}
          onChange={e => { setInput(e.target.value); setError(null) }}
          className="border border-indigo-300 rounded-lg px-4 py-2 text-lg w-40 text-center focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2"
          placeholder="Enter age"
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <Button type="submit" className="bg-gradient-to-r from-indigo-500 to-purple-500 w-full rounded-xl text-lg font-medium py-2">
          Continue
        </Button>
      </form>
    </div>
  )
}

function HomeContent() {
  const { age, setAge } = useAge()
  const games = [
    {
      id: "dot-counting",
      title: "Dot Counting Game",
      description: "Recognize quantities without counting",
      ageGroup: "6-7 years",
      icon: "🎮",
      emoji: "🎈",
    },
   
    {
      id: "number-comparison",
      title: "Number Comparison Game",
      description: "Judge greater vs smaller quantities",
      ageGroup: "8-9 years",
      icon: "🔢",
      emoji: "🍎",
    },
    {
      id: "pattern-completion",
      title: "Pattern Completion Game",
      description: "Detect logical/memory issues via sequences",
      ageGroup: "8-9 years",
      icon: "🎨",
      emoji: "🎁",
    },
   
    {
      id: "symbol-confusion",
      title: "Symbol Confusion Game",
      description: "Test symbol recognition",
      ageGroup: "10-12 years",
      icon: "🔠",
      emoji: "➕",
    },
    {
      id: "place-value",
      title: "Place Value Puzzle",
      description: "Evaluate understanding of number structure",
      ageGroup: "9-11 years",
      icon: "🧠",
      emoji: "🔢",
    },
    {
      id: "word-problem",
      title: "Basic Word Problem Game",
      description: "Apply math to real-life situations",
      ageGroup: "8-10 years",
      icon: "💰",
    emoji: "🍦",
  },
    {
      id: "conversational",
      title: "Conversational Math Game",
      description: "Simulate real-life math via dialogue",
      ageGroup: "8-12 years",
      icon: "💬",
      emoji: "🤖",
    },
    {
      id: "clock-reading",
      title: "Clock Reading Game",
      description: "Read analog clocks and calculate time",
      ageGroup: "9-12 years",
      icon: "🕹️",
      emoji: "🕒",
    },
  ]

  return (
    <div className="container mx-auto px-4">
      {/* Remove duplicate age input prompt here */}
      <div className="mb-10 text-center">
        <div className="relative inline-block">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2 pt-12">
            Math Adventure
          </h1>
          <Sparkles className="absolute -top-4 -right-8 text-yellow-400 animate-pulse" size={24} />
          <Sparkles className="absolute -top-2 -left-8 text-yellow-400 animate-pulse" size={20} />
        </div>
        <p className="text-2xl text-indigo-700 font-medium">Fun games to help you learn math!</p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/assessment">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg px-6 py-3 rounded-xl">
              Start Age-Based Assessment 📋
            </Button>
          </Link>
          <Link href="/reports">
            <Button
              variant="outline"
              className="border-indigo-500 text-indigo-700 hover:bg-indigo-100 text-lg px-6 py-3 rounded-xl"
            >
              View Reports 📊
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={`/games/${game.id}`} key={game.id} className="transform transition-all hover:scale-105">
            <Card className="border-4 border-indigo-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl hover:border-indigo-300 h-full">
              <div className="absolute -right-6 -top-6 bg-gradient-to-br from-pink-400 to-purple-500 w-20 h-20 rounded-full flex items-end justify-start p-2">
                <span className="text-4xl px-2 py-3">{game.emoji}</span>
              </div>
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 pt-8 pb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-2">{game.icon}</span>
                  <CardTitle className="text-xl font-bold text-indigo-800">{game.title}</CardTitle>
                </div>
                <CardDescription className="text-indigo-600 font-medium">Age: {game.ageGroup}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 pb-2">
                <p className="text-indigo-700">{game.description}</p>
              </CardContent>
              <CardFooter className="pb-4">
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl text-lg font-medium py-6">
                  Play Now!
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AgeProvider>
      <AgeModal />
      <HomeContent />
    </AgeProvider>
  )
}
