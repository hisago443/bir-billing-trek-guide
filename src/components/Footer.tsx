
import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Bir Billing Guide</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your AI-powered companion for exploring the paragliding capital of India. Discover accommodations, adventures, and local experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/explore" className="text-muted-foreground hover:text-primary transition-colors">Explore Map</Link>
              </li>
              <li>
                <Link to="/accommodations" className="text-muted-foreground hover:text-primary transition-colors">Accommodations</Link>
              </li>
              <li>
                <Link to="/dining" className="text-muted-foreground hover:text-primary transition-colors">Restaurants</Link>
              </li>
              <li>
                <Link to="/activities" className="text-muted-foreground hover:text-primary transition-colors">Adventure Activities</Link>
              </li>
            </ul>
          </div>
          
          {/* Activities */}
          <div>
            <h3 className="font-bold text-lg mb-4">Activities</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/activities/paragliding" className="text-muted-foreground hover:text-primary transition-colors">Paragliding</Link>
              </li>
              <li>
                <Link to="/activities/trekking" className="text-muted-foreground hover:text-primary transition-colors">Trekking Routes</Link>
              </li>
              <li>
                <Link to="/activities/camping" className="text-muted-foreground hover:text-primary transition-colors">Camping</Link>
              </li>
              <li>
                <Link to="/activities/meditation" className="text-muted-foreground hover:text-primary transition-colors">Meditation & Yoga</Link>
              </li>
              <li>
                <Link to="/activities/sightseeing" className="text-muted-foreground hover:text-primary transition-colors">Sightseeing</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5" />
                <span className="text-muted-foreground">Bir Road, Bir, Himachal Pradesh, 176077, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2" />
                <span className="text-muted-foreground">info@birbillingguide.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bir Billing AI Tour Guide. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
