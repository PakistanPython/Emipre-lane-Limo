import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="flex items-center justify-center space-x-1 text-sm font-inter">
        <span className="text-muted-foreground">Don't have an account?</span>
        <Link 
          to="/register" 
          className="text-accent hover:text-accent/80 luxury-transition font-medium"
        >
          Create Account
        </Link>
      </div>

      <div className="pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground font-inter">
          By signing in, you agree to our{' '}
          <Link to="/terms" className="text-accent hover:text-accent/80 luxury-transition">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link to="/privacy" className="text-accent hover:text-accent/80 luxury-transition">
            Privacy Policy
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground font-inter">
        <span>© {new Date().getFullYear()} Empire Lane Limo</span>
        <span>•</span>
        <span>Premium Transportation Services</span>
      </div>
    </div>
  );
};

export default LoginFooter;