import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';


const RegistrationForm = ({ onSubmit, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
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
  const [passwordStrength, setPasswordStrength] = useState(0);

  const vehicleOptions = [
    { value: 'sedan', label: 'Premium Sedan', description: 'Mercedes E-Class, BMW 5 Series' },
    { value: 'suv', label: 'Luxury SUV', description: 'Mercedes GLE, BMW X5' },
    { value: 'limousine', label: 'Stretch Limousine', description: 'Classic stretch limos' },
    { value: 'executive', label: 'Executive Class', description: 'Mercedes S-Class, BMW 7 Series' },
    { value: 'no-preference', label: 'No Preference', description: 'I\'ll choose per booking' }
  ];

  const validatePassword = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'password') {
      setPasswordStrength(validatePassword(value));
    }

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
    }

    if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (passwordStrength < 3) {
        newErrors.password = 'Password must be stronger (at least 8 characters with uppercase, lowercase, and numbers)';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (step === 3) {
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      onSubmit(formData);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-error';
    if (passwordStrength <= 2) return 'bg-warning';
    if (passwordStrength <= 3) return 'bg-accent';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    return 'Strong';
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return value;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
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

          <Button
            type="button"
            variant="default"
            size="lg"
            onClick={handleNext}
            className="w-full mt-6"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue
          </Button>
        </div>
      )}

      {/* Step 2: Account Security */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
              Account Security
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a secure password for your account
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                error={errors.password}
                required
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Password Strength:</span>
                    <span className={`font-medium ${
                      passwordStrength <= 1 ? 'text-error' :
                      passwordStrength <= 2 ? 'text-warning' :
                      passwordStrength <= 3 ? 'text-accent' : 'text-success'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full luxury-transition ${getPasswordStrengthColor()}`}
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

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

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              className="flex-1"
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back
            </Button>
            <Button
              type="button"
              variant="default"
              size="lg"
              onClick={handleNext}
              className="flex-1"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Preferences & Terms */}
      {currentStep === 3 && (
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

          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              className="flex-1"
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="default"
              size="lg"
              loading={isLoading}
              className="flex-1"
              iconName="UserPlus"
              iconPosition="right"
            >
              Create Account
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegistrationForm;