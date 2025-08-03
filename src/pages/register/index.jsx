import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationProgress from './components/RegistrationProgress';
import RegistrationBenefits from './components/RegistrationBenefits';
import RegistrationTestimonials from './components/RegistrationTestimonials';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate('/customer-dashboard');
    }
  }, [navigate]);

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        preferredVehicle: formData.preferredVehicle,
        notifications: formData.notifications,
        createdAt: new Date().toISOString()
      };

      // Store authentication data
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userData', JSON.stringify(mockUser));

      // Check for redirect after login
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      if (redirectPath) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
      } else {
        navigate('/customer-dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationAwareHeader />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Registration Form */}
            <div className="lg:col-span-7">
              <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-3xl lg:text-4xl font-inter font-bold text-foreground mb-4">
                    Create Your Account
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Join Empire Lane Limo for premium transportation experiences
                  </p>
                </div>

                {/* Registration Card */}
                <div className="bg-card border border-border rounded-xl luxury-shadow-lg p-6 lg:p-8">
                  <RegistrationProgress currentStep={currentStep} />
                  <RegistrationForm 
                    onSubmit={handleRegistration}
                    isLoading={isLoading}
                  />
                </div>

                {/* Login Link */}
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="font-medium text-accent hover:text-accent/80 luxury-transition"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex items-center justify-center space-x-8 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} color="var(--color-success)" />
                      <span>256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Lock" size={16} color="var(--color-success)" />
                      <span>GDPR Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Award" size={16} color="var(--color-success)" />
                      <span>BBB A+ Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-8">
                {/* Benefits Section */}
                <RegistrationBenefits />

                {/* Testimonials Section */}
                <div className="hidden lg:block">
                  <RegistrationTestimonials />
                </div>

                {/* Quick Stats */}
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <h3 className="text-lg font-inter font-semibold mb-4">
                    Why Choose Empire Lane Limo?
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">10K+</div>
                      <div className="text-xs opacity-90">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">99.9%</div>
                      <div className="text-xs opacity-90">On-Time Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                      <div className="text-xs opacity-90">Customer Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent mb-1">50+</div>
                      <div className="text-xs opacity-90">Cities Served</div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-muted/30 rounded-xl p-6 text-center">
                  <Icon name="Phone" size={24} color="var(--color-accent)" className="mx-auto mb-3" />
                  <h4 className="font-inter font-semibold text-foreground mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our registration support team is available 24/7
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Live Chat Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Testimonials */}
      <div className="lg:hidden bg-muted/30 py-12">
        <div className="max-w-2xl mx-auto px-6">
          <RegistrationTestimonials />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm opacity-90">
              © {new Date().getFullYear()} Empire Lane Limo. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-6 mt-4 text-xs opacity-75">
              <Link to="/terms" className="hover:opacity-100 luxury-transition">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:opacity-100 luxury-transition">
                Privacy Policy
              </Link>
              <Link to="/support" className="hover:opacity-100 luxury-transition">
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;