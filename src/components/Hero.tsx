import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-food.jpg";
import AIHealthFilter from "./AIHealthFilter";

const Hero = () => {
  const navigate = useNavigate();

  const handleFindFood = () => {
    navigate('/restaurants');
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Delicious food spread" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Feeling{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Hangry?
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Order delicious food with our AI-powered health filter. Eat what you love, stay healthy.
            </p>
          </div>

          {/* Location and Search */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-5 w-5" />
                <span>Deliver to: </span>
                <span className="font-semibold text-white">Current Location</span>
              </div>
              
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for restaurants, cuisines, or dishes..."
                  className="pl-10 h-12 bg-white text-foreground border-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <Button variant="hero" size="lg" className="h-12 px-8" onClick={handleFindFood}>
                Find Food
              </Button>
            </div>
          </div>

          {/* AI Health Filter */}
          <AIHealthFilter />
        </div>
      </div>
    </section>
  );
};

export default Hero;