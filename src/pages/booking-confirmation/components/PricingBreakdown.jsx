import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingBreakdown = ({ pricingData, paymentData }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
      <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
        <Icon name="Receipt" size={20} className="mr-2 text-accent" />
        Pricing & Payment
      </h2>

      <div className="space-y-4">
        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-inter text-foreground">Base Fare</span>
            <span className="font-inter text-foreground">
              {formatCurrency(pricingData.baseFare)}
            </span>
          </div>
          
          {pricingData.distanceFee > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-inter text-muted-foreground">
                Distance Fee ({pricingData.distance} miles)
              </span>
              <span className="font-inter text-foreground">
                {formatCurrency(pricingData.distanceFee)}
              </span>
            </div>
          )}
          
          {pricingData.timeFee > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-inter text-muted-foreground">
                Time Fee ({pricingData.duration})
              </span>
              <span className="font-inter text-foreground">
                {formatCurrency(pricingData.timeFee)}
              </span>
            </div>
          )}
          
          {pricingData.surcharge > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-inter text-muted-foreground">
                Peak Hours Surcharge
              </span>
              <span className="font-inter text-foreground">
                {formatCurrency(pricingData.surcharge)}
              </span>
            </div>
          )}
          
          {pricingData.discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-inter text-success">
                Discount Applied
              </span>
              <span className="font-inter text-success">
                -{formatCurrency(pricingData.discount)}
              </span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="font-inter text-muted-foreground">Tax & Fees</span>
            <span className="font-inter text-foreground">
              {formatCurrency(pricingData.tax)}
            </span>
          </div>
          
          {pricingData.gratuity > 0 && (
            <div className="flex justify-between items-center">
              <span className="font-inter text-muted-foreground">
                Gratuity ({pricingData.gratuityPercent}%)
              </span>
              <span className="font-inter text-foreground">
                {formatCurrency(pricingData.gratuity)}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-inter font-semibold text-foreground">
              Total Amount
            </span>
            <span className="text-lg font-inter font-bold text-accent">
              {formatCurrency(pricingData.total)}
            </span>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border-t border-border pt-4 mt-4">
          <h3 className="font-inter font-semibold text-foreground mb-3">
            Payment Method
          </h3>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={paymentData.type === 'card' ? 'CreditCard' : 'Wallet'} 
                size={20} 
                className="text-primary" 
              />
            </div>
            <div className="flex-1">
              <div className="font-inter font-medium text-foreground">
                {paymentData.type === 'card' 
                  ? `•••• •••• •••• ${paymentData.lastFour}`
                  : paymentData.method
                }
              </div>
              <div className="text-sm text-muted-foreground font-inter">
                {paymentData.type === 'card' 
                  ? `${paymentData.brand} ending in ${paymentData.lastFour}`
                  : 'Corporate Account'
                }
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-inter text-success">Paid</span>
            </div>
          </div>
        </div>

        {/* Receipt Options */}
        <div className="border-t border-border pt-4 mt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-muted rounded-lg luxury-transition hover:bg-muted/80">
              <Icon name="Download" size={16} className="text-foreground" />
              <span className="font-inter text-sm text-foreground">Download Receipt</span>
            </button>
            <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-muted rounded-lg luxury-transition hover:bg-muted/80">
              <Icon name="Mail" size={16} className="text-foreground" />
              <span className="font-inter text-sm text-foreground">Email Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBreakdown;