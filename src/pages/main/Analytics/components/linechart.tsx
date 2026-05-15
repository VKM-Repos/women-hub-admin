
"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A line chart"

const chartData = [
  { day: "Monday", visits: 32 },
  { day: "Tuesday", visits: 25 },
  { day: "Wednesday", visits: 28 },
  { day: "Thursday", visits: 20 },
  { day: "Friday", visits: 55 },
  { day: "Saturday", visits: 8 },
  { day: "Sunday", visits: 43 },
]

const chartConfig = {
  visits: {
    label: "Visits",
    color: "#ff8a3d",
  },
} satisfies ChartConfig

export function ChartLineDefault() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-[inter] font-medium text-lg text-[#3A3541]">Website Visits</CardTitle>
          <CardDescription>Mon - Sun</CardDescription>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Today
        </button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            width={650}
            height={325}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              type="number"
              domain={[0, 60]}
              tickLine={false}
              axisLine={false}
              width={30}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="visits"
              type="natural"
              stroke="#ff8a3d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          
        </div>
        <div className="leading-none text-muted-foreground">
         
        </div>
      </CardFooter>
    </Card>
  )
}
