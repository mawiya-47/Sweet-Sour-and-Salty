import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PaymentForm from '@/components/PaymentForm.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: ''
  });

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        customer_id: currentUser.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_address: formData.address,
        items: cartItems.map(({ item, quantity }) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity
        })),
        total_price: total,
        status: 'Pending'
      };

      await pb.collection('orders').create(orderData, { $autoCancel: false });
      
      clearCart();
      toast.success('Order placed successfully');
      navigate('/profile');
    } catch (err) {
      toast.error('Failed to place order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout - Sweet Sour and Salty</title>
        <meta name="description" content="Complete your order and get delicious food delivered to your door." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-balance" style={{ letterSpacing: '-0.02em' }}>
              Checkout
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Delivery address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="text-gray-900 placeholder:text-gray-400"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PaymentForm value={paymentMethod} onChange={setPaymentMethod} />
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Order summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {cartItems.map(({ item, quantity }) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {quantity}x {item.name}
                            </span>
                            <span className="font-medium">${(item.price * quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax (8%)</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-primary">${total.toFixed(2)}</span>
                      </div>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full transition-all duration-200 active:scale-[0.98]"
                        disabled={loading}
                      >
                        {loading ? 'Placing order...' : 'Place order'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CheckoutPage;