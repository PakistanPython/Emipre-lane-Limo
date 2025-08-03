import React from 'react';
import Icon from '../AppIcon';

const BookingFlowNavigation = ({ currentStep = 1, totalSteps = 3, onStepClick }) => {
  const steps = [
    { id: 1, label: 'Vehicle Selection', shortLabel: 'Vehicle' },
    { id: 2, label: 'Booking Details', shortLabel: 'Details' },
    { id: 3, label: 'Confirmation', shortLabel: 'Confirm' }
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep && onStepClick) {
      onStepClick(stepId);
    }
  };

  const StepIndicator = ({ step, status, isLast }) => {
    const isClickable = status === 'completed' || status === 'current';
    
    return (
      <div className="flex items-center">
        <button
          onClick={() => handleStepClick(step.id)}
          disabled={!isClickable}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full border-2 luxury-transition
            ${status === 'completed' 
              ? 'bg-success border-success text-success-foreground hover:bg-success/90' 
              : status === 'current' ?'bg-accent border-accent text-accent-foreground' :'bg-background border-border text-muted-foreground'
            }
            ${isClickable ? 'cursor-pointer hover:scale-105 luxury-spring' : 'cursor-not-allowed'}
          `}
        >
          {status === 'completed' ? (
            <Icon name="Check" size={16} color="currentColor" />
          ) : (
            <span className="font-inter font-medium text-sm">{step.id}</span>
          )}
        </button>
        
        {!isLast && (
          <div className={`
            hidden sm:block w-16 h-0.5 mx-4 luxury-transition
            ${status === 'completed' ? 'bg-success' : 'bg-border'}
          `} />
        )}
      </div>
    );
  };

  const StepLabel = ({ step, status }) => (
    <div className="text-center">
      <p className={`
        font-inter font-medium text-sm luxury-transition
        ${status === 'current' ? 'text-accent' : status === 'completed' ? 'text-success' : 'text-muted-foreground'}
      `}>
        <span className="hidden sm:inline">{step.label}</span>
        <span className="sm:hidden">{step.shortLabel}</span>
      </p>
    </div>
  );

  return (
    <div className="bg-background border-b border-border py-6">
      <div className="max-w-4xl mx-auto px-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <StepIndicator
                key={step.id}
                step={step}
                status={getStepStatus(step.id)}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Step Labels */}
        <div className="flex justify-between">
          {steps.map((step) => (
            <StepLabel
              key={step.id}
              step={step}
              status={getStepStatus(step.id)}
            />
          ))}
        </div>

        {/* Progress Percentage */}
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
    </div>
  );
};

export default BookingFlowNavigation;