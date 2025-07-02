"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ProcessData {
  timestamp: number
  pv: number
  sp: number
  aiSp: number
}

interface ProcessTrendChartProps {
  data: ProcessData[]
}

export function ProcessTrendChart({ data }: ProcessTrendChartProps) {
  const chartData = data.map((point) => ({
    time: new Date(point.timestamp).toLocaleTimeString(),
    PV: point.pv.toFixed(1),
    SP: point.sp.toFixed(1),
  }))

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 12 }} domain={["dataMin - 5", "dataMax + 5"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="PV"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            name="Process Variable (PV)"
          />
          <Line
            type="monotone"
            dataKey="SP"
            stroke="#10b981"
            strokeWidth={2}
            dot={false}
            strokeDasharray="5 5"
            name="Setpoint (SP)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
