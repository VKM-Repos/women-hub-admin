
"use client"

import { useState } from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple line chart"

const weeklyData = [
  { day: "Mon", discussion: 18, likes: 32 },
  { day: "Tue", discussion: 35, likes: 30 },
  { day: "Wed", discussion: 28, likes: 45 },
  { day: "Thu", discussion: 40, likes: 22 },
  { day: "Fri", discussion: 50, likes: 60 },
  { day: "Sat", discussion: 32, likes: 18 },
  { day: "Sun", discussion: 22, likes: 49 },
]

const monthlyData = [
  { day: "Week 1", discussion: 120, likes: 135 },
  { day: "Week 2", discussion: 145, likes: 160 },
  { day: "Week 3", discussion: 130, likes: 118 },
  { day: "Week 4", discussion: 170, likes: 190 },
]

const chartConfig = {
  discussion: {
    label: "Discussion",
    color: "#10B981",
  },
  likes: {
    label: "Organization Likes",
    color: "#F97316",
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
  const [period, setPeriod] = useState<"WEEKLY" | "MONTHLY">("WEEKLY")
  const data = period === "WEEKLY" ? weeklyData : monthlyData

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">User Engagement</CardTitle>
          <CardDescription>{period === "WEEKLY" ? "Mon - Sun" : "This month"}</CardDescription>
        </div>
        <div className="inline-flex rounded-full border border-neutral-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              period === "WEEKLY"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
            onClick={() => setPeriod("WEEKLY")}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              period === "MONTHLY"
                ? "bg-slate-950 text-white"
                : "text-slate-500 hover:text-slate-900"
            }`}
            onClick={() => setPeriod("MONTHLY")}
          >
            Monthly
          </button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartConfig.discussion.color }} />
            Discussion
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: chartConfig.likes.color }} />
            Organization Likes
          </div>
        </div>

        <div className="w-full h-[340px] overflow-visible">
          <LineChart
            accessibilityLayer
            data={data}
            width={650}
            height={325}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 8,
            }}
          >
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#6B7280", fontSize: 13 }}
            />
            <YAxis
              type="number"
              domain={[0, "dataMax + 20"]}
              tickLine={false}
              axisLine={false}
              width={30}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="discussion"
              type="monotone"
              stroke={chartConfig.discussion.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              dataKey="likes"
              type="monotone"
              stroke={chartConfig.likes.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </div>
      </CardContent>
    </Card>
  )
}
