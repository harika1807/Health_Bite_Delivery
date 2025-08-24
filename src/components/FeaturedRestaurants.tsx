import { Star, Clock, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Green Vitality",
      cuisine: "Healthy Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      tags: ["Vegan", "High Protein"],
      healthScore: 95
    },
    {
      id: 2,
      name: "Taste of Italy",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      rating: 4.6,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      tags: ["Gluten Free Options"],
      healthScore: 78
    },
    {
      id: 3,
      name: "Protein Palace",
      cuisine: "Fitness Food",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
      rating: 4.9,
      deliveryTime: "20-30 min",
      deliveryFee: "Free",
      tags: ["High Protein", "Low Carb"],
      healthScore: 92
    },
    {
      id: 4,
      name: "Spice Route",
      cuisine: "Indian",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
      rating: 4.7,
      deliveryTime: "35-45 min",
      deliveryFee: "$1.99",
      tags: ["Diabetic Friendly"],
      healthScore: 85
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Restaurants
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover top-rated restaurants with health-conscious options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
              <div className="relative">
                <img 
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                    <p className="text-muted-foreground text-sm">{restaurant.cuisine}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span className={restaurant.deliveryFee === "Free" ? "text-health font-medium" : ""}>
                        {restaurant.deliveryFee}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {restaurant.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;