"use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { motion } from "framer-motion"
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
// import { Download, Home } from "lucide-react"
// import Link from "next/link"

// interface GameResult {
//   gameId: string
//   gameName: string
//   score: number
//   totalQuestions: number
//   averageTime: number
//   completed: boolean
// }

// export default function ReportsPage() {
//   const router = useRouter()
//   const [userName, setUserName] = useState<string>("")
//   const [userAge, setUserAge] = useState<string>("")
//   const [results, setResults] = useState<GameResult[]>([])
//   const [loading, setLoading] = useState<boolean>(true)

//   useEffect(() => {
//     // Get user info from session storage
//     const name = sessionStorage.getItem("userName") || "Student"
//     const age = sessionStorage.getItem("userAge") || "Unknown"
//     setUserName(name)
//     setUserAge(age)

//     // Get results from session storage
//     const storedResults = sessionStorage.getItem("gameResults")
//     if (storedResults) {
//       setResults(JSON.parse(storedResults))
//     }

//     setLoading(false)
//   }, [])

//   // List of all games for the report (add all game ids/names here)
//   const allGames = [
//     { gameId: "dot-counting", gameName: "Dot Counting Game" },
//     { gameId: "number-comparison", gameName: "Number Comparison Game" },
//     { gameId: "pattern-completion", gameName: "Pattern Completion Game" },
//     { gameId: "symbol-confusion", gameName: "Symbol Confusion Game" },
//     { gameId: "place-value", gameName: "Place Value Puzzle" },
//     { gameId: "multi-step", gameName: "Multi-Step Word Problem Game" },
//     { gameId: "conversational", gameName: "Conversational Math Game" },
//     { gameId: "clock-reading", gameName: "Clock Reading Game" },
//     { gameId: "object-counting", gameName: "Object Counting Game" },
//     { gameId: "roleplay", gameName: "Math Roleplay Adventure" },
//     { gameId: "word-problem", gameName: "Math Story Time" },
//   ]

//   // Merge results with allGames to show all, even if not played
//   const mergedResults = allGames.map((g) => {
//     const found = results.find((r) => r.gameId === g.gameId)
//     return found
//       ? found
//       : {
//           ...g,
//           score: 0,
//           totalQuestions: 0,
//           averageTime: 0,
//           completed: false,
//         }
//   })

//   const calculateOverallScore = () => {
//     if (results.length === 0) return 0

//     const totalScore = results.reduce((sum, game) => sum + (game.score / game.totalQuestions) * 100, 0)
//     return Math.round(totalScore / results.length)
//   }

//   const getPerformanceCategory = (score: number) => {
//     if (score >= 90) return { label: "Excellent", color: "text-green-600" }
//     if (score >= 75) return { label: "Good", color: "text-blue-600" }
//     if (score >= 60) return { label: "Average", color: "text-yellow-600" }
//     if (score >= 40) return { label: "Needs Practice", color: "text-orange-600" }
//     return { label: "Needs Support", color: "text-red-600" }
//   }

//   const chartData = results.map((game) => ({
//     name: game.gameName.split(" ")[0],
//     score: Math.round((game.score / game.totalQuestions) * 100),
//     time: game.averageTime.toFixed(1),
//   }))

//   const handleDownloadReport = () => {
//     // In a real app, this would generate a PDF report
//     alert("Report download functionality would be implemented here")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 flex items-center justify-center">
//         <div className="text-2xl text-indigo-700">Loading report...</div>
//       </div>
//     )
//   }

//   const overallScore = calculateOverallScore()
//   const performance = getPerformanceCategory(overallScore)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-8">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center mb-6">
//           <Link href="/">
//             <Button variant="ghost" className="text-indigo-700 hover:bg-indigo-100">
//               <Home className="mr-2" size={20} />
//               Home
//             </Button>
//           </Link>
//           <Button onClick={handleDownloadReport} className="bg-indigo-600 hover:bg-indigo-700">
//             <Download className="mr-2" size={20} />
//             Download Report
//           </Button>
//         </div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
//           <Card className="border-4 border-indigo-200 rounded-3xl overflow-hidden shadow-xl mb-8">
//             <CardHeader className="bg-gradient-to-r from-indigo-100 to-purple-100 pt-8 pb-6">
//               <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
//                 Math Skills Report
//               </CardTitle>
//               <CardDescription className="text-indigo-600 text-lg">
//                 {userName}, Age {userAge}
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="pt-6">
//               <div className="mb-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h3 className="text-2xl font-bold text-indigo-700">Student Information</h3>
//                     <p className="text-lg text-indigo-600">Name: {userName}</p>
//                     <p className="text-lg text-indigo-600">Age: {userAge} years</p>
//                   </div>
//                   <div className="text-center">
//                     <p className="text-2xl font-bold text-indigo-700">Overall Score</p>
//                     <div className={`text-4xl font-bold ${performance.color}`}>{overallScore}%</div>
//                     <p className={`text-xl ${performance.color}`}>{performance.label}</p>
//                   </div>
//                 </div>

//                 <div className="grid gap-6">
//                   {mergedResults.map((game, index) => (
//                     <div
//                       key={game.gameId}
//                       className="p-6 bg-white rounded-2xl shadow-md border-2 border-indigo-100"
//                     >
//                       <div className="flex justify-between items-center mb-4">
//                         <h4 className="text-xl font-bold text-indigo-700">{game.gameName}</h4>
//                         <div className="text-right">
//                           <p className="text-lg font-semibold text-indigo-600">
//                             Score: {Math.round((game.score / game.totalQuestions) * 100)}%
//                           </p>
//                           <p className="text-sm text-indigo-500">
//                             {game.score} out of {game.totalQuestions} correct
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center text-sm text-indigo-500">
//                         <p>Average time per question: {game.averageTime.toFixed(1)}s</p>
//                         <p>{game.completed ? "✅ Completed" : "⏳ In Progress"}</p>
//                       </div>
//                       <div className="mt-2 h-2 bg-indigo-100 rounded-full overflow-hidden">
//                         <div
//                           className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
//                           style={{ width: `${(game.score / game.totalQuestions) * 100}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>

//             <CardFooter className="pb-6 pt-4 flex justify-center">
//               <Button onClick={handleDownloadReport} className="bg-indigo-600 hover:bg-indigo-700">
//                 <Download className="mr-2" size={20} />
//                 Download Detailed Report
//               </Button>
//             </CardFooter>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   )
// }


// import useScoreStore from '../store/scoreStore';
// import { useEffect } from 'react';
// import Head from 'next/head';

// import { useRouter } from "next/navigation"


// const ResultsPage: React.FC = () => {
//   const scores = useScoreStore((state) => state.scores);
//   const resetScores = useScoreStore((state) => state.resetScores);
//   const router = useRouter();

//   // Calculate total score
//   const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

//   useEffect(() => {
//     // Redirect if no scores exist (user accessed results directly)
//     if (Object.keys(scores).length === 0) {
//       router.push('/');
//     }
//   }, [scores, router]);

//   return (
//     <>
//       <Head>
//         <title>Assessment Results</title>
//       </Head>
      
//       <div className="container mx-auto p-4 max-w-2xl">
//         <h1 className="text-2xl font-bold mb-6">Assessment Results</h1>
        
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Game Scores</h2>
//           <ul className="space-y-2">
//             {Object.entries(scores).map(([game, score]) => (
//               <li key={game} className="flex justify-between">
//                 <span className="capitalize">{game.replace(/-/g, ' ')}:</span>
//                 <span>{score}/100</span>
//               </li>
//             ))}
//           </ul>
//         </div>
        
//         <div className="bg-blue-50 rounded-lg shadow p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-2">Total Score</h2>
//           <p className="text-3xl font-bold">
//             {totalScore}/{Object.keys(scores).length * 100}
//           </p>
//         </div>
        
//         <button 
//           onClick={() => {
//             resetScores();
//             router.push('/');
//           }}
//           className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//         >
//           Start New Assessment
//         </button>
//       </div>
//     </>
//   );
// };

// export default ResultsPage;

import useScoreStore from '../store/scoreStore';
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from "next/navigation";

const ResultsPage: React.FC = () => {
  const scores = useScoreStore((state) => state.scores);
  const resetScores = useScoreStore((state) => state.resetScores);
  const router = useRouter();

  // Calculate total score safely from nested score objects
  const totalScore = Object.values(scores).reduce((sum, entry) => {
    return sum + (entry?.score ?? 0);
  }, 0);

  useEffect(() => {
    // Redirect to home if no scores are recorded
    if (Object.keys(scores).length === 0) {
      router.push('/');
    }
  }, [scores, router]);

  return (
    <>
      <Head>
        <title>Assessment Results</title>
      </Head>

      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6">Assessment Results</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Game Scores</h2>
          <ul className="space-y-2">
            {Object.entries(scores).map(([game, data]) => (
              <li key={game} className="flex justify-between">
                <span className="capitalize">{game.replace(/-/g, ' ')}:</span>
                <span>{data?.score ?? 0}/10</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Total Score</h2>
          <p className="text-3xl font-bold">
            {totalScore}/{Object.keys(scores).length * 100}
          </p>
        </div>

        <button 
          onClick={() => {
            resetScores();
            router.push('/');
          }}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Start New Assessment
        </button>
      </div>
    </>
  );
};

export default ResultsPage;
