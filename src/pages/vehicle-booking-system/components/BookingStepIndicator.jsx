import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStepIndicator = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = [
    { id: 1, label: 'Trip Details', shortLabel: 'Trip' },
    { id: 2, label: 'Date & Time', shortLabel: 'Date' },
    { id: 3, label: 'Vehicle Selection', shortLabel: 'Vehicle' },
    { id: 4, label: 'Booking Summary', shortLabel: 'Summary' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-background border-b border-border py-4 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Desktop Progress */}
        <div className="hidden md:flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full border-2 luxury-transition
                ${getStepStatus(step.id) === 'completed' 
                  ? 'bg-success border-success text-success-foreground' 
                  : getStepStatus(step.id) === 'current' ?'bg-accent border-accent text-accent-foreground' :'bg-background border-border text-muted-foreground'
                }
              `}>
                {getStepStatus(step.id) === 'completed' ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="font-inter font-medium text-sm">{step.id}</span>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-4 luxury-transition
                  ${getStepStatus(step.id) === 'completed' ? 'bg-success' : 'bg-border'}
                `} />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <div className="hidden md:flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <p className={`
                font-inter font-medium text-sm luxury-transition
                ${getStepStatus(step.id) === 'current' ? 'text-accent' : 
                  getStepStatus(step.id) === 'completed' ? 'text-success' : 'text-muted-foreground'}
              `}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter font-medium text-sm text-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="font-inter text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full luxury-transition"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <p className="mt-2 font-inter font-medium text-sm text-accent">
            {steps[currentStep - 1]?.label}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingStepIndicator;