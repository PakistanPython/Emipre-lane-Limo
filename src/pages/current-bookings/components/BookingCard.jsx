import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCard = ({ 
  booking, 
  onModify, 
  onCancel, 
  onTrack, 
  onContactDriver 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'driver_assigned':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'en_route':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'driver_assigned':
        return 'Driver Assigned';
      case 'pending':
        return 'Pending';
      case 'en_route':
        return 'En Route';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'driver_assigned':
        return 'UserCheck';
      case 'pending':
        return 'Clock';
      case 'en_route':
        return 'Navigation';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg luxury-shadow hover:shadow-lg luxury-transition">
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          {/* Booking Info */}
          <div className="flex-1">
            {/* Status and Type */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`
                flex items-center gap-2 px-3 py-1 rounded-full text-xs font-inter font-medium border
                ${getStatusColor(booking.status)}
              `}>
                <Icon name={getStatusIcon(booking.status)} size={12} />
                {getStatusText(booking.status)}
              </span>
              <span className="text-sm text-muted-foreground font-inter">
                {booking.bookingType}
              </span>
              <span className="text-sm text-muted-foreground font-inter">
                #{booking.bookingNumber}
              </span>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-inter font-medium text-foreground">
                    {new Date(booking.pickupDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-inter">
                    {booking.pickupTime} • {booking.estimatedDuration} mins
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Car" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-inter font-medium text-foreground">
                    {booking.vehicle.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-inter">
                    ${booking.estimatedPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <div className="w-0.5 h-6 bg-border my-1"></div>
                <div className="w-3 h-3 rounded-full bg-error"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-inter uppercase tracking-wide mb-1">
                    Pickup
                  </p>
                  <p className="text-sm font-inter font-medium text-foreground">
                    {booking.pickupLocation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-inter uppercase tracking-wide mb-1">
                    Dropoff
                  </p>
                  <p className="text-sm font-inter font-medium text-foreground">
                    {booking.dropoffLocation}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Info */}
            {booking.driver && (
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg mb-4">
                <img
                  src={booking.driver.avatar}
                  alt={booking.driver.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-inter font-semibold text-foreground mb-1">
                    {booking.driver.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-warning fill-current" />
                      <span className="text-xs text-muted-foreground font-inter">
                        {booking.driver.rating}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground font-inter">
                      {booking.driver.phone}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  iconName="Phone"
                  onClick={() => onContactDriver?.(booking)}
                >
                  Call
                </Button>
              </div>
            )}

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-border pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                      Booking Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reference:</span>
                        <span className="font-medium">{booking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{booking.estimatedDuration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{booking.bookingType}</span>
                      </div>
                    </div>
                  </div>
                  
                  {booking.specialRequirements && (
                    <div>
                      <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                        Special Requirements
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.specialRequirements}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            {booking.status === 'en_route' && (
              <Button 
                variant="default" 
                size="sm" 
                iconName="Navigation" 
                iconPosition="left"
                onClick={() => onTrack?.(booking.id)}
              >
                Track Live
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Edit" 
              iconPosition="left"
              onClick={() => onModify?.(booking.id)}
              disabled={booking.status === 'en_route'}
            >
              Modify
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              iconName="X" 
              iconPosition="left"
              onClick={() => onCancel?.(booking.id)}
              disabled={booking.status === 'en_route'}
            >
              Cancel
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"} 
              iconPosition="left"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Less' : 'More'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
