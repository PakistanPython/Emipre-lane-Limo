import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ServiceCategories = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'sedan',
      title: 'Premium Sedan',
      description: 'Perfect for business meetings and airport transfers with professional chauffeurs.',
      features: ['Up to 3 passengers', 'Premium comfort', 'Business amenities', 'Wi-Fi included'],
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'From $85/hour',
      icon: 'Car'
    },
    {
      id: 'suv',
      title: 'Luxury SUV',
      description: 'Spacious and elegant for group travel and special occasions with extra comfort.',
      features: ['Up to 6 passengers', 'Extra luggage space', 'Premium leather', 'Climate control'],
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'From $120/hour',
      icon: 'Truck'
    },
    {
      id: 'limousine',
      title: 'Stretch Limousine',
      description: 'Ultimate luxury experience for weddings, proms, and VIP transportation needs.',
      features: ['Up to 10 passengers', 'Full bar service', 'Entertainment system', 'Red carpet service'],
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      price: 'From $200/hour',
      icon: 'Crown'
    }
  ];

  const handleServiceSelect = (serviceId) => {
    localStorage.setItem('selectedVehicleType', serviceId);
    navigate('/vehicle-booking-system');
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">
            Our Premium Fleet
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our carefully curated selection of luxury vehicles, each maintained to the highest standards and driven by professional chauffeurs.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl luxury-shadow hover:luxury-shadow-lg luxury-transition overflow-hidden group"
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 luxury-transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3">
                  <Icon name={service.icon} size={24} className="text-accent" />
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                  <span className="font-inter font-medium text-sm">{service.price}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="font-inter font-bold text-xl text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="font-inter text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                        <span className="font-inter text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => handleServiceSelect(service.id)}
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent luxury-transition"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Select Vehicle
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Fleet CTA */}
        <div className="text-center mt-12">
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate('/vehicle-booking-system')}
            className="luxury-shadow hover:luxury-shadow-lg"
            iconName="Eye"
            iconPosition="left"
          >
            View Complete Fleet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;