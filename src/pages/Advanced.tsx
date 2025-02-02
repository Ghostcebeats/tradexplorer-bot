import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CandlestickChart from "@/components/CandlestickChart";
import TradeAnalysis from "@/components/TradeAnalysis";

const markets = [
  { id: "us30", name: "US30", companies: ["Boeing", "Apple", "Microsoft", "Goldman Sachs"] },
  { id: "nasdaq", name: "NASDAQ", companies: ["Tesla", "Meta", "Amazon", "Alphabet"] },
  { id: "us100", name: "US100", companies: ["Netflix", "NVIDIA", "Adobe", "PayPal"] },
  { id: "gold", name: "GOLD", companies: ["Newmont", "Barrick Gold", "Franco-Nevada", "Wheaton"] },
  { id: "usd", name: "USD/EUR", companies: ["JPMorgan", "Bank of America", "Citigroup", "Wells Fargo"] },
];

const timeframes = ["5min", "30min", "1hour"];

const Advanced = () => {
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("5min");

  const handleMarketChange = (value: string) => {
    setSelectedMarket(value);
    setSelectedCompanies([]);
  };

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev => 
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const currentMarket = markets.find(m => m.id === selectedMarket);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Advanced Analysis</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Market</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMarket} onValueChange={handleMarketChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a market" />
              </SelectTrigger>
              <SelectContent>
                {markets.map((market) => (
                  <SelectItem key={market.id} value={market.id}>
                    {market.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {currentMarket && (
          <Card>
            <CardHeader>
              <CardTitle>Select Impacting Companies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentMarket.companies.map((company) => (
                <div key={company} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={company}
                    checked={selectedCompanies.includes(company)}
                    onChange={() => toggleCompany(company)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor={company}>{company}</label>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Select Timeframe</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <div className="flex space-x-4">
                {timeframes.map((timeframe) => (
                  <div key={timeframe} className="flex items-center space-x-2">
                    <RadioGroupItem value={timeframe} id={timeframe} />
                    <label htmlFor={timeframe}>{timeframe}</label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {selectedMarket && selectedCompanies.length > 0 && (
          <>
            <CandlestickChart 
              market={currentMarket.name} 
              timeframe={selectedTimeframe}
            />
            
            <TradeAnalysis 
              market={currentMarket.name} 
              timeframe={selectedTimeframe}
            />

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedCompanies.map((company) => (
                    <div key={company} className="border-b pb-4">
                      <h3 className="font-semibold mb-2">{company}</h3>
                      <p className="text-sm text-muted-foreground">
                        Impact analysis for {selectedTimeframe} timeframe:
                        {Math.random() > 0.5 ? 
                          " Positive impact expected with 78% confidence" : 
                          " Negative impact expected with 65% confidence"}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Advanced;