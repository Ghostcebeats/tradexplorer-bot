import { Card } from "@/components/ui/card";
import { Clock, TrendingUp, DollarSign, Building } from "lucide-react";

const mockNews = [
  {
    title: "Fed Signals Potential Rate Cuts",
    source: "Bloomberg",
    time: "2 hours ago",
    impact: "high",
    markets: ["USD", "US30", "NASDAQ"],
    companies: ["JPMorgan", "Goldman Sachs"]
  },
  {
    title: "US30 Reaches New All-Time High",
    source: "CNBC",
    time: "4 hours ago",
    impact: "medium",
    markets: ["US30"],
    companies: ["Apple", "Microsoft"]
  },
  {
    title: "Tech Sector Rally Boosts NASDAQ",
    source: "Reuters",
    time: "3 hours ago",
    impact: "high",
    markets: ["NASDAQ", "US100"],
    companies: ["NVIDIA", "AMD", "Intel"]
  },
  {
    title: "Gold Prices Surge Amid Global Uncertainty",
    source: "Financial Times",
    time: "5 hours ago",
    impact: "medium",
    markets: ["GOLD", "USD"],
    companies: ["Newmont Mining", "Barrick Gold"]
  },
  {
    title: "US100 Technical Analysis Shows Bullish Pattern",
    source: "MarketWatch",
    time: "1 hour ago",
    impact: "low",
    markets: ["US100", "NASDAQ"],
    companies: ["Tesla", "Meta", "Amazon"]
  }
];

const News = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Market News</h1>
      
      <div className="space-y-4">
        {mockNews.map((news, index) => (
          <Card key={index} className="p-4 bg-secondary animate-fade-in">
            <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">{news.source}</span>
              <div className="flex items-center text-muted-foreground">
                <Clock size={14} className="mr-1" />
                {news.time}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {news.markets.map((market, idx) => (
                <span
                  key={idx}
                  className="flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                >
                  <TrendingUp size={12} className="mr-1" />
                  {market}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {news.companies.map((company, idx) => (
                <span
                  key={idx}
                  className="flex items-center text-xs bg-secondary-foreground/10 text-secondary-foreground px-2 py-1 rounded"
                >
                  <Building size={12} className="mr-1" />
                  {company}
                </span>
              ))}
            </div>

            <div className={`mt-2 text-xs inline-block px-2 py-1 rounded ${
              news.impact === "high" ? "bg-red-500/20 text-red-400" :
              news.impact === "medium" ? "bg-yellow-500/20 text-yellow-400" :
              "bg-green-500/20 text-green-400"
            }`}>
              {news.impact.toUpperCase()} IMPACT
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;