import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep = 1, totalSteps = 3 }) => {
  const steps = [
    { id: 1, label: 'Personal Info', icon: 'User' },
    { id: 2, label: 'Security', icon: 'Shield' },
    { id: 3, label: 'Preferences', icon: 'Settings' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 luxury-transition
                  ${status === 'completed' 
                    ? 'bg-success border-success text-success-foreground' 
                    : status === 'current' ?'bg-accent border-accent text-accent-foreground' :'bg-background border-border text-muted-foreground'
                  }
                `}>
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className={`
                  mt-2 text-xs font-inter font-medium text-center
                  ${status === 'current' ? 'text-accent' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}
                `}>
                  {step.label}
                </span>
              </div>
              
              {!isLast && (
                <div className={`
                  flex-1 h-0.5 mx-4 luxury-transition
                  ${status === 'completed' ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="mt-2 w-full bg-muted rounded-full h-1">
          <div 
            className="bg-accent h-1 rounded-full luxury-transition"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationProgress;