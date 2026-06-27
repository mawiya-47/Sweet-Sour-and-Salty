import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import MenuItemCard from '@/components/MenuItemCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await pb.collection('menu_items').getFullList({ $autoCancel: false });
        setMenuItems(items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const categories = ['All', 'Biryani', 'Pulao', 'Pizza', 'Burgers'];
  
  const getItemsByCategory = (category) => {
    if (category === 'All') return menuItems;
    return menuItems.filter(item => item.category === category);
  };

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-destructive mb-4">Failed to load menu: {error}</p>
            <button onClick={() => window.location.reload()} className="text-primary hover:underline">
              Try again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menu - Sweet Sour and Salty</title>
        <meta name="description" content="Browse our delicious menu featuring authentic Biryani, Pulao, gourmet Pizza, and juicy Burgers. Order online for fast delivery." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance" style={{ letterSpacing: '-0.02em' }}>
                Our menu
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Discover authentic flavors crafted with passion and the finest ingredients
              </p>
            </div>

            <Tabs defaultValue="All" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-12">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="transition-all duration-200">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map(category => (
                <TabsContent key={category} value={category}>
                  {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="space-y-4">
                          <Skeleton className="aspect-square w-full" />
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-8 w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {getItemsByCategory(category).map(item => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}

                  {!loading && getItemsByCategory(category).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No items found in this category</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default MenuPage;