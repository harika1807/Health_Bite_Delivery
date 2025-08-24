import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { ArrowLeft, CheckCircle, CreditCard, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, deliveryInfo, paymentMethod, total } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = async () => {
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing card details",
          description: "Please fill in all card information",
          variant: "destructive"
        });
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      toast({
        title: "Order placed successfully!",
        description: "Your food is being prepared"
      });
      
      // Redirect to order tracking after 2 seconds
      setTimeout(() => {
        navigate('/orders/123'); // Mock order ID
      }, 2000);
    }, 2000);
  };

  if (!cartItems || cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-muted-foreground mb-8">
              Your order has been placed successfully
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to order tracking...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Order Review */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Review</h2>
              <div className="space-y-3">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} • ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Delivery Details */}
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
              <div className="space-y-2">
                <p><span className="font-medium">Address:</span> {deliveryInfo.address}</p>
                <p><span className="font-medium">Phone:</span> {deliveryInfo.phone}</p>
                {deliveryInfo.instructions && (
                  <p><span className="font-medium">Instructions:</span> {deliveryInfo.instructions}</p>
                )}
              </div>
            </Card>

            {/* Payment Details */}
            {paymentMethod === 'card' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Card Details</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {paymentMethod === 'paypal' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">PayPal</h2>
                <p className="text-muted-foreground">
                  You will be redirected to PayPal to complete your payment.
                </p>
              </Card>
            )}

            {paymentMethod === 'cash' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cash on Delivery</h2>
                <p className="text-muted-foreground">
                  Please have the exact amount ready when your order arrives.
                </p>
              </Card>
            )}
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span>${total?.toFixed(2)}</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our Terms of Service and Privacy Policy
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;