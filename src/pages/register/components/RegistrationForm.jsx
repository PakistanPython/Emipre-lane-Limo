import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ onSubmit, isLoading, currentStep, setCurrentStep }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    preferredVehicle: '',
    notifications: {
      email: true,
      sms: false,
      promotions: false
    },
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({});

  const vehicleOptions = [
    { value: 'sedan', label: 'Premium Sedan', description: 'Mercedes E-Class, BMW 5 Series' },
    { value: 'suv', label: 'Luxury SUV', description: 'Mercedes GLE, BMW X5' },
    { value: 'limousine', label: 'Stretch Limousine', description: 'Classic stretch limos' },
    { value: 'executive', label: 'Executive Class', description: 'Mercedes S-Class, BMW 7 Series' },
    { value: 'no-preference', label: 'No Preference', description: 'I\'ll choose per booking' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleNotificationChange = (type, checked) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Personal Information validation
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    } else if (step === 2) {
      // Security validation
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else if (step === 3) {
      // Preferences validation
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the Terms of Service';
      }
      if (!formData.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the Privacy Policy';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    return validateStep(1) && validateStep(2) && validateStep(3);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
          Personal Information
        </h3>
        <p className="text-sm text-muted-foreground">
          Let's start with your basic information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData.email}
        onChange={(e) => handleInputChange('email', e.target.value)}
        error={errors.email}
        description="We'll use this for booking confirmations and updates"
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="(555) 123-4567"
        value={formData.phone}
        onChange={(e) => handleInputChange('phone', formatPhoneNumber(e.target.value))}
        error={errors.phone}
        description="For booking confirmations and driver communication"
        required
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
          Account Security
        </h3>
        <p className="text-sm text-muted-foreground">
          Create a secure password for your account
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
      </div>

      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-inter font-medium text-foreground mb-2">Password Requirements:</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li className="flex items-center space-x-2">
            <Icon name={formData.password.length >= 8 ? "Check" : "X"} 
                  size={14} 
                  color={formData.password.length >= 8 ? "var(--color-success)" : "var(--color-muted-foreground)"} />
            <span>At least 8 characters long</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name={/[A-Z]/.test(formData.password) ? "Check" : "X"} 
                  size={14} 
                  color={/[A-Z]/.test(formData.password) ? "var(--color-success)" : "var(--color-muted-foreground)"} />
            <span>Contains uppercase letter</span>
          </li>
          <li className="flex items-center space-x-2">
            <Icon name={/[0-9]/.test(formData.password) ? "Check" : "X"} 
                  size={14} 
                  color={/[0-9]/.test(formData.password) ? "var(--color-success)" : "var(--color-muted-foreground)"} />
            <span>Contains number</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
          Preferences & Agreement
        </h3>
        <p className="text-sm text-muted-foreground">
          Customize your experience and review our terms
        </p>
      </div>

      <Select
        label="Preferred Vehicle Type"
        description="This helps us show relevant options first"
        options={vehicleOptions}
        value={formData.preferredVehicle}
        onChange={(value) => handleInputChange('preferredVehicle', value)}
        placeholder="Select your preferred vehicle type"
      />

      <div className="space-y-4">
        <h4 className="font-inter font-medium text-foreground">Notification Preferences</h4>
        <div className="space-y-3">
          <Checkbox
            label="Email Notifications"
            description="Booking confirmations, updates, and receipts"
            checked={formData.notifications.email}
            onChange={(e) => handleNotificationChange('email', e.target.checked)}
          />
          <Checkbox
            label="SMS Notifications"
            description="Real-time booking updates and driver arrival alerts"
            checked={formData.notifications.sms}
            onChange={(e) => handleNotificationChange('sms', e.target.checked)}
          />
          <Checkbox
            label="Promotional Offers"
            description="Special deals, discounts, and new service announcements"
            checked={formData.notifications.promotions}
            onChange={(e) => handleNotificationChange('promotions', e.target.checked)}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service"
          description="By checking this, you agree to our terms and conditions"
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />
        <Checkbox
          label="I agree to the Privacy Policy"
          description="We respect your privacy and protect your personal information"
          checked={formData.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e.target.checked)}
          error={errors.agreeToPrivacy}
          required
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Previous
          </Button>
        )}
        
        <div className="flex-1" />
        
        {currentStep < 3 ? (
          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={handleNext}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Next Step
          </Button>
        ) : (
          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            className="luxury-shadow hover:luxury-shadow-lg"
            iconName="UserPlus"
            iconPosition="right"
          >
            Create Account
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;