import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Star, Clock, Truck, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const Restaurants = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedHealthOptions, setSelectedHealthOptions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([1, 4]);
  const [sortBy, setSortBy] = useState('rating');

  const cuisineTypes = [
    'Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Japanese', 'American', 'Mediterranean', 'Lebanese', 'Vietnamese'
  ];

  // Handle URL parameters for category filtering
  useEffect(() => {
    const category = searchParams.get('category');
    if (category && cuisineTypes.includes(category)) {
      setSelectedCuisines([category]);
    }
  }, [searchParams]);

  const healthOptions = [
    'Vegan', 'Vegetarian', 'Gluten Free', 'Low Carb', 'High Protein', 'Keto', 'Diabetic Friendly', 'Heart Healthy'
  ];

  const restaurants = [
    {
      id: 1,
      name: "Green Vitality",
      cuisine: "Healthy Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      tags: ["Vegan", "High Protein", "Gluten Free"],
      healthScore: 95,
      priceLevel: 2,
      distance: "1.2 km",
      isOpen: true
    },
    {
      id: 2,
      name: "Taste of Italy",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 189,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      tags: ["Vegetarian", "Gluten Free"],
      healthScore: 78,
      priceLevel: 3,
      distance: "2.1 km",
      isOpen: true
    },
    {
      id: 3,
      name: "Protein Palace",
      cuisine: "Fitness Food",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 312,
      deliveryTime: "20-30 min",
      deliveryFee: "Free",
      tags: ["High Protein", "Low Carb", "Keto"],
      healthScore: 92,
      priceLevel: 3,
      distance: "0.8 km",
      isOpen: true
    },
    {
      id: 4,
      name: "Spice Route",
      cuisine: "Indian",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 156,
      deliveryTime: "35-45 min",
      deliveryFee: "$1.99",
      tags: ["Vegan", "Diabetic Friendly"],
      healthScore: 85,
      priceLevel: 2,
      distance: "1.8 km",
      isOpen: false
    },
    {
      id: 5,
      name: "Ocean Breeze Sushi",
      cuisine: "Japanese",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 98,
      deliveryTime: "40-50 min",
      deliveryFee: "$3.99",
      tags: ["High Protein", "Heart Healthy"],
      healthScore: 88,
      priceLevel: 4,
      distance: "3.2 km",
      isOpen: true
    },
    {
      id: 6,
      name: "Mediterranean Delights",
      cuisine: "Mediterranean",
      image: "https://images.unsplash.com/photo-1505253213348-cd54c92b37ed?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 127,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.49",
      tags: ["Vegetarian", "Heart Healthy", "Gluten Free"],
      healthScore: 90,
      priceLevel: 3,
      distance: "2.5 km",
      isOpen: true
    }
  ];

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleHealthOption = (option: string) => {
    setSelectedHealthOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCuisine = selectedCuisines.length === 0 || 
                          selectedCuisines.includes(restaurant.cuisine);
    
    const matchesHealth = selectedHealthOptions.length === 0 ||
                         selectedHealthOptions.some(option => restaurant.tags.includes(option));
    
    const matchesPrice = restaurant.priceLevel >= priceRange[0] && restaurant.priceLevel <= priceRange[1];
    
    return matchesSearch && matchesCuisine && matchesHealth && matchesPrice;
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'delivery-time':
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      case 'health-score':
        return b.healthScore - a.healthScore;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      default:
        return 0;
    }
  });

  const getPriceDisplay = (level: number) => {
    return '$'.repeat(level) + '·'.repeat(4 - level);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search and Filter Header */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b">
        <div className="container px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span>Delivering to: Current Location</span>
            </div>
            
            <div className="flex-1 relative max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {(selectedCuisines.length + selectedHealthOptions.length) > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {selectedCuisines.length + selectedHealthOptions.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Restaurants</SheetTitle>
                  <SheetDescription>
                    Customize your restaurant search
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-6 mt-6">
                  {/* Sort By */}
                  <div>
                    <h3 className="font-medium mb-3">Sort By</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'rating', label: 'Rating' },
                        { value: 'delivery-time', label: 'Delivery Time' },
                        { value: 'health-score', label: 'Health Score' },
                        { value: 'distance', label: 'Distance' }
                      ].map((option) => (
                        <Button
                          key={option.value}
                          variant={sortBy === option.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy(option.value)}
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={4}
                        min={1}
                        step={1}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{getPriceDisplay(priceRange[0])}</span>
                        <span>{getPriceDisplay(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cuisine Types */}
                  <div>
                    <h3 className="font-medium mb-3">Cuisine Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {cuisineTypes.map((cuisine) => (
                        <div key={cuisine} className="flex items-center space-x-2">
                          <Checkbox
                            id={cuisine}
                            checked={selectedCuisines.includes(cuisine)}
                            onCheckedChange={() => toggleCuisine(cuisine)}
                          />
                          <label
                            htmlFor={cuisine}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {cuisine}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Health Options */}
                  <div>
                    <h3 className="font-medium mb-3">Health Options</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {healthOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option}
                            checked={selectedHealthOptions.includes(option)}
                            onCheckedChange={() => toggleHealthOption(option)}
                          />
                          <label
                            htmlFor={option}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {filteredRestaurants.length} Restaurants Found
          </h1>
          <div className="text-muted-foreground">
            Sorted by {sortBy.replace('-', ' ')}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCuisines.length > 0 || selectedHealthOptions.length > 0) && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {selectedCuisines.map((cuisine) => (
                <Badge key={cuisine} variant="secondary" className="gap-1">
                  {cuisine}
                  <button
                    onClick={() => toggleCuisine(cuisine)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
              {selectedHealthOptions.map((option) => (
                <Badge key={option} variant="outline" className="gap-1">
                  {option}
                  <button
                    onClick={() => toggleHealthOption(option)}
                    className="ml-1 hover:text-destructive"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            >
              <div className="relative">
                <img 
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant={restaurant.isOpen ? "default" : "secondary"}
                    className={restaurant.isOpen ? "bg-health" : "bg-muted"}
                  >
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant={restaurant.healthScore >= 90 ? "default" : "secondary"}
                    className={restaurant.healthScore >= 90 ? "bg-health" : ""}
                  >
                    {restaurant.healthScore}% Health
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-sm">{restaurant.cuisine}</p>
                      <span className="text-sm font-medium">{getPriceDisplay(restaurant.priceLevel)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                      <span className="text-muted-foreground">({restaurant.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="h-4 w-4" />
                      <span className={restaurant.deliveryFee === "Free" ? "text-health font-medium" : ""}>
                        {restaurant.deliveryFee}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {restaurant.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {restaurant.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{restaurant.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;