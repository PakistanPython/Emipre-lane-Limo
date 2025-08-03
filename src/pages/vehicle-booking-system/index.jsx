import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import BookingStepIndicator from './components/BookingStepIndicator';
import TripDetailsForm from './components/TripDetailsForm';
import DateTimeSelector from './components/DateTimeSelector';
import VehicleSelector from './components/VehicleSelector';
import BookingSummary from './components/BookingSummary';

const VehicleBookingSystem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Trip Details
    serviceCity: '',
    pickupLocation: '',
    dropoffLocation: '',
    isAirportTransfer: false,
    flightNumber: '',
    specialRequirements: '',
    
    // Date & Time
    bookingType: 'point-to-point',
    pickupDate: '',
    pickupTime: '',
    serviceDuration: '',
    meetAndGreet: false,
    flightMonitoring: false,
    waitTimeIncluded: true,
    
    // Vehicle Selection
    selectedVehicle: null,
    estimatedPrice: 0
  });

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TripDetailsForm
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <DateTimeSelector
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 3:
        return (
          <VehicleSelector
            formData={formData}
            onFormChange={handleFormChange}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
          />
        );
      case 4:
        return (
          <BookingSummary
            formData={formData}
            onFormChange={handleFormChange}
            onBack={handlePreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Book Your Luxury Ride - Empire Lane Limo</title>
        <meta 
          name="description" 
          content="Book premium chauffeur services and luxury limousines. Real-time availability, transparent pricing, and professional drivers for all your transportation needs." 
        />
        <meta name="keywords" content="luxury transportation, chauffeur service, limousine booking, premium rides, airport transfer" />
        <meta property="og:title" content="Book Your Luxury Ride - Empire Lane Limo" />
        <meta property="og:description" content="Experience premium transportation with our luxury fleet and professional chauffeurs." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/vehicle-booking-system" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <AuthenticationAwareHeader />
        
        {/* Main Content */}
        <main className="pt-20">
          {/* Booking Progress Indicator */}
          <BookingStepIndicator 
            currentStep={currentStep} 
            totalSteps={4} 
          />
          
          {/* Step Content */}
          <div className="min-h-[calc(100vh-200px)]">
            {renderCurrentStep()}
          </div>
        </main>

        {/* Mobile Sticky CTA (shown only on mobile for quick access) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-1200 bg-background border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-inter font-medium text-foreground">
                Step {currentStep} of 4
              </span>
              <div className="w-full bg-muted rounded-full h-1 mt-1">
                <div 
                  className="bg-accent h-1 rounded-full luxury-transition"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>
            {formData.selectedVehicle && (
              <div className="text-right">
                <span className="font-inter font-bold text-lg text-accent">
                  ${formData.estimatedPrice}
                </span>
                <p className="font-inter text-xs text-muted-foreground">
                  estimated
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleBookingSystem;