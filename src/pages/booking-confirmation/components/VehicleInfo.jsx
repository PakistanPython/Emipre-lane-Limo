import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VehicleInfo = ({ vehicleData, driverData }) => {
  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
      <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Car" size={20} className="mr-2 text-accent" />
        Vehicle & Driver Information
      </h2>

      <div className="space-y-6">
        {/* Vehicle Details */}
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-48 h-32 bg-muted rounded-lg overflow-hidden">
            <Image
              src={vehicleData.image}
              alt={`${vehicleData.make} ${vehicleData.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-inter font-semibold text-foreground">
                {vehicleData.make} {vehicleData.model}
              </h3>
              <p className="text-muted-foreground font-inter">
                {vehicleData.category} • {vehicleData.year}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter text-foreground">
                  {vehicleData.capacity} passengers
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter text-foreground">
                  {vehicleData.luggage} bags
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Wifi" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter text-foreground">
                  Free WiFi
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Snowflake" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter text-foreground">
                  Climate Control
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        {driverData ? (
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-inter font-semibold text-foreground mb-4">
              Your Chauffeur
            </h3>
            
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-muted rounded-full overflow-hidden">
                <Image
                  src={driverData.photo}
                  alt={driverData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-inter font-semibold text-foreground">
                  {driverData.name}
                </h4>
                <div className="flex items-center space-x-4 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-accent fill-current" />
                    <span className="text-sm font-inter text-foreground">
                      {driverData.rating}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground font-inter">
                    {driverData.experience} years experience
                  </div>
                </div>
                <div className="text-sm text-muted-foreground font-inter mt-1">
                  License: {driverData.license}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center luxury-transition hover:bg-success/20">
                  <Icon name="Phone" size={16} className="text-success" />
                </button>
                <button className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center luxury-transition hover:bg-primary/20">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-border pt-6">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <Icon name="Clock" size={24} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-inter text-muted-foreground">
                Driver will be assigned 30 minutes before pickup
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInfo;