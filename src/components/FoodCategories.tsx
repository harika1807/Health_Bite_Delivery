import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const FoodCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/restaurants?category=${encodeURIComponent(categoryName)}`);
  };

  const categories = [
    {
      id: 1,
      name: "Healthy Bowls",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
      count: "120+ options"
    },
    {
      id: 2,
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=200&fit=crop",
      count: "85+ options"
    },
    {
      id: 3,
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
      count: "95+ options"
    },
    {
      id: 4,
      name: "Salads",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop",
      count: "75+ options"
    },
    {
      id: 5,
      name: "Asian",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop",
      count: "110+ options"
    },
    {
      id: 6,
      name: "Desserts",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=200&h=200&fit=crop",
      count: "60+ options"
    },
    {
      id: 7,
      name: "Indian",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&h=200&fit=crop",
      count: "90+ options"
    },
    {
      id: 8,
      name: "Mexican",
      image: "https://images.unsplash.com/photo-1565299585323-38174c2a5e97?w=200&h=200&fit=crop",
      count: "70+ options"
    }
  ];

  return (
    <section className="py-16">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What are you craving?
          </h2>
          <p className="text-muted-foreground text-lg">
            Browse by food category
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
              onClick={() => handleCategoryClick(category.name)}
            >
              <CardContent className="p-3 text-center">
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={category.image}
                      alt={category.name}
                      className="w-full h-16 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.count}</p>
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

export default FoodCategories;