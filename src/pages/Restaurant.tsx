import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Truck, MapPin, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  healthScore: number;
  customizable: boolean;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items: cartItems, updateQuantity, getCartTotal, getItemCount } = useCart();
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Mock restaurant data - in real app this would come from API
  const restaurants = {
    '1': {
      id: 1,
      name: "Green Vitality",
      cuisine: "Healthy Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=400&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      deliveryTime: "25-35 min",
      deliveryFee: "Free",
      minOrder: 15,
      description: "Fresh, healthy bowls packed with nutrients and flavor. We believe eating healthy should never compromise on taste.",
      address: "123 Health Street, Wellness District",
      phone: "(555) 123-4567",
      tags: ["Vegan", "High Protein", "Gluten Free"],
      healthScore: 95,
      isOpen: true
    },
    '2': {
      id: 2,
      name: "Taste of Italy",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 189,
      deliveryTime: "30-40 min",
      deliveryFee: "$2.99",
      minOrder: 20,
      description: "Authentic Italian cuisine made with traditional recipes and the finest ingredients imported from Italy.",
      address: "456 Little Italy, Food District",
      phone: "(555) 234-5678",
      tags: ["Vegetarian", "Gluten Free"],
      healthScore: 78,
      isOpen: true
    }
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Power Bowl Supreme",
      description: "Quinoa, grilled chicken, avocado, chickpeas, cherry tomatoes, and tahini dressing",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      category: "Bowls",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      calories: 520,
      protein: 35,
      carbs: 45,
      fat: 18,
      healthScore: 92,
      customizable: true
    },
    {
      id: 2,
      name: "Vegan Buddha Bowl",
      description: "Brown rice, roasted vegetables, edamame, hemp seeds, and green goddess dressing",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
      category: "Bowls",
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      calories: 410,
      protein: 18,
      carbs: 52,
      fat: 14,
      healthScore: 88,
      customizable: true
    },
    {
      id: 3,
      name: "Protein Smoothie",
      description: "Banana, spinach, protein powder, almond milk, and chia seeds",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1553830591-fddf9c346e35?w=300&h=200&fit=crop",
      category: "Drinks",
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      calories: 280,
      protein: 25,
      carbs: 28,
      fat: 8,
      healthScore: 85,
      customizable: false
    },
    {
      id: 4,
      name: "Grilled Salmon Salad",
      description: "Fresh salmon, mixed greens, cucumber, cherry tomatoes, and lemon vinaigrette",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      category: "Salads",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: true,
      calories: 380,
      protein: 32,
      carbs: 12,
      fat: 22,
      healthScore: 90,
      customizable: true
    },
    {
      id: 5,
      name: "Acai Berry Bowl",
      description: "Acai puree topped with granola, fresh berries, and honey",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1511909525232-61113c912358?w=300&h=200&fit=crop",
      category: "Bowls",
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
      calories: 320,
      protein: 8,
      carbs: 58,
      fat: 12,
      healthScore: 75,
      customizable: true
    },
    {
      id: 6,
      name: "Green Detox Juice",
      description: "Kale, cucumber, celery, apple, lemon, and ginger",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=300&h=200&fit=crop",
      category: "Drinks",
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: true,
      calories: 95,
      protein: 3,
      carbs: 22,
      fat: 1,
      healthScore: 95,
      customizable: false
    }
  ];

  const restaurant = restaurants[id as keyof typeof restaurants];

  if (!restaurant) {
    return <Navigate to="/restaurants" replace />;
  }

  const categories = [...new Set(menuItems.map(item => item.category))];

  const handleAddToCart = (menuItem: MenuItem, quantity: number = 1) => {
    const cartItem = {
      id: `${restaurant.id}-${menuItem.id}`,
      restaurantId: restaurant.id.toString(),
      restaurantName: restaurant.name,
      name: menuItem.name,
      price: menuItem.price,
      image: menuItem.image
    };
    
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem);
    }
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.customizable) {
      setSelectedItem(item);
    } else {
      handleAddToCart(item);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Restaurant Header */}
      <div className="relative">
        <img 
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white hover:bg-white/20"
          onClick={() => navigate('/restaurants')}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container">
            <div className="text-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-white/90 text-lg">{restaurant.cuisine}</p>
                </div>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Heart className="h-6 w-6" />
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-white/80">({restaurant.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <Clock className="h-4 w-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <Truck className="h-4 w-4" />
                  <span>{restaurant.deliveryFee} delivery</span>
                </div>
                <div className="flex items-center gap-1 text-white/80">
                  <MapPin className="h-4 w-4" />
                  <span>Min. order ${restaurant.minOrder}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {restaurant.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30">
                    {tag}
                  </Badge>
                ))}
                <Badge className="bg-health text-health-foreground">
                  {restaurant.healthScore}% Health Score
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="container px-4 py-6 border-b">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">About {restaurant.name}</h2>
            <p className="text-muted-foreground mb-4">{restaurant.description}</p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>{restaurant.phone}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Time:</span>
              <span className="font-medium">{restaurant.deliveryTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span className="font-medium">{restaurant.deliveryFee}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Minimum Order:</span>
              <span className="font-medium">${restaurant.minOrder}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={restaurant.isOpen ? "default" : "secondary"} className={restaurant.isOpen ? "bg-health" : ""}>
                {restaurant.isOpen ? "Open" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Menu</h2>
          {getItemCount() > 0 && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="default" className="relative">
                  View Cart ({getItemCount()})
                  <Badge variant="secondary" className="ml-2">
                    ${getCartTotal().toFixed(2)}
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Your Order</SheetTitle>
                  <SheetDescription>
                    Review your items before checkout
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-6 space-y-4">
                  {cartItems
                    .filter(item => item.restaurantId === restaurant.id.toString())
                    .map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>{restaurant.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${(getCartTotal() + (restaurant.deliveryFee === "Free" ? 0 : parseFloat(restaurant.deliveryFee.replace('$', '')))).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    disabled={getCartTotal() < restaurant.minOrder}
                    onClick={() => navigate('/cart')}
                  >
                    {getCartTotal() < restaurant.minOrder 
                      ? `Min. order $${restaurant.minOrder}` 
                      : 'Proceed to Checkout'
                    }
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>

        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-4">
                {menuItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <Card 
                      key={item.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-300"
                      onClick={() => handleItemClick(item)}
                    >
                      <CardContent className="p-0">
                        <div className="flex gap-4">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-l-lg"
                          />
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-muted-foreground text-sm">{item.description}</p>
                              </div>
                              <span className="font-bold text-lg text-primary">${item.price.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.isVegan && <Badge variant="outline" className="text-xs">Vegan</Badge>}
                              {item.isVegetarian && <Badge variant="outline" className="text-xs">Vegetarian</Badge>}
                              {item.isGlutenFree && <Badge variant="outline" className="text-xs">Gluten Free</Badge>}
                              <Badge variant="secondary" className="text-xs">
                                {item.healthScore}% Health
                              </Badge>
                            </div>
                            
                            <div className="flex justify-between items-center text-xs text-muted-foreground">
                              <span>{item.calories} cal</span>
                              <span>{item.protein}g protein</span>
                              <span>{item.carbs}g carbs</span>
                              <span>{item.fat}g fat</span>
                              {!item.customizable && (
                                <Button variant="outline" size="sm" onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(item);
                                }}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Item Customization Modal */}
      {selectedItem && (
        <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <SheetContent className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>{selectedItem.name}</SheetTitle>
              <SheetDescription>
                Customize your order
              </SheetDescription>
            </SheetHeader>
            
            <div className="mt-6 space-y-4">
              <img 
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="text-muted-foreground">{selectedItem.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Calories:</span> {selectedItem.calories}
                </div>
                <div>
                  <span className="font-medium">Protein:</span> {selectedItem.protein}g
                </div>
                <div>
                  <span className="font-medium">Carbs:</span> {selectedItem.carbs}g
                </div>
                <div>
                  <span className="font-medium">Fat:</span> {selectedItem.fat}g
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Price:</span>
                  <span className="text-lg font-bold text-primary">${selectedItem.price.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => {
                    handleAddToCart(selectedItem);
                    setSelectedItem(null);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default Restaurant;