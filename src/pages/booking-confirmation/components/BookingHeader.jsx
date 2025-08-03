import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingHeader = ({ bookingReference, status = 'confirmed' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'confirmed':
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          message: 'Booking Confirmed',
          description: 'Your premium ride has been successfully booked'
        };
      case 'pending':
        return {
          icon: 'Clock',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          message: 'Booking Pending',
          description: 'We are processing your booking request'
        };
      default:
        return {
          icon: 'CheckCircle',
          color: 'text-success',
          bgColor: 'bg-success/10',
          message: 'Booking Confirmed',
          description: 'Your premium ride has been successfully booked'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="bg-background border-b border-border py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${statusConfig.bgColor} rounded-full mb-4`}>
            <Icon 
              name={statusConfig.icon} 
              size={32} 
              className={statusConfig.color}
            />
          </div>
          
          <h1 className="text-3xl lg:text-4xl font-inter font-semibold text-foreground mb-2">
            {statusConfig.message}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            {statusConfig.description}
          </p>
          
          <div className="bg-muted rounded-lg p-4 inline-block">
            <div className="text-sm text-muted-foreground font-inter mb-1">
              Booking Reference
            </div>
            <div className="text-2xl font-inter font-bold text-foreground tracking-wider">
              {bookingReference}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;