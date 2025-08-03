import React from 'react';
import Icon from '../../../components/AppIcon';

const RouteMap = ({ pickupLocation, destination, pickupCoords, destinationCoords }) => {
  // Mock coordinates for demonstration
  const defaultPickupCoords = pickupCoords || { lat: 40.7589, lng: -73.9851 };
  const defaultDestinationCoords = destinationCoords || { lat: 40.6892, lng: -74.0445 };
  
  // Calculate center point for map
  const centerLat = (defaultPickupCoords.lat + defaultDestinationCoords.lat) / 2;
  const centerLng = (defaultPickupCoords.lng + defaultDestinationCoords.lng) / 2;

  const mapSrc = `https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`;

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
      <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Map" size={20} className="mr-2 text-accent" />
        Route Overview
      </h2>

      <div className="space-y-4">
        {/* Map Container */}
        <div className="w-full h-64 lg:h-80 bg-muted rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Route Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            className="border-0"
          />
        </div>

        {/* Route Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-success rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-muted-foreground font-inter mb-1">
                  Pickup Location
                </div>
                <div className="font-inter font-medium text-foreground">
                  {pickupLocation}
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-3 h-3 bg-error rounded-full mt-2"></div>
              <div>
                <div className="text-sm text-muted-foreground font-inter mb-1">
                  Destination
                </div>
                <div className="font-inter font-medium text-foreground">
                  {destination}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Route" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-inter">
                  Estimated Distance
                </div>
                <div className="font-inter font-medium text-foreground">
                  12.5 miles
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={20} className="text-accent" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-inter">
                  Estimated Duration
                </div>
                <div className="font-inter font-medium text-foreground">
                  45 minutes
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Route Options */}
        <div className="border-t border-border pt-4">
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2">
              <Icon name="Navigation" size={16} className="text-accent" />
              <span className="text-sm font-inter text-foreground">
                Fastest Route
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span className="text-sm font-inter text-foreground">
                Traffic Optimized
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-2">
              <Icon name="Fuel" size={16} className="text-primary" />
              <span className="text-sm font-inter text-foreground">
                Eco-Friendly
              </span>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-inter font-medium text-foreground mb-1">
                Route Information
              </h4>
              <p className="text-sm text-muted-foreground font-inter">
                Your chauffeur will take the most efficient route based on real-time traffic conditions. 
                The estimated time may vary depending on traffic, weather, and road conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteMap;