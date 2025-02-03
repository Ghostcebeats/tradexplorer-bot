import { Home, LineChart, Newspaper, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

const BottomNav = () => {
  const location = useLocation();
  const [showPreview, setShowPreview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: Home, label: "Easy Mode", path: "/" },
    { icon: LineChart, label: "Advanced", path: "/advanced" },
    { icon: Newspaper, label: "News", path: "/news" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  useEffect(() => {
    const showInterval = setInterval(() => {
      setShowPreview(true);
      setTimeLeft(60); // Reset timer to 60 seconds
    }, 30000); // Show every 30 seconds

    return () => clearInterval(showInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showPreview && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowPreview(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showPreview, timeLeft]);

  return (
    <>
      {showPreview && (
        <div className="fixed bottom-16 left-0 right-0 animate-slide-up">
          <Card className="mx-4 mb-2 bg-secondary p-2">
            <div className="relative">
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
                {timeLeft}s
              </div>
              <iframe
                src="https://www.mintme.com/token/Epic/airdrop/7855/embeded"
                className="w-full h-[300px]"
                style={{ border: "none" }}
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                title="mintme-frame"
              />
            </div>
          </Card>
          <Card className="mx-4 mb-2 bg-secondary p-2 h-[100px]">
            <div className="tradingview-widget-container">
              <div className="tradingview-widget-container__widget"></div>
              <iframe
                title="mini-chart"
                src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.html?locale=en#%7B%22symbol%22%3A%22NASDAQ%3AAAPL%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22dateRange%22%3A%221D%22%2C%22colorTheme%22%3A%22dark%22%2C%22trendLineColor%22%3A%2200FF88%22%2C%22underLineColor%22%3A%22rgba(0%2C%20255%2C%20136%2C%200.15)%22%2C%22underLineBottomColor%22%3A%22rgba(0%2C%20255%2C%20136%2C%200.15)%22%2C%22isTransparent%22%3Atrue%2C%22autosize%22%3Atrue%2C%22largeChartUrl%22%3A%22%22%7D"
                style={{ width: "100%", height: "100%" }}
                frameBorder="0"
                allow="clipboard-write"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </Card>
        </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-muted p-2 animate-slide-up">
        <div className="flex justify-around items-center">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive(path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon size={24} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default BottomNav;