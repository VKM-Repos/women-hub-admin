"use client"

import type React from "react"
import { ArrowUpRight } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { name: "Mobile", value: 60, fill: "#F97316" },
  { name: "Tablet", value: 15, fill: "#A8F0D0" },
  { name: "Desktop", value: 25, fill: "#22C55E" },
]

const legendData = [
  {
    name: "Mobile",
    value: "60%",
    icon: MobileIcon,
    color: "#F97316",
  },
  {
    name: "Tablet",
    value: "15%",
    icon: TabletIcon,
    color: "#A8F0D0",
  },
  {
    name: "Desktop",
    value: "25%",
    icon: DesktopIcon,
    color: "#22C55E",
  },
]

function MobileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 2H3C2.44771 2 2 2.44772 2 3V17C2 17.5523 2.44772 18 3 18H11C11.5523 18 12 17.5523 12 17V3C12 2.44772 11.5523 2 11 2H10C10 2.82843 9.32843 3.5 8.5 3.5H5.5C4.67157 3.5 4 2.82843 4 2ZM11 0C12.6569 0 14 1.34315 14 3V17C14 18.6569 12.6569 20 11 20H3C1.34315 20 0 18.6569 0 17V3C0 1.34315 1.34315 0 3 0H11Z"
        fill="#FF7400"
      />
    </svg>
  )
}

function TabletIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 4H6C5.44771 4 5 4.44772 5 5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V5C19 4.44772 18.5523 4 18 4ZM6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V5C21 3.34315 19.6569 2 18 2H6Z"
        fill="currentColor"
      />
      <path
        d="M13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z"
        fill="currentColor"
      />
    </svg>
  )
}

function DesktopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 5H5C4.44772 5 4 5.44772 4 6V15C4 15.5523 4.44772 16 5 16H19C19.5523 16 20 15.5523 20 15V6C20 5.44771 19.5523 5 19 5ZM5 3C3.34315 3 2 4.34315 2 6V15C2 16.6569 3.34315 18 5 18H19C20.6569 18 22 16.6569 22 15V6C22 4.34315 20.6569 3 19 3H5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 20C1 19.4477 1.44772 19 2 19H22C22.5523 19 23 19.4477 23 20C23 20.5523 22.5523 21 22 21H2C1.44772 21 1 20.5523 1 20Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function ChartPieDonutTwo() {
  return (
    <Card className="max-w-[400px] rounded-lg border border-slate-200">
      <CardHeader className="flex items-center justify-between gap-4 pb-0">
        <div>
          <CardTitle className="text-base font-semibold">Top device</CardTitle>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm transition hover:bg-slate-50">
          <span>Full view</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </CardHeader>

      <CardContent className="pb-0">
        <div className="relative h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent />}
                labelFormatter={() => "Sep 30 - Oct 7"}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={88}
                outerRadius={105}
                startAngle={90}
                endAngle={-270}
                paddingAngle={1}
                cornerRadius={999}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.fill}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>

      <CardFooter className="grid gap-3 pt-0">
        <div className="grid gap-3 sm:grid-cols-3">
          {legendData.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.name} className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `${item.color}22` }}
                >
                  <Icon className="h-5 w-5" style={{ color: item.color }} />
                </span>
                <div className="">
                  <p className="text-sm font-medium text-slate-900">{item.name}</p>
                  <p className="text-sm font-semibold text-slate-800">{item.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardFooter>
    </Card>
  )
}
