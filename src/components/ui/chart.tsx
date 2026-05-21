import * as React from "react";
import { Tooltip, type TooltipProps } from "recharts";

import { cn } from "@/lib/utils";

export type ChartConfig = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

interface ChartContainerProps {
  config: ChartConfig;
  children: React.ReactNode;
  className?: string;
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="w-full h-[340px] overflow-visible">{children}</div>
      <div className="flex flex-wrap gap-3">
        {Object.entries(config).map(([key, { label, color }]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            <span
              className="inline-flex h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartTooltip(props: TooltipProps) {
  return <Tooltip {...props} />;
}
ChartTooltip.displayName = "ChartTooltip";

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number | string;
    color?: string;
  }>;
  label?: string | number;
  hideLabel?: boolean;
  indicator?: "filled" | "dashed";
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  hideLabel,
  indicator = "filled",
}: ChartTooltipContentProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-background p-3 shadow-sm">
      {!hideLabel && (
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </div>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`${entry.name}-${index}`} className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "inline-flex h-2.5 w-2.5 rounded-full",
                indicator === "dashed" ? "border border-current" : "",
              )}
              style={{ backgroundColor: indicator === "filled" ? entry.color : undefined }}
            />
            <span className="truncate">{entry.name}</span>
            <span className="text-muted-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
