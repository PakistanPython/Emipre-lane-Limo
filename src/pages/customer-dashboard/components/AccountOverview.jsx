import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useUser } from '../../../contexts/UserContext';

const AccountOverview = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const userProfile = {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    memberSince: new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    avatar: user.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    membershipTier: user.membershipTier || "Bronze",
  };

  const paymentMethods = [
    {
      id: 1,
      type: "credit",
      brand: "Visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2,
      type: "credit",
      brand: "Mastercard",
      last4: "8888",
      expiry: "08/25",
      isDefault: false
    }
  ];

  const preferences = {
    vehiclePreference: user.preferredVehicle || "Not set",
    communicationPreference: user.notifications ? "SMS + Email" : "Email only",
    defaultTip: user.defaultTip || "Not set",
    autoBookingConfirmation: user.autoBookingConfirmation !== false
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      case 'amex':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Account Overview
          </h2>
          <Link to="/customer-dashboard/profile">
            <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left">
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-20 h-20 rounded-full object-cover luxury-shadow"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-inter font-semibold text-foreground mb-1">
              {userProfile.name}
            </h3>
            <p className="text-muted-foreground font-inter text-sm mb-2">
              {userProfile.email}
            </p>
            <p className="text-muted-foreground font-inter text-sm mb-3">
              {userProfile.phone}
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-inter font-medium">
                  {userProfile.membershipTier} Member
                </span>
                <span className="text-xs text-muted-foreground font-inter">
                  Since {userProfile.memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Payment Methods
          </h2>
          <Link to="/customer-dashboard/payments">
            <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
              Add Card
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-background">
                  <Icon name={getCardIcon(method.brand)} size={20} className="text-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-inter font-medium text-foreground text-sm">
                      {method.brand} •••• {method.last4}
                    </span>
                    {method.isDefault && (
                      <span className="px-2 py-1 bg-success/10 text-success rounded text-xs font-inter">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-inter">
                    Expires {method.expiry}
                  </p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                Options
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Preferences
          </h2>
          <Link to="/customer-dashboard/preferences">
            <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
              Manage
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Car" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter font-medium text-foreground">
                  Preferred Vehicle
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-inter ml-6">
                {preferences.vehiclePreference}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="MessageSquare" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter font-medium text-foreground">
                  Communication
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-inter ml-6">
                {preferences.communicationPreference}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter font-medium text-foreground">
                  Default Tip
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-inter ml-6">
                {preferences.defaultTip}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Bell" size={16} className="text-muted-foreground" />
                <span className="text-sm font-inter font-medium text-foreground">
                  Auto Confirmation
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-inter ml-6">
                {preferences.autoBookingConfirmation ? 'Enabled' : 'Disabled'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Help */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-inter font-semibold text-foreground mb-6">
          Support & Help
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/customer-dashboard/support">
            <div className="p-4 bg-muted/50 rounded-lg hover:bg-muted luxury-transition text-center">
              <Icon name="MessageCircle" size={24} className="mx-auto text-accent mb-2" />
              <h3 className="font-inter font-medium text-foreground text-sm mb-1">
                Contact Support
              </h3>
              <p className="text-xs text-muted-foreground font-inter">
                Get help with your account
              </p>
            </div>
          </Link>

          <Link to="/customer-dashboard/faq">
            <div className="p-4 bg-muted/50 rounded-lg hover:bg-muted luxury-transition text-center">
              <Icon name="HelpCircle" size={24} className="mx-auto text-accent mb-2" />
              <h3 className="font-inter font-medium text-foreground text-sm mb-1">
                FAQ
              </h3>
              <p className="text-xs text-muted-foreground font-inter">
                Find answers quickly
              </p>
            </div>
          </Link>

          <Link to="/customer-dashboard/chat">
            <div className="p-4 bg-muted/50 rounded-lg hover:bg-muted luxury-transition text-center">
              <Icon name="MessageSquare" size={24} className="mx-auto text-accent mb-2" />
              <h3 className="font-inter font-medium text-foreground text-sm mb-1">
                Live Chat
              </h3>
              <p className="text-xs text-muted-foreground font-inter">
                Chat with our team
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
