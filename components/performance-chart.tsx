"use client"

import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const performanceData = [
  { month: "Jan", value: 1250000, returns: 15000 },
  { month: "Feb", value: 1270000, returns: 18000 },
  { month: "Mar", value: 1305000, returns: 28000 },
  { month: "Apr", value: 1340000, returns: 32000 },
  { month: "May", value: 1380000, returns: 35000 },
  { month: "Jun", value: 1420000, returns: 38000 },
  { month: "Jul", value: 1460000, returns: 32100 },
  { month: "Aug", value: 1480000, returns: 28500 },
]

export default function PerformanceChart() {
  return (
    <div className="space-y-6">
      {/* Portfolio Value Over Time */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Portfolio Value Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={{ fill: "var(--color-primary)" }}
              name="Portfolio Value"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Monthly Returns */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Monthly Distributions</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-card)",
                border: "1px solid var(--color-border)",
              }}
            />
            <Bar dataKey="returns" fill="var(--color-primary)" name="Monthly Returns" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Performance Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label: "Best Month", value: "$38,000", date: "June 2024" },
          { label: "Average Monthly Return", value: "$29,063", date: "Over 8 months" },
          { label: "Total YTD Returns", value: "$226,600", date: "Jan - Aug 2024" },
        ].map((item, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
            <p className="text-2xl font-bold mb-2">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.date}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
