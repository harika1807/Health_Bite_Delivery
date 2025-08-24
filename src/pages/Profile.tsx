import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { 
  ArrowLeft, 
  Camera, 
  Clock, 
  Heart, 
  MapPin, 
  Package, 
  Settings, 
  Star,
  User,
  CreditCard,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    address: '',
    avatar_url: ''
  });

  const [orderHistory] = useState([
    {
      id: '001',
      restaurant: 'Burger Haven',
      date: '2024-01-15',
      total: 35.99,
      status: 'delivered',
      items: 3
    },
    {
      id: '002',
      restaurant: 'Pizza Palace',
      date: '2024-01-14',
      total: 42.50,
      status: 'delivered',
      items: 2
    },
    {
      id: '003',
      restaurant: 'Sushi Station',
      date: '2024-01-12',
      total: 68.00,
      status: 'delivered',
      items: 4
    }
  ]);

  const [savedAddresses] = useState([
    {
      id: '1',
      label: 'Home',
      address: '123 Main St, Apt 4B',
      isDefault: true
    },
    {
      id: '2',
      label: 'Work',
      address: '456 Business Ave, Floor 10',
      isDefault: false
    }
  ]);

  const [paymentMethods] = useState([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false
    }
  ]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          address: data.address || '',
          avatar_url: data.avatar_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user?.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

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

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.avatar_url} />
                    <AvatarFallback>
                      {profile.full_name ? getInitials(profile.full_name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-semibold mt-4">
                  {profile.full_name || 'User'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {user?.email}
                </p>
                <Badge className="mt-2">Premium Member</Badge>
              </div>

              <div className="mt-6 space-y-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/orders')}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Order History
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Favorites
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="full_name">Full Name</Label>
                      <Input
                        id="full_name"
                        value={profile.full_name}
                        onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Default Address</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                      />
                    </div>
                    <Button onClick={updateProfile} disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order History</h3>
                  <div className="space-y-4">
                    {orderHistory.map(order => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer"
                        onClick={() => navigate(`/orders/${order.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{order.restaurant}</h4>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.id} • {order.items} items
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${order.total.toFixed(2)}</p>
                            <Badge variant="outline" className="mt-1">
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Saved Addresses</h3>
                    <Button size="sm">Add New Address</Button>
                  </div>
                  <div className="space-y-4">
                    {savedAddresses.map(addr => (
                      <div key={addr.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex gap-3">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{addr.label}</h4>
                                {addr.isDefault && (
                                  <Badge variant="secondary">Default</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {addr.address}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="payment">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    <Button size="sm">Add Payment Method</Button>
                  </div>
                  <div className="space-y-4">
                    {paymentMethods.map(method => (
                      <div key={method.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-muted-foreground" />
                            <div>
                              {method.type === 'card' ? (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    {method.brand} •••• {method.last4}
                                  </span>
                                  {method.isDefault && (
                                    <Badge variant="secondary">Default</Badge>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">PayPal</span>
                                  <span className="text-sm text-muted-foreground">
                                    {method.email}
                                  </span>
                                  {method.isDefault && (
                                    <Badge variant="secondary">Default</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">App Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about your orders
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Privacy & Security</p>
                          <p className="text-sm text-muted-foreground">
                            Manage your data and privacy settings
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;