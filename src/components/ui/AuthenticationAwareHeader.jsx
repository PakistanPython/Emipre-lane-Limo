import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticationAwareHeader = () => {
  const { user, logout } = useUser();
  const isAuthenticated = !!user;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/login');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-2" onClick={closeMobileMenu}>
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L21 12M21 12L15 6M21 12L15 18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="12" r="2" fill="var(--color-accent)"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-inter font-semibold text-lg text-primary leading-none">Empire Lane</span>
        <span className="font-inter font-light text-sm text-text-secondary leading-none">Limo</span>
      </div>
    </Link>
  );

  const NavigationItems = ({ mobile = false }) => {
    const baseClasses = mobile 
      ? "block px-4 py-3 text-base font-inter font-medium luxury-transition hover:bg-muted rounded-lg" :"px-4 py-2 text-base font-inter font-medium luxury-transition hover:text-accent rounded-lg";

    const activeClasses = mobile
      ? "bg-accent text-accent-foreground"
      : "text-accent";

    return (
      <>
        <Link 
          to="/homepage" 
          className={`${baseClasses} ${isActiveRoute('/homepage') ? activeClasses : 'text-foreground hover:text-accent'}`}
          onClick={closeMobileMenu}
        >
          Home
        </Link>
        
        <Link 
          to="/vehicle-booking-system" 
          className={`${baseClasses} ${isActiveRoute('/vehicle-booking-system') ? activeClasses : 'text-foreground hover:text-accent'}`}
          onClick={closeMobileMenu}
        >
          Book Now
        </Link>

        {isAuthenticated && (
          <Link 
            to="/customer-dashboard" 
            className={`${baseClasses} ${isActiveRoute('/customer-dashboard') ? activeClasses : 'text-foreground hover:text-accent'}`}
            onClick={closeMobileMenu}
          >
            Dashboard
          </Link>
        )}

        {!isAuthenticated ? (
          <div className={mobile ? "space-y-2" : "flex items-center space-x-2"}>
            <Link 
              to="/login" 
              className={`${baseClasses} ${isActiveRoute('/login') ? activeClasses : 'text-foreground hover:text-accent'}`}
              onClick={closeMobileMenu}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className={mobile ? `${baseClasses} bg-primary text-primary-foreground hover:bg-secondary` : ""}
              onClick={closeMobileMenu}
            >
              {mobile ? (
                "Register"
              ) : (
                <Button variant="default" size="sm">
                  Register
                </Button>
              )}
            </Link>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className={`${baseClasses} text-foreground hover:text-error`}
          >
            Logout
          </button>
        )}
      </>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background border-b border-border luxury-shadow">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavigationItems />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg luxury-transition hover:bg-muted"
            aria-label="Toggle mobile menu"
          >
            <Icon 
              name={isMobileMenuOpen ? "X" : "Menu"} 
              size={24} 
              color="var(--color-foreground)" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-1100 bg-background border-t border-border">
          <nav className="px-6 py-6 space-y-2">
            <NavigationItems mobile />
          </nav>
        </div>
      )}
    </header>
  );
};

export default AuthenticationAwareHeader;
