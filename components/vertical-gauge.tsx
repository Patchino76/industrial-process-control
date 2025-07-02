"use client"

interface VerticalGaugeProps {
  value: number
  min: number
  max: number
  label: string
  color: "blue" | "green" | "red" | "orange"
  unit?: string
}

export function VerticalGauge({ value, min, max, label, color, unit = "" }: VerticalGaugeProps) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    red: "from-red-500 to-red-600",
    orange: "from-orange-500 to-orange-600",
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-8 h-48 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        {/* Background scale marks */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-full h-px bg-slate-400 dark:bg-slate-500" />
          ))}
        </div>

        {/* Fill */}
        <div
          className={`absolute bottom-0 w-full bg-gradient-to-t ${colorClasses[color]} transition-all duration-500 ease-out rounded-full`}
          style={{ height: `${percentage}%` }}
        />

        {/* Scale labels */}
        <div className="absolute -right-8 top-0 h-full flex flex-col justify-between text-xs text-slate-600 dark:text-slate-400 py-1">
          <span>{max}</span>
          <span>{((max + min) / 2).toFixed(0)}</span>
          <span>{min}</span>
        </div>
      </div>

      {/* Current value indicator */}
      <div
        className="absolute w-3 h-1 bg-slate-800 dark:bg-slate-200 rounded-full -right-1 transition-all duration-500"
        style={{
          bottom: `${percentage}%`,
          transform: "translateY(50%)",
        }}
      />
    </div>
  )
}
