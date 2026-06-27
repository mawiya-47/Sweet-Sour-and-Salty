import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-accent text-accent-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-bold text-xl">Sweet Sour and Salty</span>
            <p className="mt-4 text-accent-foreground/80 leading-relaxed">
              Authentic flavors from around the world, delivered fresh to your door. Experience the perfect blend of sweet, sour, and salty in every bite.
            </p>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Contact us</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span className="text-accent-foreground/80">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span className="text-accent-foreground/80">hello@sweetsourandsalty.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span className="text-accent-foreground/80">123 Flavor Street, Food City, FC 12345</span>
              </div>
            </div>
          </div>

          <div>
            <span className="font-semibold text-lg block mb-4">Hours</span>
            <div className="space-y-2 text-accent-foreground/80">
              <p>Monday - Friday: 11am - 10pm</p>
              <p>Saturday - Sunday: 10am - 11pm</p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="hover:text-primary transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-accent-foreground/60">
            Made by Muhammad Mawiya
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-accent-foreground/60 hover:text-accent-foreground transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;