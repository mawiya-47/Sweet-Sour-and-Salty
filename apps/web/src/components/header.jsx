import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useCart } from '@/contexts/CartContext.jsx';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { cartCount } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-foreground">Sweet Sour and Salty</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button 
                variant={isActive('/') ? 'default' : 'ghost'}
                className="transition-all duration-200"
              >
                Home
              </Button>
            </Link>
            <Link to="/menu">
              <Button 
                variant={isActive('/menu') ? 'default' : 'ghost'}
                className="transition-all duration-200"
              >
                Menu
              </Button>
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative transition-all duration-200">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="transition-all duration-200">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="transition-all duration-200 active:scale-[0.98]">
                    Sign up
                  </Button>
                </Link>
                <Link to="/admin-login">
                  <Button variant="outline" size="sm" className="transition-all duration-200">
                    Admin
                  </Button>
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="icon" className="transition-all duration-200">
                      <LayoutDashboard className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="transition-all duration-200">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={logout}
                  className="transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;