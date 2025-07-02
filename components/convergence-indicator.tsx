"use client"

import { ArrowUp, ArrowDown, Minus, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ConvergenceIndicatorProps {
  error: number
  errorPercentage: number
  isConverged: boolean
}

export function ConvergenceIndicator({ error, errorPercentage, isConverged }: ConvergenceIndicatorProps) {
  const getActionIcon = () => {
    if (isConverged) return <CheckCircle className="h-8 w-8 text-green-600" />
    if (error > 2) return <ArrowUp className="h-8 w-8 text-red-600" />
    if (error < -2) return <ArrowDown className="h-8 w-8 text-blue-600" />
    return <Minus className="h-8 w-8 text-orange-600" />
  }

  const getActionText = () => {
    if (isConverged) return "System Converged"
    if (error > 2) return "Increase Actuator"
    if (error < -2) return "Decrease Actuator"
    return "Fine Tuning"
  }

  const getActionColor = () => {
    if (isConverged) return "default"
    if (Math.abs(error) > 5) return "destructive"
    return "secondary"
  }

  return (
    <div className="space-y-4">
      {/* Main Action Indicator */}
      <div className="text-center p-6 bg-slate-50 dark:bg-slate-700 rounded-lg">
        <div className="flex justify-center mb-3">{getActionIcon()}</div>
        <Badge variant={getActionColor()} className="text-sm px-3 py-1">
          {getActionText()}
        </Badge>
      </div>

      {/* Error Magnitude */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Error Magnitude</span>
          <span className="font-medium">{Math.abs(error).toFixed(1)}°C</span>
        </div>
        <Progress value={Math.min(100, Math.abs(error) * 5)} className="h-2" />
      </div>

      {/* Convergence Status */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-slate-100 dark:bg-slate-600 rounded">
          <div className="font-semibold text-slate-900 dark:text-slate-100">
            {error > 0 ? "+" : ""}
            {error.toFixed(1)}°C
          </div>
          <div className="text-slate-600 dark:text-slate-400">Error</div>
        </div>
        <div className="text-center p-2 bg-slate-100 dark:bg-slate-600 rounded">
          <div className="font-semibold text-slate-900 dark:text-slate-100">{errorPercentage.toFixed(1)}%</div>
          <div className="text-slate-600 dark:text-slate-400">Deviation</div>
        </div>
      </div>

      {/* Action Guidance */}
      <div className="text-xs text-center text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700 p-3 rounded">
        {isConverged
          ? "✓ Process is within acceptable limits"
          : error > 0
            ? "↑ PV below SP - Increase heat/power input"
            : "↓ PV above SP - Decrease heat/power input"}
      </div>
    </div>
  )
}
