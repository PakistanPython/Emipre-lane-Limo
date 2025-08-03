import React from 'react';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import HeroSection from './components/HeroSection';
import ServiceCategories from './components/ServiceCategories';
import CityCoverage from './components/CityCoverage';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import TrustSignals from './components/TrustSignals';
import Footer from './components/Footer';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Global Navigation Header */}
      <AuthenticationAwareHeader />
      
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section with Booking Form */}
        <HeroSection />
        
        {/* Service Categories Showcase */}
        <ServiceCategories />
        
        {/* City Coverage Map */}
        <CityCoverage />
        
        {/* Customer Testimonials */}
        <TestimonialsCarousel />
        
        {/* Trust Signals & Certifications */}
        <TrustSignals />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Global CTA Button */}
      <GlobalCTAButton variant="floating" showOnRoutes={['/homepage']} />
    </div>
  );
};

export default Homepage;