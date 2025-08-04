import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TripDetailsForm = ({ formData, onFormChange, onNext }) => {
  const [isReturnTrip, setIsReturnTrip] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const serviceLocations = [
    { value: 'new-york', label: 'New York, NY' },
    { value: 'los-angeles', label: 'Los Angeles, CA' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'miami', label: 'Miami, FL' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'las-vegas', label: 'Las Vegas, NV' },
    { value: 'washington-dc', label: 'Washington, DC' },
    { value: 'boston', label: 'Boston, MA' }
  ];

  const popularPickupLocations = [
    "JFK Airport - Terminal 1",
    "LaGuardia Airport - Terminal B",
    "Newark Airport - Terminal A",
    "Manhattan - Times Square",
    "Manhattan - Central Park",
    "Brooklyn - Downtown",
    "Manhattan - Wall Street",
    "Manhattan - Upper East Side"
  ];

  const popularDropoffLocations = [
    "Manhattan - Midtown",
    "Brooklyn Bridge",
    "Statue of Liberty",
    "Empire State Building",
    "One World Trade Center",
    "Madison Square Garden",
    "Lincoln Center",
    "Yankee Stadium"
  ];

  const handleInputChange = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    onFormChange(newFormData);
  };

  const handleLocationSelect = (field, location) => {
    handleInputChange(field, location);
  };

  const handleNext = () => {
    if (formData.pickupLocation && formData.dropoffLocation && formData.serviceCity) {
      onNext();
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleInputChange('pickupLocation', `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <h2 className="font-inter font-semibold text-2xl text-foreground mb-2">
                Trip Details
              </h2>
              <p className="font-inter text-muted-foreground">
                Enter your pickup and destination details for your luxury ride
              </p>
            </div>

            {/* Service City Selection */}
            <div>
              <Select
                label="Service City"
                placeholder="Select your city"
                options={serviceLocations}
                value={formData.serviceCity}
                onChange={(value) => handleInputChange('serviceCity', value)}
                required
                searchable
                className="mb-4"
              />
            </div>

            {/* Pickup Location */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-inter font-medium text-sm text-foreground">
                  Pickup Location *
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={getCurrentLocation}
                  iconName="MapPin"
                  iconPosition="left"
                >
                  Use Current Location
                </Button>
              </div>
              <Input
                type="text"
                placeholder="Enter pickup address or select from popular locations"
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
                required
              />
              
              {/* Popular Pickup Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {popularPickupLocations.slice(0, 4).map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect('pickupLocation', location)}
                    className="text-left p-2 text-sm text-muted-foreground hover:text-accent hover:bg-muted rounded-lg luxury-transition"
                  >
                    <Icon name="MapPin" size={14} className="inline mr-2" />
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Dropoff Location */}
            <div className="space-y-2">
              <label className="font-inter font-medium text-sm text-foreground">
                Destination *
              </label>
              <Input
                type="text"
                placeholder="Enter destination address"
                value={formData.dropoffLocation}
                onChange={(e) => handleInputChange('dropoffLocation', e.target.value)}
                required
              />
              
              {/* Popular Dropoff Locations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {popularDropoffLocations.slice(0, 4).map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect('dropoffLocation', location)}
                    className="text-left p-2 text-sm text-muted-foreground hover:text-accent hover:bg-muted rounded-lg luxury-transition"
                  >
                    <Icon name="Navigation" size={14} className="inline mr-2" />
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Type Options */}
            <div className="space-y-4">
              <Checkbox
                label="Return Trip"
                description="Book a round trip with return journey"
                checked={isReturnTrip}
                onChange={(e) => setIsReturnTrip(e.target.checked)}
              />

              <Checkbox
                label="Airport Transfer"
                description="This is an airport pickup or drop-off"
                checked={formData.isAirportTransfer}
                onChange={(e) => handleInputChange('isAirportTransfer', e.target.checked)}
              />

              {formData.isAirportTransfer && (
                <Input
                  label="Flight Number (Optional)"
                  type="text"
                  placeholder="e.g., AA1234"
                  value={formData.flightNumber}
                  onChange={(e) => handleInputChange('flightNumber', e.target.value)}
                  description="For flight tracking and schedule adjustments"
                />
              )}
            </div>

            {/* Special Requirements */}
            <div>
              <label className="font-inter font-medium text-sm text-foreground mb-2 block">
                Special Requirements (Optional)
              </label>
              <textarea
                className="w-full p-3 border border-border rounded-lg font-inter text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent luxury-transition"
                rows="3"
                placeholder="Any special requests, accessibility needs, or additional stops..."
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowMap(!showMap)}
                iconName="Map"
                iconPosition="left"
                className="sm:w-auto"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </Button>
              
              <Button
                variant="default"
                onClick={handleNext}
                disabled={!formData.pickupLocation || !formData.dropoffLocation || !formData.serviceCity}
                iconName="ArrowRight"
                iconPosition="right"
                className="sm:flex-1"
              >
                Continue to Date & Time
              </Button>
            </div>
          </div>

          {/* Map Section */}
          <div className={`${showMap ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-muted rounded-lg overflow-hidden h-96 lg:h-full min-h-[400px]">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Service Area Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=40.7128,-74.0060&z=11&output=embed"
                className="border-0"
              />
            </div>
            
            {/* Map Legend */}
            <div className="mt-4 p-4 bg-card border border-border rounded-lg">
              <h4 className="font-inter font-medium text-sm text-foreground mb-3">
                Service Coverage
              </h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
                  <span className="font-inter text-sm text-muted-foreground">
                    Premium Service Area
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
                  <span className="font-inter text-sm text-muted-foreground">
                    Extended Service Area
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                  <span className="font-inter text-sm text-muted-foreground">
                    Airport Zones
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsForm;
