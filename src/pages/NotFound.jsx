import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="text-8xl font-display font-bold text-primary/20">404</div>
        <h1 className="text-2xl font-display font-bold">Page not found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/"><Home className="w-4 h-4 mr-2" />Go Home</Link>
        </Button>
      </div>
    </div>);

};

export default NotFound;