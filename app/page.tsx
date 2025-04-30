import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default function Home() {
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
