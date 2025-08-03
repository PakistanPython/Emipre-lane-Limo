import React from 'react';
import Icon from '../../../components/AppIcon';

const NextSteps = ({ bookingData }) => {
  const nextSteps = [
    {
      id: 1,
      icon: 'Mail',
      title: 'Confirmation Email',
      description: 'Check your email for detailed booking confirmation and receipt',
      status: 'completed',
      time: 'Sent immediately'
    },
    {
      id: 2,
      icon: 'MessageSquare',
      title: 'SMS Notifications',
      description: 'Receive updates about your driver assignment and arrival',
      status: 'pending',
      time: '30 minutes before pickup'
    },
    {
      id: 3,
      icon: 'User',
      title: 'Driver Assignment',
      description: 'Your chauffeur will be assigned and you\'ll receive their details',
      status: 'pending',
      time: '30 minutes before pickup'
    },
    {
      id: 4,
      icon: 'MapPin',
      title: 'Live Tracking',
      description: 'Track your vehicle in real-time as it approaches your location',
      status: 'pending',
      time: '15 minutes before pickup'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'pending':
        return { name: 'Clock', color: 'text-muted-foreground' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
      <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
        <Icon name="CheckSquare" size={20} className="mr-2 text-accent" />
        What Happens Next
      </h2>

      <div className="space-y-4">
        {nextSteps.map((step, index) => {
          const statusIcon = getStatusIcon(step.status);
          const isLast = index === nextSteps.length - 1;
          
          return (
            <div key={step.id} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === 'completed' ? 'bg-success/10' : 'bg-muted'
                }`}>
                  <Icon 
                    name={statusIcon.name} 
                    size={20} 
                    className={statusIcon.color}
                  />
                </div>
                {!isLast && (
                  <div className="w-0.5 h-8 bg-border mt-2"></div>
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-inter font-medium text-foreground">
                    {step.title}
                  </h3>
                  <span className="text-xs text-muted-foreground font-inter">
                    {step.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-inter">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Important Information */}
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="font-inter font-semibold text-foreground mb-4">
          Important Information
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={16} className="text-accent mt-0.5" />
            <div className="text-sm font-inter text-foreground">
              <strong>Pickup Time:</strong> Please be ready 5 minutes before your scheduled pickup time
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Phone" size={16} className="text-accent mt-0.5" />
            <div className="text-sm font-inter text-foreground">
              <strong>Contact:</strong> Your driver will call you upon arrival at the pickup location
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="CreditCard" size={16} className="text-accent mt-0.5" />
            <div className="text-sm font-inter text-foreground">
              <strong>Payment:</strong> Your payment has been processed. No additional charges at pickup
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-accent mt-0.5" />
            <div className="text-sm font-inter text-foreground">
              <strong>Guarantee:</strong> We guarantee your ride or provide a full refund
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="AlertCircle" size={20} className="text-error" />
          </div>
          <div>
            <h4 className="font-inter font-medium text-foreground">
              24/7 Emergency Support
            </h4>
            <p className="text-sm text-muted-foreground font-inter">
              Call +1 (555) 123-4567 for immediate assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;