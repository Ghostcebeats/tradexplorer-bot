import { ArrowUp, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import MarketChart from "@/components/MarketChart";
import TradeAnalysis from "@/components/TradeAnalysis";

const mockRecommendations = [
  {
    market: "US30",
    action: "BUY",
    price: "38,789.50",
    confidence: 87,
  },
  {
    market: "GOLD",
    action: "SELL",
    price: "2,156.30",
    confidence: 92,
  },
  {
    market: "NASDAQ",
    action: "BUY",
    price: "16,248.75",
    confidence: 85,
  },
  {
    market: "US100",
    action: "SELL",
    price: "17,891.20",
    confidence: 89,
  },
  {
    market: "USD/EUR",
    action: "BUY",
    price: "1.0845",
    confidence: 83,
  },
];

const timeframes = ["5min", "30min", "1hour"];

const Index = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("5min");

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Easy Mode Trading</h1>
      
      <div className="space-y-4">
        {mockRecommendations.map((rec, index) => (
          <Card 
            key={index} 
            className="p-4 bg-secondary animate-fade-in cursor-pointer hover:bg-secondary/80 transition-colors"
            onClick={() => setSelectedMarket(rec.market)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{rec.market}</h3>
                <p className="text-sm text-muted-foreground">${rec.price}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className={`flex items-center ${
                  rec.action === "BUY" ? "text-green-500" : "text-red-500"
                }`}>
                  {rec.action === "BUY" ? <ArrowUp /> : <ArrowDown />}
                  <span className="ml-1 font-bold">{rec.action}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {rec.confidence}% confidence
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedMarket && (
        <div className="mt-6 space-y-4">
          <div className="flex gap-2 mb-4">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded ${
                  selectedTimeframe === timeframe
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
          
          <MarketChart 
            market={selectedMarket} 
            timeframe={selectedTimeframe}
          />
          
          <TradeAnalysis 
            market={selectedMarket} 
            timeframe={selectedTimeframe}
          />
        </div>
      )}
    </div>
  );
};

export default Index;