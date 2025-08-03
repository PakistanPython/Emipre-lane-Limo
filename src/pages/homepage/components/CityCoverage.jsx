import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CityCoverage = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('new-york');

  const cities = [
    {
      id: 'new-york',
      name: 'New York City',
      state: 'NY',
      description: 'Premium chauffeur services across Manhattan, Brooklyn, Queens, and surrounding areas.',
      coverage: '24/7 Service',
      airports: ['JFK', 'LGA', 'EWR'],
      lat: 40.7128,
      lng: -74.0060,
      features: ['Airport Transfers', 'Corporate Travel', 'Event Transportation', 'Hourly Service']
    },
    {
      id: 'los-angeles',
      name: 'Los Angeles',
      state: 'CA',
      description: 'Luxury transportation throughout LA County, Hollywood, Beverly Hills, and beyond.',
      coverage: '24/7 Service',
      airports: ['LAX', 'BUR', 'LGB'],
      lat: 34.0522,
      lng: -118.2437,
      features: ['Red Carpet Events', 'Studio Transportation', 'Airport Service', 'Wine Tours']
    },
    {
      id: 'chicago',
      name: 'Chicago',
      state: 'IL',
      description: 'Professional chauffeur services across Chicago and surrounding metropolitan area.',
      coverage: '24/7 Service',
      airports: ['ORD', 'MDW'],
      lat: 41.8781,
      lng: -87.6298,
      features: ['Business Travel', 'Airport Transfers', 'Special Events', 'City Tours']
    },
    {
      id: 'miami',
      name: 'Miami',
      state: 'FL',
      description: 'Luxury ground transportation in Miami-Dade, Fort Lauderdale, and Palm Beach.',
      coverage: '24/7 Service',
      airports: ['MIA', 'FLL', 'PBI'],
      lat: 25.7617,
      lng: -80.1918,
      features: ['Cruise Port Service', 'Beach Events', 'Corporate Travel', 'VIP Service']
    },
    {
      id: 'san-francisco',
      name: 'San Francisco',
      state: 'CA',
      description: 'Premium transportation services throughout the Bay Area and Silicon Valley.',
      coverage: '24/7 Service',
      airports: ['SFO', 'OAK', 'SJC'],
      lat: 37.7749,
      lng: -122.4194,
      features: ['Tech Corporate Travel', 'Wine Country Tours', 'Airport Service', 'City Tours']
    },
    {
      id: 'washington-dc',
      name: 'Washington DC',
      state: 'DC',
      description: 'Professional chauffeur services in DC, Maryland, and Northern Virginia.',
      coverage: '24/7 Service',
      airports: ['DCA', 'IAD', 'BWI'],
      lat: 38.9072,
      lng: -77.0369,
      features: ['Government Travel', 'Diplomatic Service', 'Corporate Events', 'Airport Transfers']
    }
  ];

  const selectedCityData = cities.find(city => city.id === selectedCity);

  const handleBookInCity = (cityId) => {
    localStorage.setItem('selectedCity', cityId);
    navigate('/vehicle-booking-system');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">
            Service Coverage Areas
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide premium chauffeur services in major metropolitan areas across the United States with 24/7 availability and professional drivers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* City Selection */}
          <div className="space-y-6">
            <h3 className="font-inter font-bold text-xl text-primary mb-6">
              Select Your City
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setSelectedCity(city.id)}
                  className={`
                    p-4 rounded-xl border-2 luxury-transition text-left
                    ${selectedCity === city.id 
                      ? 'border-accent bg-accent/5 text-accent' :'border-border hover:border-accent/50 text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-inter font-semibold text-base">
                      {city.name}
                    </h4>
                    <span className="text-xs font-inter font-medium px-2 py-1 bg-muted rounded-full">
                      {city.state}
                    </span>
                  </div>
                  <p className="font-inter text-sm text-muted-foreground">
                    {city.coverage}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected City Details */}
          {selectedCityData && (
            <div className="space-y-6">
              {/* Map */}
              <div className="bg-muted rounded-xl overflow-hidden luxury-shadow">
                <iframe
                  width="100%"
                  height="300"
                  loading="lazy"
                  title={selectedCityData.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${selectedCityData.lat},${selectedCityData.lng}&z=11&output=embed`}
                  className="border-0"
                />
              </div>

              {/* City Information */}
              <div className="bg-white rounded-xl p-6 luxury-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-inter font-bold text-xl text-primary mb-2">
                      {selectedCityData.name}, {selectedCityData.state}
                    </h3>
                    <p className="font-inter text-muted-foreground">
                      {selectedCityData.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-success">
                    <Icon name="Clock" size={16} />
                    <span className="font-inter text-sm font-medium">
                      {selectedCityData.coverage}
                    </span>
                  </div>
                </div>

                {/* Airport Coverage */}
                <div className="mb-6">
                  <h4 className="font-inter font-semibold text-sm text-primary mb-3">
                    Airport Coverage
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCityData.airports.map((airport) => (
                      <span
                        key={airport}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full font-inter text-sm font-medium"
                      >
                        {airport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Service Features */}
                <div className="mb-6">
                  <h4 className="font-inter font-semibold text-sm text-primary mb-3">
                    Available Services
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCityData.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="font-inter text-sm text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Now Button */}
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleBookInCity(selectedCityData.id)}
                  className="w-full luxury-shadow"
                  iconName="MapPin"
                  iconPosition="left"
                >
                  Book in {selectedCityData.name}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CityCoverage;