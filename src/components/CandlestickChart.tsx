import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

// Mock data structure for candlesticks
const generateMockData = (timeframe: string) => {
  const data = [];
  const basePrice = 100;
  
  for (let i = 0; i < 20; i++) {
    const open = basePrice + Math.random() * 10;
    const close = basePrice + Math.random() * 10;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    
    data.push({
      time: `${i}:00`,
      open,
      close,
      high,
      low,
    });
  }
  return data;
};

interface CandlestickChartProps {
  market: string;
  timeframe: string;
}

const CandlestickChart = ({ market, timeframe }: CandlestickChartProps) => {
  const data = generateMockData(timeframe);

  return (
    <Card className="p-4 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">{market} - {timeframe}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Bar
            dataKey="low"
            fill="transparent"
            yAxisId={0}
          />
          <Bar
            dataKey="high"
            fill="transparent"
            yAxisId={0}
          />
          {data.map((entry, index) => (
            <rect
              key={`candle-${index}`}
              x={index * (100 / data.length) + '%'}
              y={entry.open > entry.close ? entry.close : entry.open}
              width={2}
              height={Math.abs(entry.open - entry.close)}
              fill={entry.open > entry.close ? '#ef4444' : '#22c55e'}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CandlestickChart;