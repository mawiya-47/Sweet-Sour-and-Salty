import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import CartItemRow from '@/components/CartItemRow.jsx';
import { useCart } from '@/contexts/CartContext.jsx';

const ShoppingCartPage = () => {
  const { cartItems, cartTotal } = useCart();
  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Cart - Sweet Sour and Salty</title>
          <meta name="description" content="Review your cart and proceed to checkout for fast delivery." />
        </Helmet>

        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Add some delicious items from our menu to get started
                </p>
                <Link to="/menu">
                  <Button size="lg" className="transition-all duration-200 active:scale-[0.98]">
                    Browse menu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Shopping Cart (${cartItems.length}) - Sweet Sour and Salty`}</title>
        <meta name="description" content="Review your cart and proceed to checkout for fast delivery." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-balance" style={{ letterSpacing: '-0.02em' }}>
              Shopping cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Cart items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="px-6">
                      {cartItems.map(cartItem => (
                        <CartItemRow key={cartItem.item.id} cartItem={cartItem} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Order summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  </CardContent>
                  <CardFooter>
                    <Link to="/checkout" className="w-full">
                      <Button size="lg" className="w-full transition-all duration-200 active:scale-[0.98]">
                        Proceed to checkout
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ShoppingCartPage;