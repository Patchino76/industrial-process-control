"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Target, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

interface FractionData {
  timestamp: number
  value: number
  target: number
}

interface FractionMainDisplayProps {
  currentFraction: number
  targetFraction: number
  fractionData: FractionData[]
  isOptimal: boolean
  onTargetChange: (target: number) => void
}

export function FractionMainDisplay({
  currentFraction,
  targetFraction,
  fractionData,
  isOptimal,
  onTargetChange,
}: FractionMainDisplayProps) {
  const error = targetFraction - currentFraction
  const errorPercentage = Math.abs(error / targetFraction) * 100

  const chartData = fractionData.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    Fraction: point.value.toFixed(1),
    Target: point.target.toFixed(1),
  }))

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold flex items-center gap-3">
            <Target className="h-8 w-8 text-blue-600" />
            Main Process Fraction
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant={isOptimal ? "default" : "destructive"} className="px-4 py-2 text-sm">
              {isOptimal ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" /> OPTIMAL
                </>
              ) : (
                <>
                  <AlertCircle className="h-4 w-4 mr-1" /> OPTIMIZING
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Values Display */}
          <div className="space-y-4">
            <div className="text-center p-6 bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm">
              <div className="text-5xl font-bold text-blue-600 mb-2">{currentFraction.toFixed(1)}%</div>
              <div className="text-lg text-slate-600 dark:text-slate-300">Current Fraction</div>
            </div>

            <div className="text-center p-4 bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">{targetFraction.toFixed(1)}%</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Target Fraction</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-fraction" className="text-sm font-medium">
                Adjust Target Fraction
              </Label>
              <Input
                id="target-fraction"
                type="number"
                value={targetFraction}
                onChange={(e) => onTargetChange(Number.parseFloat(e.target.value) || 0)}
                min={70}
                max={95}
                step={0.1}
                className="text-center font-semibold"
              />
            </div>
          </div>

          {/* Trend Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Fraction Trend</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Fraction"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      dot={false}
                      name="Current Fraction"
                    />
                    <Line
                      type="monotone"
                      dataKey="Target"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Target Fraction"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Error Analysis */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm">
            <div className={`text-2xl font-bold ${error >= 0 ? "text-red-600" : "text-blue-600"}`}>
              {error > 0 ? "+" : ""}
              {error.toFixed(1)}%
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Error</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm">
            <div className="text-2xl font-bold text-orange-600">{errorPercentage.toFixed(1)}%</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Deviation</div>
          </div>
          <div className="text-center p-4 bg-white/60 dark:bg-slate-600/60 rounded-xl backdrop-blur-sm">
            <div className={`text-2xl font-bold ${isOptimal ? "text-green-600" : "text-orange-600"}`}>
              {isOptimal ? "✓" : "⚡"}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">{isOptimal ? "Optimized" : "Optimizing"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
