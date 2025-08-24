import { useState } from "react";
import { Brain, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AIHealthFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const healthOptions = [
    { id: 'low-cal', label: 'Low Calorie', color: 'health' },
    { id: 'high-protein', label: 'High Protein', color: 'secondary' },
    { id: 'low-carb', label: 'Low Carb', color: 'health' },
    { id: 'gluten-free', label: 'Gluten Free', color: 'secondary' },
    { id: 'vegan', label: 'Vegan', color: 'health' },
    { id: 'keto', label: 'Keto Friendly', color: 'secondary' },
    { id: 'diabetic', label: 'Diabetic Friendly', color: 'health' },
    { id: 'heart-healthy', label: 'Heart Healthy', color: 'secondary' },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Button
        variant="health"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-14 text-lg font-semibold relative overflow-hidden group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Brain className="h-6 w-6" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <span>AI Health Filter</span>
          <Filter className="h-5 w-5" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-health/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Button>

      {isOpen && (
        <Card className="mt-4 border-health/20 shadow-xl">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Tell our AI what you're looking for
                </h3>
                <p className="text-muted-foreground text-sm">
                  Select your health preferences and we'll find the perfect meals for you
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {healthOptions.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedFilters.includes(option.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(option.id)}
                    className="h-auto py-3 text-xs font-medium"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>

              {selectedFilters.length > 0 && (
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilters.map((filterId) => {
                      const option = healthOptions.find(opt => opt.id === filterId);
                      return (
                        <Badge key={filterId} variant="secondary" className="text-xs">
                          {option?.label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button 
                variant="hero" 
                className="w-full mt-4"
                disabled={selectedFilters.length === 0}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Apply AI Health Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIHealthFilter;