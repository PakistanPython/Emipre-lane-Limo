import React from 'react';
import Button from '../../../components/ui/Button';


const SocialLogin = ({ onSocialLogin }) => {
  const handleGoogleLogin = () => {
    // Mock Google login
    const mockGoogleUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google'
    };
    
    localStorage.setItem('authToken', 'mock-google-token-' + Date.now());
    localStorage.setItem('userEmail', mockGoogleUser.email);
    localStorage.setItem('userName', mockGoogleUser.name);
    
    if (onSocialLogin) {
      onSocialLogin(mockGoogleUser);
    }
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
        <Button
          variant="outline"
          size="default"
          onClick={handleGoogleLogin}
          className="w-full flex-1 luxury-transition hover:bg-muted"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg width="18" height="18" viewBox="0 0 24 24" className="flex-shrink-0">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-inter font-medium">Google</span>
          </div>
        </Button>

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