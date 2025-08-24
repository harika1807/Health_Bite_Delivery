import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Package, 
  Phone, 
  Truck,
  ChefHat
} from 'lucide-react';

interface OrderStatus {
  status: 'confirmed' | 'preparing' | 'ready' | 'delivering' | 'delivered';
  timestamp: Date;
  message: string;
}

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>({
    status: 'preparing',
    timestamp: new Date(),
    message: 'Your order is being prepared'
  });

  const [orderDetails] = useState({
    id: orderId || '123',
    restaurant: 'Burger Haven',
    estimatedTime: '30-45 minutes',
    deliveryAddress: '123 Main St, Apt 4B',
    driver: {
      name: 'John Smith',
      phone: '+1 234-567-8900',
      vehicle: 'Honda Civic - ABC 123'
    },
    items: [
      { name: 'Classic Burger', quantity: 2, price: 12.99 },
      { name: 'Caesar Salad', quantity: 1, price: 9.99 }
    ],
    total: 39.96
  });

  // Simulate order status updates
  useEffect(() => {
    const statusSequence = [
      { status: 'confirmed' as const, delay: 0, message: 'Order confirmed' },
      { status: 'preparing' as const, delay: 5000, message: 'Restaurant is preparing your food' },
      { status: 'ready' as const, delay: 15000, message: 'Your order is ready for pickup' },
      { status: 'delivering' as const, delay: 20000, message: 'Driver is on the way' },
      { status: 'delivered' as const, delay: 30000, message: 'Order delivered!' }
    ];

    const timers = statusSequence.map(({ status, delay, message }) =>
      setTimeout(() => {
        setCurrentStatus({
          status,
          timestamp: new Date(),
          message
        });
      }, delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const getProgressValue = () => {
    const statusMap = {
      'confirmed': 20,
      'preparing': 40,
      'ready': 60,
      'delivering': 80,
      'delivered': 100
    };
    return statusMap[currentStatus.status];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5" />;
      case 'preparing':
        return <ChefHat className="w-5 h-5" />;
      case 'ready':
        return <Package className="w-5 h-5" />;
      case 'delivering':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const statusSteps = [
    { key: 'confirmed', label: 'Confirmed', icon: <CheckCircle className="w-5 h-5" /> },
    { key: 'preparing', label: 'Preparing', icon: <ChefHat className="w-5 h-5" /> },
    { key: 'ready', label: 'Ready', icon: <Package className="w-5 h-5" /> },
    { key: 'delivering', label: 'On the way', icon: <Truck className="w-5 h-5" /> },
    { key: 'delivered', label: 'Delivered', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === currentStatus.status);

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Header */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Order #{orderDetails.id}</h1>
                  <p className="text-muted-foreground">{orderDetails.restaurant}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Estimated delivery</p>
                  <p className="font-semibold">{orderDetails.estimatedTime}</p>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={getProgressValue()} className="mb-6" />

              {/* Status Steps */}
              <div className="flex justify-between">
                {statusSteps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`flex flex-col items-center ${
                      index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 mb-2 ${
                        index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-xs text-center">{step.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Current Status */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full p-3 bg-primary/10 text-primary">
                  {getStatusIcon(currentStatus.status)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{currentStatus.message}</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated {currentStatus.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Driver Information (shown when delivering) */}
            {(currentStatus.status === 'delivering' || currentStatus.status === 'delivered') && (
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Delivery Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{orderDetails.driver.name}</p>
                      <p className="text-sm text-muted-foreground">{orderDetails.driver.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <p>{orderDetails.driver.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <p>{orderDetails.deliveryAddress}</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Driver
                </Button>
              </Card>
            )}

            {/* Map Placeholder */}
            {currentStatus.status === 'delivering' && (
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Live Tracking</h3>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Map view would appear here</p>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" variant="outline">
                  View Receipt
                </Button>
                {currentStatus.status === 'delivered' && (
                  <Button className="w-full">
                    Rate Order
                  </Button>
                )}
                <Button className="w-full" variant="outline">
                  Report Issue
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;