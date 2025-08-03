import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VehicleSelector = ({ formData, onFormChange, onNext, onBack }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const vehicleFleet = [
    {
      id: 'sedan-luxury',
      category: 'Luxury Sedan',
      name: 'Mercedes-Benz S-Class',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
      capacity: '3 passengers',
      luggage: '2 large bags',
      features: ['Leather Interior', 'Climate Control', 'WiFi', 'Phone Charger'],
      basePrice: 120,
      description: 'Perfect for business meetings and airport transfers with premium comfort.',
      amenities: ['Premium Sound System', 'Tinted Windows', 'Bottled Water', 'Newspapers']
    },
    {
      id: 'suv-premium',
      category: 'Premium SUV',
      name: 'Cadillac Escalade',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      capacity: '6 passengers',
      luggage: '4 large bags',
      features: ['Spacious Interior', 'Entertainment System', 'WiFi', 'Refreshments'],
      basePrice: 180,
      description: 'Ideal for group travel and family trips with maximum comfort and space.',
      amenities: ['Captain Chairs', 'Dual Climate Zones', 'Premium Audio', 'Privacy Partition']
    },
    {
      id: 'limousine-stretch',
      category: 'Stretch Limousine',
      name: 'Lincoln Stretch Limousine',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      capacity: '8 passengers',
      luggage: '3 large bags',
      features: ['Bar Service', 'Entertainment System', 'Mood Lighting', 'Privacy Partition'],
      basePrice: 350,
      description: 'Ultimate luxury experience for special occasions and celebrations.',
      amenities: ['Full Bar', 'Surround Sound', 'LED Lighting', 'Champagne Service']
    },
    {
      id: 'van-executive',
      category: 'Executive Van',
      name: 'Mercedes-Benz Sprinter',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      capacity: '12 passengers',
      luggage: '8 large bags',
      features: ['Group Seating', 'WiFi', 'Power Outlets', 'Climate Control'],
      basePrice: 220,
      description: 'Perfect for corporate groups and large family gatherings.',
      amenities: ['Conference Setup', 'USB Charging', 'Reading Lights', 'Refreshment Center']
    },
    {
      id: 'coupe-luxury',
      category: 'Luxury Coupe',
      name: 'BMW 7 Series',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      capacity: '3 passengers',
      luggage: '2 large bags',
      features: ['Sport Package', 'Premium Audio', 'Heated Seats', 'Sunroof'],
      basePrice: 140,
      description: 'Sophisticated choice for discerning clients who appreciate performance.',
      amenities: ['Massage Seats', 'Ambient Lighting', 'Premium Materials', 'Advanced Safety']
    },
    {
      id: 'convertible-luxury',
      category: 'Luxury Convertible',
      name: 'Mercedes-Benz S-Class Convertible',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop',
      capacity: '2 passengers',
      luggage: '1 large bag',
      features: ['Convertible Top', 'Premium Sound', 'Heated Seats', 'Wind Deflector'],
      basePrice: 280,
      description: 'Open-air luxury for scenic drives and special romantic occasions.',
      amenities: ['Airscarf System', 'Premium Leather', 'Harman Kardon Audio', 'Adaptive Suspension']
    }
  ];

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    onFormChange({
      ...formData,
      selectedVehicle: vehicle,
      estimatedPrice: vehicle.basePrice
    });
  };

  const handleNext = () => {
    if (selectedVehicle) {
      onNext();
    }
  };

  const VehicleCard = ({ vehicle, isSelected }) => (
    <div 
      className={`
        bg-card border-2 rounded-lg overflow-hidden luxury-transition cursor-pointer
        ${isSelected ? 'border-accent luxury-shadow-lg' : 'border-border hover:border-accent/50 hover:luxury-shadow'}
      `}
      onClick={() => handleVehicleSelect(vehicle)}
    >
      <div className="relative">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full font-inter font-medium text-sm">
            {vehicle.category}
          </span>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="bg-success text-success-foreground rounded-full p-2">
              <Icon name="Check" size={16} />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-inter font-semibold text-lg text-foreground">
            {vehicle.name}
          </h3>
          <div className="text-right">
            <span className="font-inter font-bold text-xl text-accent">
              ${vehicle.basePrice}
            </span>
            <p className="font-inter text-sm text-muted-foreground">
              base rate
            </p>
          </div>
        </div>

        <p className="font-inter text-sm text-muted-foreground mb-4">
          {vehicle.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Icon name="Users" size={16} className="text-accent mr-2" />
            <span className="font-inter text-sm text-foreground">
              {vehicle.capacity}
            </span>
          </div>
          <div className="flex items-center">
            <Icon name="Luggage" size={16} className="text-accent mr-2" />
            <span className="font-inter text-sm text-foreground">
              {vehicle.luggage}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-inter font-medium text-sm text-foreground">
            Key Features:
          </h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((feature, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs font-inter"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="font-inter font-medium text-sm text-foreground mb-2">
            Premium Amenities:
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {vehicle.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                <Icon name="Check" size={12} className="text-success mr-1" />
                <span className="font-inter text-xs text-muted-foreground">
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-inter font-semibold text-2xl text-foreground mb-2">
                Select Your Vehicle
              </h2>
              <p className="font-inter text-muted-foreground">
                Choose from our premium fleet of luxury vehicles
              </p>
            </div>

            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                iconName="Grid3X3"
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                iconName="List"
              >
                List
              </Button>
            </div>
          </div>

          {/* Vehicle Filter Options */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-inter font-medium text-sm">
                All Vehicles
              </button>
              <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg font-inter font-medium text-sm luxury-transition">
                Sedans
              </button>
              <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg font-inter font-medium text-sm luxury-transition">
                SUVs
              </button>
              <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg font-inter font-medium text-sm luxury-transition">
                Limousines
              </button>
              <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg font-inter font-medium text-sm luxury-transition">
                Vans
              </button>
            </div>
          </div>

          {/* Vehicle Grid */}
          <div className={`
            ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-6'
            }
          `}>
            {vehicleFleet.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicle?.id === vehicle.id}
              />
            ))}
          </div>

          {/* Selected Vehicle Summary */}
          {selectedVehicle && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-inter font-semibold text-lg text-foreground">
                    Selected: {selectedVehicle.name}
                  </h3>
                  <p className="font-inter text-muted-foreground">
                    {selectedVehicle.category} • {selectedVehicle.capacity} • {selectedVehicle.luggage}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-inter font-bold text-2xl text-accent">
                    ${selectedVehicle.basePrice}
                  </span>
                  <p className="font-inter text-sm text-muted-foreground">
                    base rate
                  </p>
                </div>
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
              Back to Date & Time
            </Button>
            
            <Button
              variant="default"
              onClick={handleNext}
              disabled={!selectedVehicle}
              iconName="ArrowRight"
              iconPosition="right"
              className="sm:flex-1"
            >
              Continue to Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSelector;