"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { LineChart, Line, ResponsiveContainer } from "recharts"
import { AlertTriangle, CheckCircle } from "lucide-react"

interface ProcessParameter {
  id: string
  name: string
  unit: string
  pv: number
  sp: number
  aiSp: number
  lowLimit: number
  highLimit: number
  trend: Array<{ timestamp: number; pv: number; sp: number }>
  color: string
  icon: string
}

interface ProcessParameterCardProps {
  parameter: ProcessParameter
  onParameterUpdate: (parameter: ProcessParameter) => void
}

export function ProcessParameterCard({ parameter, onParameterUpdate }: ProcessParameterCardProps) {
  const error = parameter.sp - parameter.pv
  const errorPercentage = Math.abs(error / parameter.sp) * 100
  const isInRange = Math.abs(error) < (parameter.highLimit - parameter.lowLimit) * 0.05

  const colorClasses = {
    amber: "from-amber-500 to-amber-600",
    blue: "from-blue-500 to-blue-600",
    cyan: "from-cyan-500 to-cyan-600",
    yellow: "from-yellow-500 to-yellow-600",
    purple: "from-purple-500 to-purple-600",
    red: "from-red-500 to-red-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  }

  const chartData = parameter.trend.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    PV: point.pv.toFixed(1),
    SP: point.sp.toFixed(1),
  }))

  const handleLimitChange = (type: "low" | "high", value: number[]) => {
    const updatedParameter = {
      ...parameter,
      [type === "low" ? "lowLimit" : "highLimit"]: value[0],
    }
    onParameterUpdate(updatedParameter)
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <span className="text-lg">{parameter.icon}</span>
            <div>
              <div className="text-slate-900 dark:text-slate-100">{parameter.name}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">{parameter.unit}</div>
            </div>
          </CardTitle>
          <Badge variant={isInRange ? "default" : "destructive"} className="text-xs">
            {isInRange ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
            {isInRange ? "OK" : "ADJ"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Values */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{parameter.pv.toFixed(1)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">PV</div>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <div className="text-lg font-bold text-green-600">{parameter.sp.toFixed(1)}</div>
            <div className="text-xs text-slate-600 dark:text-slate-400">AI SP</div>
          </div>
        </div>

        {/* Mini Trend Chart */}
        <div className="h-20 bg-slate-50 dark:bg-slate-700 rounded-lg p-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="PV" stroke="#3b82f6" strokeWidth={1.5} dot={false} />
              <Line type="monotone" dataKey="SP" stroke="#10b981" strokeWidth={1.5} strokeDasharray="2 2" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Error Display */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-slate-100 dark:bg-slate-600 rounded">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {error > 0 ? "+" : ""}
              {error.toFixed(1)}
            </div>
            <div className="text-slate-600 dark:text-slate-400">Error</div>
          </div>
          <div className="text-center p-2 bg-slate-100 dark:bg-slate-600 rounded">
            <div className="font-semibold text-slate-900 dark:text-slate-100">{errorPercentage.toFixed(1)}%</div>
            <div className="text-slate-600 dark:text-slate-400">Dev</div>
          </div>
        </div>

        {/* Bounds Control */}
        <div className="space-y-3">
          <div>
            <Label className="text-xs font-medium">Low Limit: {parameter.lowLimit}</Label>
            <Slider
              value={[parameter.lowLimit]}
              onValueChange={(value) => handleLimitChange("low", value)}
              max={parameter.highLimit - 10}
              min={0}
              step={1}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs font-medium">High Limit: {parameter.highLimit}</Label>
            <Slider
              value={[parameter.highLimit]}
              onValueChange={(value) => handleLimitChange("high", value)}
              max={parameter.highLimit * 1.5}
              min={parameter.lowLimit + 10}
              step={1}
              className="mt-1"
            />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="text-center text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded">
          {isInRange ? (
            <span className="text-green-600">✓ Parameter within optimal range</span>
          ) : error > 0 ? (
            <span className="text-red-600">↑ PV below SP - Increase input</span>
          ) : (
            <span className="text-blue-600">↓ PV above SP - Decrease input</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
