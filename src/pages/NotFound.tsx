
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 flex items-center justify-center bg-muted">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! It seems you've wandered off the trail. This page doesn't exist.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/">
              Return to Home
            </Link>
          </Button>
          <p className="mt-6 text-sm text-muted-foreground">
            Need directions? Check our <Link to="/explore" className="text-primary hover:underline">interactive map</Link> or contact our guides.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
