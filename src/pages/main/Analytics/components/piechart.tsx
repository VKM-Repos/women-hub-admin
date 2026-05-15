
"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart, ResponsiveContainer } from "recharts"

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

export const description = "Most visited pages"

const chartData = [
  { browser: "home", visitors: 40, fill: "hsl(var(--chart-1))" },
  { browser: "events", visitors: 30, fill: "hsl(var(--chart-2))" },
  { browser: "discussions", visitors: 20, fill: "hsl(var(--chart-3))" },
  { browser: "projects", visitors: 10, fill: "hsl(var(--chart-4))" },
]

const chartConfig = {

  home: {
    label: "Home Page",
    color: "hsl(var(--chart-1))",
  },
  events: {
    label: "Events Page",
    color: "hsl(var(--chart-2))",
  },
  discussions: {
    label: "Discussions Page",
    color: "hsl(var(--chart-3))",
  },
   projects: {
    label: "Projects Page",
    color: "hsl(var(--chart-4))",
  },

} satisfies ChartConfig

export function ChartPieDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Most Visited Pages</CardTitle>
    
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        
      </CardFooter>
    </Card>
  )
}
