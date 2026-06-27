import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Sweet Sour and Salty - Authentic flavors delivered fresh</title>
        <meta name="description" content="Experience the perfect blend of sweet, sour, and salty flavors. Order authentic Biryani, Pulao, Pizza, and Burgers delivered fresh to your door." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=900&fit=crop)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                  Sweet Sour and Salty
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                  Experience authentic flavors from around the world, delivered fresh to your door
                </p>
                <Link to="/menu">
                  <Button size="lg" className="text-lg px-8 py-6 transition-all duration-200 active:scale-[0.98] hover:shadow-lg">
                    Order now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast delivery</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Hot and fresh meals delivered to your door in under 45 minutes
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Premium quality</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Authentic recipes made with the finest ingredients and traditional methods
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Track your order</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Real-time updates from kitchen to your doorstep with live order tracking
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance" style={{ letterSpacing: '-0.02em' }}>
                  Our signature dishes
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  From aromatic biryanis to crispy pizzas, discover flavors that tell a story
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop" 
                    alt="Aromatic chicken biryani with fragrant basmati rice and tender meat"
                    className="rounded-2xl shadow-lg w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-4">Authentic Biryani</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Slow-cooked with aromatic spices and fragrant basmati rice. Each grain tells a story of tradition and flavor, layered with tender meat and caramelized onions.
                  </p>
                  <Link to="/menu">
                    <Button variant="outline" className="transition-all duration-200">
                      View menu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="order-2 md:order-1"
                >
                  <h3 className="text-2xl font-bold mb-4">Gourmet Pizzas</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Hand-tossed dough topped with premium ingredients and baked to perfection. Crispy crust, melted cheese, and bold flavors in every bite.
                  </p>
                  <Link to="/menu">
                    <Button variant="outline" className="transition-all duration-200">
                      View menu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="order-1 md:order-2"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop" 
                    alt="Gourmet pizza with fresh mozzarella and basil on crispy crust"
                    className="rounded-2xl shadow-lg w-full"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance" style={{ letterSpacing: '-0.02em' }}>
                  Ready to order?
                </h2>
                <p className="text-xl mb-8 text-primary-foreground/90 leading-relaxed">
                  Browse our full menu and get your favorite dishes delivered hot and fresh
                </p>
                <Link to="/menu">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 transition-all duration-200 active:scale-[0.98] hover:shadow-lg">
                    Explore menu
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;