import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Clock',
      title: 'Faster Booking',
      description: 'Skip the details every time with saved preferences and payment methods'
    },
    {
      icon: 'History',
      title: 'Booking History',
      description: 'Track all your rides, receipts, and easily rebook favorite routes'
    },
    {
      icon: 'Star',
      title: 'Exclusive Offers',
      description: 'Access member-only discounts, priority booking, and special promotions'
    },
    {
      icon: 'Shield',
      title: 'Secure Account',
      description: 'Your payment information and preferences are safely encrypted'
    },
    {
      icon: 'Bell',
      title: 'Real-time Updates',
      description: 'Get instant notifications about your driver, vehicle, and arrival times'
    },
    {
      icon: 'CreditCard',
      title: 'Easy Payments',
      description: 'Store multiple payment methods and get automatic receipts'
    }
  ];

  return (
    <div className="bg-muted/30 rounded-xl p-6 lg:p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
          Why Create an Account?
        </h3>
        <p className="text-sm text-muted-foreground">
          Join thousands of satisfied customers who trust Empire Lane Limo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={benefit.icon} 
                size={16} 
                color="var(--color-accent)" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-inter font-medium text-sm text-foreground mb-1">
                {benefit.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} color="var(--color-success)" />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} color="var(--color-success)" />
            <span>Privacy Protected</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Award" size={14} color="var(--color-success)" />
            <span>BBB Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;