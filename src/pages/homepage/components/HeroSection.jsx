import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const navigate = useNavigate();
  const [bookingForm, setBookingForm] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    vehicleType: '',
    passengers: '1'
  });
  const [showMobileForm, setShowMobileForm] = useState(false);

  const vehicleOptions = [
    { value: 'sedan', label: 'Premium Sedan' },
    { value: 'suv', label: 'Luxury SUV' },
    { value: 'limousine', label: 'Stretch Limousine' },
    { value: 'executive', label: 'Executive Van' }
  ];

  const passengerOptions = [
    { value: '1', label: '1 Passenger' },
    { value: '2', label: '2 Passengers' },
    { value: '3', label: '3 Passengers' },
    { value: '4', label: '4 Passengers' },
    { value: '5+', label: '5+ Passengers' }
  ];

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('bookingFormData', JSON.stringify(bookingForm));
    navigate('/vehicle-booking-system');
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury chauffeur service with premium vehicle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Content */}
          <div className="text-white space-y-8">
            <div className="space-y-6">
              <h1 className="font-inter font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                Premium Chauffeur
                <span className="block text-accent">Service</span>
              </h1>
              
              <p className="font-inter text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
                Experience luxury transportation with professional chauffeurs, premium vehicles, and unmatched reliability for your business and personal travel needs.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-accent" />
                <span className="font-inter text-sm text-gray-200">Fully Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="font-inter text-sm text-gray-200">24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-accent" />
                <span className="font-inter text-sm text-gray-200">5-Star Rated Service</span>
              </div>
            </div>

            {/* Mobile Book Now Button */}
            <div className="lg:hidden">
              <Button
                variant="default"
                size="lg"
                onClick={() => setShowMobileForm(true)}
                className="w-full luxury-shadow-lg"
                iconName="Car"
                iconPosition="left"
              >
                Book Your Premium Ride
              </Button>
            </div>
          </div>

          {/* Desktop Booking Form */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl luxury-shadow-lg p-8">
              <div className="mb-6">
                <h2 className="font-inter font-bold text-2xl text-primary mb-2">
                  Book Your Ride
                </h2>
                <p className="font-inter text-muted-foreground">
                  Reserve your premium transportation experience
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    label="Pickup Location"
                    type="text"
                    placeholder="Enter pickup address"
                    value={bookingForm.pickupLocation}
                    onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Drop-off Location"
                    type="text"
                    placeholder="Enter destination address"
                    value={bookingForm.dropoffLocation}
                    onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date"
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={getCurrentDate()}
                    required
                  />
                  
                  <Input
                    label="Time"
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Vehicle Type"
                    options={vehicleOptions}
                    value={bookingForm.vehicleType}
                    onChange={(value) => handleInputChange('vehicleType', value)}
                    placeholder="Select vehicle"
                    required
                  />
                  
                  <Select
                    label="Passengers"
                    options={passengerOptions}
                    value={bookingForm.passengers}
                    onChange={(value) => handleInputChange('passengers', value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full luxury-shadow"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Continue Booking
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Form Modal */}
      {showMobileForm && (
        <div className="lg:hidden fixed inset-0 z-1200 bg-black/50 flex items-end">
          <div className="w-full bg-white rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-inter font-bold text-xl text-primary">
                Book Your Ride
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileForm(false)}
                iconName="X"
              />
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <Input
                label="Pickup Location"
                type="text"
                placeholder="Enter pickup address"
                value={bookingForm.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                required
              />
              
              <Input
                label="Drop-off Location"
                type="text"
                placeholder="Enter destination address"
                value={bookingForm.dropoffLocation}
                onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  min={getCurrentDate()}
                  required
                />
                
                <Input
                  label="Time"
                  type="time"
                  value={bookingForm.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                />
              </div>

              <Select
                label="Vehicle Type"
                options={vehicleOptions}
                value={bookingForm.vehicleType}
                onChange={(value) => handleInputChange('vehicleType', value)}
                placeholder="Select vehicle"
                required
              />
              
              <Select
                label="Passengers"
                options={passengerOptions}
                value={bookingForm.passengers}
                onChange={(value) => handleInputChange('passengers', value)}
                required
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full luxury-shadow mt-6"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue Booking
              </Button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;