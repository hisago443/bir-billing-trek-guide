
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-xl font-light tracking-wide">Bir Billing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/explore" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Destinations</Link>
            <Link to="/accommodations" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Accommodation</Link>
            <Link to="/cafes" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Dining</Link>
            <Link to="/activities" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Experiences</Link>
            <Link to="/treks" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Adventures</Link>
            <Link to="/community" className="text-sm font-light tracking-wide text-foreground hover:text-accent transition-colors">Community</Link>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="font-light">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="rounded-full">
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-lg border-b border-border/40">
          <div className="container mx-auto px-6 py-6">
            <nav className="flex flex-col space-y-4">
              <Link to="/explore" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Destinations</Link>
              <Link to="/accommodations" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Accommodation</Link>
              <Link to="/cafes" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Dining</Link>
              <Link to="/activities" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Experiences</Link>
              <Link to="/treks" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Adventures</Link>
              <Link to="/community" className="text-foreground hover:text-accent transition-colors py-2 font-light" onClick={toggleMenu}>Community</Link>
              
              <Button variant="ghost" className="justify-start font-light">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
