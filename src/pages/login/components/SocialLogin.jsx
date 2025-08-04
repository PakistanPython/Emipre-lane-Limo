import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSocialLogin }) => {
  const handleGoogleSuccess = (credentialResponse) => {
    const googleUser = jwtDecode(credentialResponse.credential);
    
    localStorage.setItem('authToken', credentialResponse.credential);
    localStorage.setItem('userEmail', googleUser.email);
    localStorage.setItem('userName', googleUser.name);
    
    if (onSocialLogin) {
      onSocialLogin({ ...googleUser, provider: 'google' });
    }
  };

  const handleGoogleError = () => {
    console.log('Login Failed');
    alert('Google login failed. Please try again.');
  };

  const handleAppleLogin = () => {
    // Mock Apple login
    const mockAppleUser = {
      email: 'user@icloud.com',
      name: 'Apple User',
      provider: 'apple'
    };
    
    localStorage.setItem('authToken', 'mock-apple-token-' + Date.now());
    localStorage.setItem('userEmail', mockAppleUser.email);
    localStorage.setItem('userName', mockAppleUser.name);
    
    if (onSocialLogin) {
      onSocialLogin(mockAppleUser);
    }
  };

  const handleFacebookLogin = () => {
    // Placeholder for Facebook login
    alert('Facebook login functionality will be implemented here.');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-inter">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-row gap-3">
        <div className="w-full flex-1">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            width="100%"
          />
        </div>

        <Button
          variant="outline"
          size="default"
          onClick={handleAppleLogin}
          className="w-full flex-1 luxury-transition hover:bg-muted"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="font-inter font-medium">Apple</span>
          </div>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={handleFacebookLogin}
          className="w-full flex-1 luxury-transition hover:bg-muted"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0" fill="#1877F2">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3H13v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
            <span className="font-inter font-medium">Facebook</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SocialLogin;
