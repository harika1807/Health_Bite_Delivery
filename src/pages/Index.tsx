import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FoodCategories from "@/components/FoodCategories";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FoodCategories />
      <FeaturedRestaurants />
    </div>
  );
};

export default Index;
