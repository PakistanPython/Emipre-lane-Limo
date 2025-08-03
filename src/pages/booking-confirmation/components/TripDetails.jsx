import React from 'react';
import Icon from '../../../components/AppIcon';


const TripDetails = ({ tripData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
      <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2 text-accent" />
        Trip Details
      </h2>

      <div className="space-y-6">
        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-inter">Date</div>
              <div className="font-inter font-medium text-foreground">
                {formatDate(tripData.date)}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-inter">Pickup Time</div>
              <div className="font-inter font-medium text-foreground">
                {formatTime(tripData.time)}
              </div>
            </div>
          </div>
        </div>

        {/* Route Information */}
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <div className="w-0.5 h-8 bg-border"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground font-inter mb-1">Pickup Location</div>
              <div className="font-inter font-medium text-foreground">
                {tripData.pickupLocation}
              </div>
              {tripData.pickupAddress && (
                <div className="text-sm text-muted-foreground mt-1">
                  {tripData.pickupAddress}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center mt-1">
              <div className="w-3 h-3 bg-error rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-muted-foreground font-inter mb-1">Destination</div>
              <div className="font-inter font-medium text-foreground">
                {tripData.destination}
              </div>
              {tripData.destinationAddress && (
                <div className="text-sm text-muted-foreground mt-1">
                  {tripData.destinationAddress}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trip Type and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Route" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-inter">Trip Type</div>
              <div className="font-inter font-medium text-foreground capitalize">
                {tripData.tripType || 'Point to Point'}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Timer" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground font-inter">Estimated Duration</div>
              <div className="font-inter font-medium text-foreground">
                {tripData.estimatedDuration || '45 minutes'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;