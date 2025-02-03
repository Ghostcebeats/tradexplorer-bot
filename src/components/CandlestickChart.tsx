import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";

interface CandlestickChartProps {
  market: string;
  timeframe: string;
}

const CandlestickChart = ({ market, timeframe }: CandlestickChartProps) => {
  // Map market names to TradingView symbols
  const getSymbol = (market: string) => {
    switch (market) {
      case "US30":
        return "DJ30";
      case "NASDAQ":
        return "NASDAQ";
      case "US100":
        return "NDX";
      case "GOLD":
        return "GOLD";
      case "USD/EUR":
        return "EURUSD";
      default:
        return market;
    }
  };

  // Get interval based on timeframe
  const getInterval = (timeframe: string) => {
    switch (timeframe) {
      case "5min":
        return "5";
      case "30min":
        return "30";
      case "1hour":
        return "60";
      default:
        return "5";
    }
  };

  useEffect(() => {
    console.log("Initializing TradingView widget with:", { market, timeframe });
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": getSymbol(market),
      "interval": getInterval(timeframe),
      "timezone": "exchange",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": false,
      "support_host": "https://www.tradingview.com"
    });

    const container = document.getElementById('tradingview-candlestick-widget');
    if (container) {
      container.innerHTML = '';
      container.appendChild(script);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [market, timeframe]);

  return (
    <Card className="p-4 h-[400px]">
      <h3 className="text-lg font-semibold mb-4">{market} - {timeframe}</h3>
      <div id="tradingview-candlestick-widget" className="h-[320px] w-full" />
    </Card>
  );
};

export default CandlestickChart;