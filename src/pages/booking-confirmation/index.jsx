import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import BookingHeader from './components/BookingHeader';
import TripDetails from './components/TripDetails';
import VehicleInfo from './components/VehicleInfo';
import PricingBreakdown from './components/PricingBreakdown';
import BookingActions from './components/BookingActions';
import NextSteps from './components/NextSteps';
import RouteMap from './components/RouteMap';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Get booking data from location state or localStorage
    const bookingInfo = location.state?.bookingData || JSON.parse(localStorage.getItem('latestBooking') || 'null');
    
    if (!bookingInfo) {
      // If no booking data, redirect to booking system
      navigate('/vehicle-booking-system');
      return;
    }

    setBookingData(bookingInfo);
    setLoading(false);
  }, [location.state, navigate]);

  // Mock booking data for demonstration
  const mockBookingData = {
    id: 'EL-2025-001234',
    reference: 'EL-2025-001234',
    status: 'confirmed',
    date: '2025-01-28',
    time: '14:30',
    pickupLocation: 'John F. Kennedy International Airport',
    pickupAddress: 'Terminal 4, JFK Airport, Queens, NY 11430',
    destination: 'The Plaza Hotel',
    destinationAddress: '768 5th Ave, New York, NY 10019',
    tripType: 'point to point',
    estimatedDuration: '45 minutes',
    vehicle: {
      id: 'v001',
      make: 'Mercedes-Benz',
      model: 'S-Class',
      year: '2024',
      category: 'Luxury Sedan',
      capacity: 3,
      luggage: 2,
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop'
    },
    driver: {
      id: 'd001',
      name: 'James Wilson',
      photo: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.9,
      experience: 8,
      license: 'NYC-TLC-789456'
    },
    pricing: {
      baseFare: 120.00,
      distanceFee: 35.50,
      timeFee: 0,
      surcharge: 15.00,
      discount: 0,
      tax: 17.05,
      gratuity: 25.50,
      gratuityPercent: 15,
      total: 213.05,
      distance: 14.2,
      duration: '45 minutes'
    },
    payment: {
      type: 'card',
      method: 'Visa Credit Card',
      brand: 'Visa',
      lastFour: '4242',
      status: 'paid'
    },
    pickupCoords: { lat: 40.6413, lng: -73.7781 },
    destinationCoords: { lat: 40.7648, lng: -73.9808 }
  };

  const currentBooking = bookingData || mockBookingData;

  const handleModifyBooking = (bookingId) => {
    navigate('/vehicle-booking-system', { 
      state: { modifyBooking: currentBooking } 
    });
  };

  const handleCancelBooking = (bookingId) => {
    // Handle cancellation logic
    localStorage.removeItem('latestBooking');
    navigate('/customer-dashboard', { 
      state: { message: 'Booking cancelled successfully' } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AuthenticationAwareHeader />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-inter">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationAwareHeader />
      
      <main className="pt-20 pb-24 lg:pb-8">
        <BookingHeader 
          bookingReference={currentBooking.reference}
          status={currentBooking.status}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Details */}
            <div className="lg:col-span-2 space-y-8">
              <TripDetails tripData={currentBooking} />
              
              <VehicleInfo 
                vehicleData={currentBooking.vehicle}
                driverData={currentBooking.driver}
              />
              
              <RouteMap
                pickupLocation={currentBooking.pickupLocation}
                destination={currentBooking.destination}
                pickupCoords={currentBooking.pickupCoords}
                destinationCoords={currentBooking.destinationCoords}
              />
            </div>

            {/* Right Column - Actions & Pricing */}
            <div className="space-y-8">
              <PricingBreakdown 
                pricingData={currentBooking.pricing}
                paymentData={currentBooking.payment}
              />
              
              <BookingActions
                bookingData={currentBooking}
                onModify={handleModifyBooking}
                onCancel={handleCancelBooking}
              />
              
              <NextSteps bookingData={currentBooking} />
            </div>
          </div>
        </div>
      </main>

      <GlobalCTAButton 
        variant="floating"
        showOnRoutes={[]}
      />
    </div>
  );
};

export default BookingConfirmation;