import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../contexts/UserContext';
import { createBooking } from '../../../services/api';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BookingSummary = ({ formData, onFormChange, onBack }) => {
  const { user } = useUser();
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialInstructions: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setPassengerInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        specialInstructions: ''
      });
    }
  }, [user]);

  const calculateTotalPrice = () => {
    let total = formData.selectedVehicle?.basePrice || 0;
    
    // Add-on services
    if (formData.meetAndGreet) total += 25;
    if (formData.flightMonitoring) total += 15;
    
    // Distance/time multiplier (mock calculation)
    const distanceMultiplier = 1.2; // Mock 20% increase for distance
    total *= distanceMultiplier;
    
    // Taxes and fees
    const taxes = total * 0.08; // 8% tax
    const serviceFee = 15;
    
    return {
      subtotal: total,
      taxes: taxes,
      serviceFee: serviceFee,
      total: total + taxes + serviceFee
    };
  };

  const pricing = calculateTotalPrice();

  const handlePassengerInfoChange = (field, value) => {
    setPassengerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBookingSubmit = async () => {
    if (!agreedToTerms || !passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email || !passengerInfo.phone) {
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        vehicleId: formData.selectedVehicle.id,
        bookingType: formData.bookingType,
        serviceCity: formData.serviceCity,
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        pickupDate: formData.pickupDate,
        pickupTime: formData.pickupTime,
        estimatedPrice: pricing.total,
        isAirportTransfer: formData.isAirportTransfer,
        flightNumber: formData.flightNumber,
        specialRequirements: passengerInfo.specialInstructions,
        passengerCount: 1, // Assuming 1 passenger for now
        meetAndGreet: formData.meetAndGreet,
        flightMonitoring: formData.flightMonitoring,
      };

      const newBooking = await createBooking(bookingPayload);

      // Store booking data in localStorage (optional, for confirmation page)
      localStorage.setItem('currentBooking', JSON.stringify(newBooking));

      // Navigate to confirmation page
      navigate(`/booking-confirmation?bookingId=${newBooking.id}`);
    } catch (error) {
      console.error('Booking submission error:', error);
      // Handle error (e.g., show a notification to the user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <div className="space-y-6">
            <div>
              <h2 className="font-inter font-semibold text-2xl text-foreground mb-2">
                Booking Summary
              </h2>
              <p className="font-inter text-muted-foreground">
                Review your booking details and complete your reservation
              </p>
            </div>

            {/* Trip Details */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-inter font-semibold text-lg text-foreground mb-4">
                Trip Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Icon name="MapPin" size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-medium text-foreground">Pickup Location</p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {formData.pickupLocation}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="Navigation" size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-medium text-foreground">Destination</p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {formData.dropoffLocation}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Icon name="Calendar" size={20} className="text-accent mr-3 mt-1" />
                  <div>
                    <p className="font-inter font-medium text-foreground">Date & Time</p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {formatDate(formData.pickupDate)} at {formatTime(formData.pickupTime)}
                    </p>
                  </div>
                </div>

                {formData.bookingType === 'hourly' && (
                  <div className="flex items-start">
                    <Icon name="Clock" size={20} className="text-accent mr-3 mt-1" />
                    <div>
                      <p className="font-inter font-medium text-foreground">Service Duration</p>
                      <p className="font-inter text-sm text-muted-foreground">
                        {formData.serviceDuration} hours
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Vehicle */}
            {formData.selectedVehicle && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-inter font-semibold text-lg text-foreground mb-4">
                  Selected Vehicle
                </h3>
                
                <div className="flex items-center space-x-4">
                  <Image
                    src={formData.selectedVehicle.image}
                    alt={formData.selectedVehicle.name}
                    className="w-20 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-inter font-medium text-foreground">
                      {formData.selectedVehicle.name}
                    </h4>
                    <p className="font-inter text-sm text-muted-foreground">
                      {formData.selectedVehicle.category}
                    </p>
                    <div className="flex items-center mt-1 space-x-4">
                      <span className="font-inter text-xs text-muted-foreground">
                        <Icon name="Users" size={12} className="inline mr-1" />
                        {formData.selectedVehicle.capacity}
                      </span>
                      <span className="font-inter text-xs text-muted-foreground">
                        <Icon name="Luggage" size={12} className="inline mr-1" />
                        {formData.selectedVehicle.luggage}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional Services */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-inter font-semibold text-lg text-foreground mb-4">
                Additional Services
              </h3>
              
              <div className="space-y-2">
                {formData.meetAndGreet && (
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm text-foreground">Meet & Greet Service</span>
                    <span className="font-inter text-sm text-accent">+$25</span>
                  </div>
                )}
                {formData.flightMonitoring && (
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm text-foreground">Flight Monitoring</span>
                    <span className="font-inter text-sm text-accent">+$15</span>
                  </div>
                )}
                {formData.waitTimeIncluded && (
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-sm text-foreground">15 min Wait Time</span>
                    <span className="font-inter text-sm text-success">Included</span>
                  </div>
                )}
                {!formData.meetAndGreet && !formData.flightMonitoring && !formData.waitTimeIncluded && (
                  <p className="font-inter text-sm text-muted-foreground">No additional services selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Passenger Information & Payment */}
          <div className="space-y-6">
            {/* Passenger Information */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-inter font-semibold text-lg text-foreground mb-4">
                Passenger Information
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    value={passengerInfo.firstName}
                    onChange={(e) => handlePassengerInfoChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    value={passengerInfo.lastName}
                    onChange={(e) => handlePassengerInfoChange('lastName', e.target.value)}
                    required
                  />
                </div>
                
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={passengerInfo.email}
                  onChange={(e) => handlePassengerInfoChange('email', e.target.value)}
                  required
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                  value={passengerInfo.phone}
                  onChange={(e) => handlePassengerInfoChange('phone', e.target.value)}
                  required
                />
                
                <div>
                  <label className="font-inter font-medium text-sm text-foreground mb-2 block">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 border border-border rounded-lg font-inter text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent luxury-transition"
                    rows="3"
                    placeholder="Any special requests or instructions for your chauffeur..."
                    value={passengerInfo.specialInstructions}
                    onChange={(e) => handlePassengerInfoChange('specialInstructions', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-inter font-semibold text-lg text-foreground mb-4">
                Pricing Breakdown
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-foreground">Base Rate</span>
                  <span className="font-inter text-foreground">${pricing.subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-inter text-foreground">Taxes & Fees</span>
                  <span className="font-inter text-foreground">${pricing.taxes.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-inter text-foreground">Service Fee</span>
                  <span className="font-inter text-foreground">${pricing.serviceFee.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-border pt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-inter font-semibold text-lg text-foreground">Total</span>
                    <span className="font-inter font-bold text-xl text-accent">${pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                description="By checking this box, you agree to our terms and conditions"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                onClick={onBack}
                iconName="ArrowLeft"
                iconPosition="left"
                className="sm:w-auto"
                disabled={isSubmitting}
              >
                Back to Vehicles
              </Button>
              
              <Button
                variant="default"
                onClick={handleBookingSubmit}
                disabled={!agreedToTerms || !passengerInfo.firstName || !passengerInfo.lastName || !passengerInfo.email || !passengerInfo.phone || isSubmitting}
                loading={isSubmitting}
                iconName="CreditCard"
                iconPosition="left"
                className="sm:flex-1"
              >
                {isSubmitting ? 'Processing...' : 'Complete Booking'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
