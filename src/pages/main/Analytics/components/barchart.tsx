
"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A blog activity bar chart"

const chartData = [
  { month: "January", comments: 18, likes: 36 },
  { month: "February", comments: 40, likes: 34 },
  { month: "March", comments: 38, likes: 35 },
  { month: "April", comments: 29, likes: 24 },
  { month: "May", comments: 48, likes: 44 },
  { month: "June", comments: 24, likes: 20 },
]

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle className="font-[public sans] text-base font-semibold text-slate-900 px-3">
            Blog Activites
          </CardTitle>
        </div>
        <div className="flex items-center gap-4 font-[Inter] text-sm font-normal text-slate-600">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-700" />
            Comments
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-300" />
            Likes
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[360px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            width={680}
            height={325}
            margin={{ top: 16, right: 12, left: 12, bottom: 16 }}
            barCategoryGap="24%"
            barGap={8}
          >
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tickFormatter={(value: number) => `${value}K`}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="comments" fill="#047857" radius={[10, 10, 10, 10]} />
            <Bar dataKey="likes" fill="#6ee7b7" radius={[10, 10, 10, 10]} />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  )
}
