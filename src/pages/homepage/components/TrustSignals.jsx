import React from 'react';
import Icon from '../../../components/AppIcon';


const TrustSignals = () => {
  const certifications = [
    {
      id: 'bbb',
      name: 'Better Business Bureau',
      rating: 'A+',
      description: 'Accredited Business',
      icon: 'Shield',
      verified: true
    },
    {
      id: 'dot',
      name: 'DOT Certified',
      rating: 'Licensed',
      description: 'Department of Transportation',
      icon: 'CheckCircle',
      verified: true
    },
    {
      id: 'insurance',
      name: 'Fully Insured',
      rating: '$5M',
      description: 'Liability Coverage',
      icon: 'Shield',
      verified: true
    },
    {
      id: 'chauffeur',
      name: 'Professional Chauffeurs',
      rating: 'Certified',
      description: 'Background Checked',
      icon: 'UserCheck',
      verified: true
    }
  ];

  const securityFeatures = [
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Payments',
      description: 'PCI DSS compliant payment processing'
    },
    {
      icon: 'MapPin',
      title: 'GPS Tracking',
      description: 'Real-time vehicle tracking for your safety'
    },
    {
      icon: 'Phone',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best Luxury Transportation Service',
      organization: 'Metropolitan Business Awards',
      icon: 'Award'
    },
    {
      year: '2023',
      title: 'Excellence in Customer Service',
      organization: 'Transportation Industry Association',
      icon: 'Star'
    },
    {
      year: '2023',
      title: 'Top Rated Chauffeur Service',
      organization: 'Luxury Travel Magazine',
      icon: 'Trophy'
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">
            Your Trust, Our Priority
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            We maintain the highest standards of safety, security, and professionalism to ensure your complete peace of mind.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-xl p-6 luxury-shadow hover:luxury-shadow-lg luxury-transition text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name={cert.icon} size={32} className="text-success" />
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <h3 className="font-inter font-bold text-lg text-primary">
                    {cert.rating}
                  </h3>
                  {cert.verified && (
                    <Icon name="BadgeCheck" size={20} className="text-success" />
                  )}
                </div>
                <h4 className="font-inter font-semibold text-sm text-foreground">
                  {cert.name}
                </h4>
              </div>
              
              <p className="font-inter text-sm text-muted-foreground">
                {cert.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="bg-surface rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="font-inter font-bold text-2xl text-primary mb-4">
              Security & Safety Features
            </h3>
            <p className="font-inter text-muted-foreground max-w-xl mx-auto">
              Advanced security measures and safety protocols to protect you throughout your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Icon name={feature.icon} size={24} className="text-accent" />
                  </div>
                </div>
                <h4 className="font-inter font-semibold text-base text-primary mb-2">
                  {feature.title}
                </h4>
                <p className="font-inter text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="text-center mb-12">
          <h3 className="font-inter font-bold text-2xl text-primary mb-4">
            Awards & Recognition
          </h3>
          <p className="font-inter text-muted-foreground max-w-xl mx-auto">
            Our commitment to excellence has been recognized by industry leaders and satisfied customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 luxury-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name={award.icon} size={28} className="text-accent" />
                </div>
              </div>
              
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full font-inter text-sm font-medium mb-2">
                  {award.year}
                </span>
                <h4 className="font-inter font-bold text-base text-primary">
                  {award.title}
                </h4>
              </div>
              
              <p className="font-inter text-sm text-muted-foreground">
                {award.organization}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Guarantee */}
        <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                <Icon name="ShieldCheck" size={32} className="text-black" />
              </div>
            </div>
            
            <h3 className="font-inter font-bold text-2xl md:text-3xl mb-4">
              100% Satisfaction Guarantee
            </h3>
            
            <p className="font-inter text-lg text-gray-200 mb-8 leading-relaxed">
              We stand behind our service with a complete satisfaction guarantee. If you're not completely satisfied with your experience, we'll make it right or provide a full refund.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={20} className="text-accent" />
                <span className="font-inter text-sm">On-time guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={20} className="text-accent" />
                <span className="font-inter text-sm">Free cancellation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={20} className="text-accent" />
                <span className="font-inter text-sm">24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;