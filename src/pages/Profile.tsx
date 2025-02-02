import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const [hasAgreed, setHasAgreed] = useState(false);
  const { toast } = useToast();

  const handleAgree = () => {
    setHasAgreed(true);
    toast({
      title: "Agreement Signed",
      description: "You have acknowledged the trading risks.",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      
      <Card className="p-4 bg-secondary mb-4">
        <h2 className="text-lg font-semibold mb-4">Risk Agreement</h2>
        <p className="text-sm text-muted-foreground mb-4">
          I understand that trading involves significant risk of loss and is not
          suitable for all investors. Past performance is not indicative of future
          results.
        </p>
        <Button
          onClick={handleAgree}
          disabled={hasAgreed}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {hasAgreed ? "Agreement Signed" : "Sign Agreement"}
        </Button>
      </Card>
    </div>
  );
};

export default Profile;