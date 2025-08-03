import React from 'react';
import { Link } from 'react-router-dom';


const LoginHeader = () => {
  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-2 mb-8">
      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12L21 12M21 12L15 6M21 12L15 18" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="12" r="2" fill="var(--color-accent)"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-inter font-semibold text-xl text-primary leading-none">Empire Lane</span>
        <span className="font-inter font-light text-sm text-text-secondary leading-none">Limo</span>
      </div>
    </Link>
  );

  return (
    <div className="text-center">
      <div className="flex justify-center">
        <Logo />
      </div>
      
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-inter font-semibold text-foreground">
          Welcome Back
        </h1>
        <p className="text-muted-foreground font-inter">
          Sign in to your account to continue your premium journey
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;