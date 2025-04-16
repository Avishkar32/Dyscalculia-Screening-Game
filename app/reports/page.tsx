"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Download, Home } from "lucide-react"
import Link from "next/link"

interface GameResult {
  gameId: string
  gameName: string
  score: number
  totalQuestions: number
  averageTime: number
  completed: boolean
}

export default function ReportsPage() {
  const router = useRouter()
  const [userName, setUserName] = useState<string>("")
  const [userAge, setUserAge] = useState<string>("")
  const [results, setResults] = useState<GameResult[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Get user info from session storage
    const name = sessionStorage.getItem("userName") || "Student"
    const age = sessionStorage.getItem("userAge") || "Unknown"
    setUserName(name)
    setUserAge(age)

    // Get results from session storage
    const storedResults = sessionStorage.getItem("gameResults")
    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }

    setLoading(false)
  }, [])

  const calculateOverallScore = () => {
    if (results.length === 0) return 0

    const totalScore = results.reduce((sum, game) => sum + (game.score / game.totalQuestions) * 100, 0)
    return Math.round(totalScore / results.length)
  }

  const getPerformanceCategory = (score: number) => {
    if (score >= 90) return { label: "Excellent", color: "text-green-600" }
    if (score >= 75) return { label: "Good", color: "text-blue-600" }
    if (score >= 60) return { label: "Average", color: "text-yellow-600" }
    if (score >= 40) return { label: "Needs Practice", color: "text-orange-600" }
    return { label: "Needs Support", color: "text-red-600" }
  }

  const chartData = results.map((game) => ({
    name: game.gameName.split(" ")[0],
    score: Math.round((game.score / game.totalQuestions) * 100),
    time: game.averageTime.toFixed(1),
  }))

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    alert("Report download functionality would be implemented here")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex items-center justify-center">
        <div className="text-2xl text-indigo-700">Loading report...</div>
      </div>
    )
  }

  const overallScore = calculateOverallScore()
  const performance = getPerformanceCategory(overallScore)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="text-indigo-700 hover:bg-indigo-100">
              <Home className="mr-2" size={20} />
              Home
            </Button>
          </Link>
          <Button onClick={handleDownloadReport} className="bg-indigo-600 hover:bg-indigo-700">
            <Download className="mr-2" size={20} />
            Download Report
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="border-4 border-indigo-200 rounded-3xl overflow-hidden shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 pt-8 pb-6">
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                Math Skills Report
              </CardTitle>
              <CardDescription className="text-indigo-600 text-lg">
                {userName}, Age {userAge}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-indigo-800 mb-2">Overall Performance</h2>
                <div className="relative inline-block">
                  <div className="w-40 h-40 rounded-full border-8 border-indigo-100 flex items-center justify-center">
                    <span className="text-4xl font-bold text-indigo-700">{overallScore}%</span>
                  </div>
                  <div className={`mt-2 text-xl font-bold ${performance.color}`}>{performance.label}</div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">Game Performance</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="score" name="Score %" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-indigo-800 mb-4">Detailed Results</h2>
                <div className="space-y-4">
                  {results.length > 0 ? (
                    results.map((game, index) => (
                      <div key={index} className="p-4 bg-white rounded-xl border-2 border-indigo-100 shadow-sm">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-bold text-indigo-700">{game.gameName}</h3>
                          <span className="text-lg font-bold">
                            {game.score}/{game.totalQuestions}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 mt-1">
                          <span>Average time: {game.averageTime.toFixed(1)} seconds</span>
                          <span
                            className={game.score / game.totalQuestions >= 0.7 ? "text-green-600" : "text-orange-600"}
                          >
                            {Math.round((game.score / game.totalQuestions) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center p-8 text-gray-500">
                      No game results available. Complete some games to see your results!
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="pb-6 pt-4 flex justify-center">
              <Link href="/">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-lg px-6 py-3 rounded-xl">
                  Play More Games
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
