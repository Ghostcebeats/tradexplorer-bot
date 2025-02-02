import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TradeAnalysisProps {
  market: string;
  timeframe: string;
}

const TradeAnalysis = ({ market, timeframe }: TradeAnalysisProps) => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(0);
  const [action] = useState<"BUY" | "SELL">(
    Math.random() > 0.5 ? "BUY" : "SELL"
  );

  useEffect(() => {
    // Set initial time based on timeframe
    const duration = timeframe === "5min" ? 300 :
                    timeframe === "30min" ? 1800 : 3600;
    setTimeLeft(duration);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          toast({
            title: "Trade Timer Expired",
            description: `Time to close your ${market} ${action} trade!`,
          });
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeframe, market, action, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className={`flex items-center ${
          action === "BUY" ? "text-green-500" : "text-red-500"
        }`}>
          {action === "BUY" ? <ArrowUp /> : <ArrowDown />}
          <span className="ml-2 font-bold">{action}</span>
        </div>
        <div className="text-sm">
          Time left: <span className="font-mono">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </Card>
  );
};

export default TradeAnalysis;