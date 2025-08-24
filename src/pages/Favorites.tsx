import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { ArrowLeft, Heart, Star, Clock, Truck } from 'lucide-react';

const Favorites = () => {
  const navigate = useNavigate();
  
  const [favorites] = useState([
    {
      id: 1,
      name: "Green Vitality",
      cuisine: "Healthy Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      minOrder: 12
    },
    {
      id: 2,
      name: "Burger Haven",
      cuisine: "American",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      rating: 4.6,
      deliveryTime: "20-30 min",
      deliveryFee: "$2.99",
      minOrder: 15
    },
    {
      id: 3,
      name: "Sushi Station",
      cuisine: "Japanese",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.99",
      minOrder: 20
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>

        {favorites.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
            <p className="text-muted-foreground mb-6">
              Start adding your favorite restaurants to quickly access them here
            </p>
            <Button onClick={() => navigate('/restaurants')}>
              Browse Restaurants
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map(restaurant => (
              <Card 
                key={restaurant.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              >
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Remove from favorites logic here
                    }}
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </Button>
                  {restaurant.deliveryFee === "Free" && (
                    <Badge className="absolute top-2 left-2">Free Delivery</Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-muted-foreground" />
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Min. order ${restaurant.minOrder}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;