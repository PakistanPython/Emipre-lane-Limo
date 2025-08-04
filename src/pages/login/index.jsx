import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useUser } from '../../contexts/UserContext';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import LoginFooter from './components/LoginFooter';
import Image from '../../components/AppImage';
import api from '../../services/api'; // Import the API service

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate();
  const { login } = useUser();
  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/customer-dashboard');
    }
  }, [navigate]);

  const handleLoginSubmit = async (formData) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data && response.data.token) {
        login(response.data.user, response.data.token);
        const redirectPath = localStorage.getItem('redirectAfterLogin');
        if (redirectPath) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirectPath);
        } else {
          navigate('/customer-dashboard');
        }
      } else {
        setError('Login failed: Invalid response from server.');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (userData) => {
    // This part would typically involve backend integration for social login
    // For now, we'll use the data from the social provider
    console.log('Social login data:', userData);
    
    // Use the login function from UserContext to set the user state
    login(userData, userData.credential);

    const redirectPath = localStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
      localStorage.removeItem('redirectAfterLogin');
      navigate(redirectPath);
    } else {
      navigate('/customer-dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign In - Empire Lane Limo | Premium Transportation Services</title>
        <meta name="description" content="Sign in to your Empire Lane Limo account to access premium chauffeur services, manage bookings, and enjoy luxury transportation." />
        <meta name="keywords" content="login, sign in, Empire Lane Limo, premium transportation, chauffeur service" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <AuthenticationAwareHeader />
        
        <main className="pt-20">
          <div className="min-h-[calc(100vh-5rem)] flex">
            {/* Left Side - Login Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
              <div className="w-full max-w-md space-y-8">
                <LoginHeader />
                
                <div className="bg-card border border-border rounded-xl p-8 luxury-shadow">
                  {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                  <LoginForm 
                    onSubmit={handleLoginSubmit}
                    loading={loading}
                  />
                  
                  <div className="mt-6">
                    <SocialLogin onSocialLogin={handleSocialLogin} />
                  </div>
                </div>
                
                <LoginFooter />
              </div>
            </div>

            {/* Right Side - Hero Image (Desktop Only) */}
            <div className="hidden lg:flex flex-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-secondary/90 z-10" />
              <Image
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Luxury limousine interior"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 z-20 flex items-center justify-center p-12">
                <div className="text-center text-white space-y-6">
                  <h2 className="text-4xl font-inter font-bold leading-tight">
                    Experience Luxury
                    <br />
                    Transportation
                  </h2>
                  <p className="text-xl font-inter font-light opacity-90 max-w-md">
                    Premium chauffeur services for discerning clients who value excellence, comfort, and reliability.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-8 mt-12">
                    <div className="text-center">
                      <div className="text-2xl font-inter font-bold text-accent">24/7</div>
                      <div className="text-sm font-inter opacity-80">Available</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-inter font-bold text-accent">500+</div>
                      <div className="text-sm font-inter opacity-80">Happy Clients</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-inter font-bold text-accent">5★</div>
                      <div className="text-sm font-inter opacity-80">Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LoginPage;
