import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const GlobalCTAButton = ({ 
  variant = 'floating', 
  size = 'default',
  className = '',
  showOnRoutes = ['/homepage', '/customer-dashboard']
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    // Show/hide based on current route
    const shouldShow = showOnRoutes.includes(location.pathname);
    setIsVisible(shouldShow);
  }, [location.pathname, showOnRoutes]);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      // Store intended destination for after login
      localStorage.setItem('redirectAfterLogin', '/vehicle-booking-system');
      navigate('/login');
    } else {
      navigate('/vehicle-booking-system');
    }
  };

  if (!isVisible) return null;

  // Floating CTA Button (for homepage and dashboard)
  if (variant === 'floating') {
    return (
      <div className={`fixed bottom-6 right-6 z-1200 ${className}`}>
        <Button
          variant="default"
          size="lg"
          onClick={handleBookingClick}
          className="luxury-shadow-lg hover:luxury-shadow-xl luxury-spring rounded-full px-6 py-4"
          iconName="Car"
          iconPosition="left"
        >
          <span className="hidden sm:inline">Book Your Ride</span>
          <span className="sm:hidden">Book Now</span>
        </Button>
      </div>
    );
  }

  // Inline CTA Button (for headers and other components)
  if (variant === 'inline') {
    return (
      <Button
        variant="default"
        size={size}
        onClick={handleBookingClick}
        className={`luxury-transition ${className}`}
        iconName="Car"
        iconPosition="left"
      >
        Book Now
      </Button>
    );
  }

  // Sticky CTA Bar (for mobile)
  if (variant === 'sticky') {
    return (
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-1200 bg-background border-t border-border p-4 ${className}`}>
        <Button
          variant="default"
          size="lg"
          onClick={handleBookingClick}
          className="w-full luxury-shadow"
          iconName="Car"
          iconPosition="left"
        >
          Book Your Premium Ride
        </Button>
      </div>
    );
  }

  // Emergency/Quick Book Button (minimal design)
  if (variant === 'minimal') {
    return (
      <button
        onClick={handleBookingClick}
        className={`
          flex items-center justify-center w-12 h-12 bg-accent text-accent-foreground 
          rounded-full luxury-shadow hover:luxury-shadow-lg luxury-spring
          ${className}
        `}
        aria-label="Quick book"
      >
        <Icon name="Plus" size={20} />
      </button>
    );
  }

  // Hero CTA Button (for homepage hero sections)
  if (variant === 'hero') {
    return (
      <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
        <Button
          variant="default"
          size="xl"
          onClick={handleBookingClick}
          className="luxury-shadow hover:luxury-shadow-lg luxury-spring"
          iconName="Car"
          iconPosition="left"
        >
          Book Premium Ride
        </Button>
        <Button
          variant="outline"
          size="xl"
          onClick={() => navigate('/homepage#services')}
          className="luxury-transition"
          iconName="Info"
          iconPosition="left"
        >
          View Services
        </Button>
      </div>
    );
  }

  return null;
};

export default GlobalCTAButton;