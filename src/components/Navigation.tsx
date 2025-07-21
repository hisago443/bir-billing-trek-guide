
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Bir Billing Guide</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/explore" className="text-foreground hover:text-primary transition-colors">Explore</Link>
            <Link to="/accommodations" className="text-foreground hover:text-primary transition-colors">Stay</Link>
            <Link to="/dining" className="text-foreground hover:text-primary transition-colors">Eat</Link>
            <Link to="/activities" className="text-foreground hover:text-primary transition-colors">Activities</Link>
            <Link to="/cafes" className={location.pathname.startsWith('/cafes') ? 'text-primary font-semibold' : ''}>Cafes</Link>
            <Link to="/recommendations" className={location.pathname.startsWith('/recommendations') ? 'text-primary font-semibold' : ''}>Recommendations</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Home</Link>
              <Link to="/explore" className="text-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Explore</Link>
              <Link to="/accommodations" className="text-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Stay</Link>
              <Link to="/dining" className="text-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Eat</Link>
              <Link to="/activities" className="text-foreground hover:text-primary transition-colors py-2" onClick={toggleMenu}>Activities</Link>
              <Link to="/cafes" className={location.pathname.startsWith('/cafes') ? 'text-primary font-semibold' : ''}>Cafes</Link>
              <Link to="/recommendations" className={location.pathname.startsWith('/recommendations') ? 'text-primary font-semibold' : ''}>Recommendations</Link>
              
              <Button className="bg-primary hover:bg-primary/90 w-full">
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
