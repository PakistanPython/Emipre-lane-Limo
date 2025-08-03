import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DateTimeSelector = ({ formData, onFormChange, onNext, onBack }) => {
  const [bookingType, setBookingType] = useState('point-to-point');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const timeSlots = [
    { value: '06:00', label: '6:00 AM' },
    { value: '06:30', label: '6:30 AM' },
    { value: '07:00', label: '7:00 AM' },
    { value: '07:30', label: '7:30 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '08:30', label: '8:30 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '09:30', label: '9:30 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '13:30', label: '1:30 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '14:30', label: '2:30 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '15:30', label: '3:30 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '16:30', label: '4:30 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '17:30', label: '5:30 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '18:30', label: '6:30 PM' },
    { value: '19:00', label: '7:00 PM' },
    { value: '19:30', label: '7:30 PM' },
    { value: '20:00', label: '8:00 PM' },
    { value: '20:30', label: '8:30 PM' },
    { value: '21:00', label: '9:00 PM' },
    { value: '21:30', label: '9:30 PM' },
    { value: '22:00', label: '10:00 PM' },
    { value: '22:30', label: '10:30 PM' },
    { value: '23:00', label: '11:00 PM' },
    { value: '23:30', label: '11:30 PM' }
  ];

  const durationOptions = [
    { value: '1', label: '1 Hour' },
    { value: '2', label: '2 Hours' },
    { value: '3', label: '3 Hours' },
    { value: '4', label: '4 Hours' },
    { value: '6', label: '6 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '12', label: '12 Hours' }
  ];

  const handleInputChange = (field, value) => {
    onFormChange({
      ...formData,
      [field]: value
    });
  };

  const handleBookingTypeChange = (type) => {
    setBookingType(type);
    handleInputChange('bookingType', type);
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      handleInputChange('pickupDate', selectedDate);
      handleInputChange('pickupTime', selectedTime);
      onNext();
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90); // 90 days from today
    return maxDate.toISOString().split('T')[0];
  };

  const quickDateOptions = [
    { label: 'Today', value: new Date().toISOString().split('T')[0] },
    { label: 'Tomorrow', value: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
    { 
      label: 'Day After Tomorrow', 
      value: new Date(Date.now() + 172800000).toISOString().split('T')[0] 
    }
  ];

  return (
    <div className="bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-inter font-semibold text-2xl text-foreground mb-2">
              Date & Time Selection
            </h2>
            <p className="font-inter text-muted-foreground">
              Choose your preferred pickup date and time
            </p>
          </div>

          {/* Booking Type Toggle */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-inter font-medium text-lg text-foreground mb-4">
              Booking Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleBookingTypeChange('point-to-point')}
                className={`
                  p-4 rounded-lg border-2 luxury-transition text-left
                  ${bookingType === 'point-to-point' ?'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50'
                  }
                `}
              >
                <div className="flex items-center mb-2">
                  <Icon name="Navigation" size={20} className="mr-2" />
                  <span className="font-inter font-medium">Point to Point</span>
                </div>
                <p className="font-inter text-sm text-muted-foreground">
                  Direct transfer from pickup to destination
                </p>
              </button>

              <button
                onClick={() => handleBookingTypeChange('hourly')}
                className={`
                  p-4 rounded-lg border-2 luxury-transition text-left
                  ${bookingType === 'hourly' ?'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50'
                  }
                `}
              >
                <div className="flex items-center mb-2">
                  <Icon name="Clock" size={20} className="mr-2" />
                  <span className="font-inter font-medium">Hourly Service</span>
                </div>
                <p className="font-inter text-sm text-muted-foreground">
                  Chauffeur service for a specific duration
                </p>
              </button>
            </div>
          </div>

          {/* Date Selection */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-inter font-medium text-lg text-foreground mb-4">
              Select Date
            </h3>
            
            {/* Quick Date Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {quickDateOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedDate(option.value)}
                  className={`
                    p-3 rounded-lg border luxury-transition text-center
                    ${selectedDate === option.value 
                      ? 'border-accent bg-accent text-accent-foreground' 
                      : 'border-border hover:border-accent/50 hover:bg-muted'
                    }
                  `}
                >
                  <span className="font-inter font-medium text-sm">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Date Input */}
            <Input
              label="Or choose a specific date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={getMinDate()}
              max={getMaxDate()}
              required
            />
          </div>

          {/* Time Selection */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-inter font-medium text-lg text-foreground mb-4">
              Select Time
            </h3>
            
            <Select
              label="Pickup Time"
              placeholder="Choose your preferred time"
              options={timeSlots}
              value={selectedTime}
              onChange={setSelectedTime}
              required
              searchable
            />

            {bookingType === 'hourly' && (
              <div className="mt-4">
                <Select
                  label="Service Duration"
                  placeholder="How long do you need the service?"
                  options={durationOptions}
                  value={formData.serviceDuration}
                  onChange={(value) => handleInputChange('serviceDuration', value)}
                  required
                />
              </div>
            )}
          </div>

          {/* Additional Options */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-inter font-medium text-lg text-foreground mb-4">
              Additional Options
            </h3>
            
            <div className="space-y-4">
              <Checkbox
                label="Meet & Greet Service"
                description="Chauffeur will wait with a name sign (+$25)"
                checked={formData.meetAndGreet}
                onChange={(e) => handleInputChange('meetAndGreet', e.target.checked)}
              />

              <Checkbox
                label="Flight Monitoring"
                description="Automatic adjustment for flight delays (Airport transfers only)"
                checked={formData.flightMonitoring}
                onChange={(e) => handleInputChange('flightMonitoring', e.target.checked)}
                disabled={!formData.isAirportTransfer}
              />

              <Checkbox
                label="Wait Time Included"
                description="15 minutes complimentary wait time"
                checked={formData.waitTimeIncluded}
                onChange={(e) => handleInputChange('waitTimeIncluded', e.target.checked)}
              />
            </div>
          </div>

          {/* Availability Notice */}
          {selectedDate && selectedTime && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center">
                <Icon name="CheckCircle" size={20} className="text-success mr-2" />
                <span className="font-inter font-medium text-success">
                  Available for {new Date(selectedDate).toLocaleDateString()} at {timeSlots.find(t => t.value === selectedTime)?.label}
                </span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onBack}
              iconName="ArrowLeft"
              iconPosition="left"
              className="sm:w-auto"
            >
              Back to Trip Details
            </Button>
            
            <Button
              variant="default"
              onClick={handleNext}
              disabled={!selectedDate || !selectedTime}
              iconName="ArrowRight"
              iconPosition="right"
              className="sm:flex-1"
            >
              Continue to Vehicle Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelector;