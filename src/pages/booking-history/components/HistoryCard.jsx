import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoryCard = ({ 
  booking, 
  onRebook, 
  onDownloadReceipt, 
  onRateTrip, 
  onSaveAsFavorite 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userRating, setUserRating] = useState(booking.rating || 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRatingClick = (rating) => {
    setUserRating(rating);
    onRateTrip?.(booking.id, rating);
  };

  const RatingStars = ({ rating, interactive = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && handleRatingClick(star)}
            disabled={!interactive}
            className={`
              ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              luxury-transition
            `}
          >
            <Icon 
              name="Star" 
              size={interactive ? 16 : 12}
              className={`
                ${star <= rating 
                  ? 'text-warning fill-current' :'text-muted-foreground'
                }
              `}
            />
          </button>
        ))}
        <span className="text-xs text-muted-foreground ml-1">
          ({rating}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg luxury-shadow hover:shadow-lg luxury-transition">
      {/* Main Card Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          {/* Booking Info */}
          <div className="flex-1">
            {/* Status and Type */}
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-inter font-medium border text-green-700 bg-green-50 border-green-200">
                <Icon name="CheckCircle" size={12} />
                Completed
              </span>
              <span className="text-sm text-muted-foreground font-inter">
                {booking.bookingType}
              </span>
              <span className="text-sm text-muted-foreground font-inter">
                #{booking.id}
              </span>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-inter font-medium text-foreground">
                    {formatDate(booking.date)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-inter">
                    {booking.time} • {booking.duration}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Car" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-inter font-medium text-foreground">
                    {booking.vehicle}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground font-inter">
                    {booking.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex flex-col items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <div className="w-0.5 h-6 bg-border my-1"></div>
                <div className="w-3 h-3 rounded-full bg-error"></div>
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-inter uppercase tracking-wide mb-1">
                    Pickup
                  </p>
                  <p className="text-sm font-inter font-medium text-foreground">
                    {booking.pickup}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-inter uppercase tracking-wide mb-1">
                    Dropoff
                  </p>
                  <p className="text-sm font-inter font-medium text-foreground">
                    {booking.dropoff}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver Info and Rating */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg mb-4">
              <img
                src={booking.driver.avatar}
                alt={booking.driver.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-inter font-semibold text-foreground mb-1">
                  {booking.driver.name}
                </p>
                <RatingStars rating={booking.driver.rating} />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Your Rating:</p>
                <RatingStars rating={userRating} interactive={true} />
              </div>
            </div>

            {/* Trip Photos */}
            {booking.tripPhotos && (
              <div className="mb-4">
                <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                  Trip Photos
                </h4>
                <div className="flex gap-2">
                  {booking.tripPhotos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Trip photo ${index + 1}`}
                      className="w-16 h-16 rounded-lg object-cover border border-border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Expanded Details */}
            {isExpanded && (
              <div className="border-t border-border pt-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                      Trip Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Reference:</span>
                        <span className="font-medium">{booking.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{booking.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Receipt ID:</span>
                        <span className="font-medium">{booking.receiptId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                      Billing Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Fare:</span>
                        <span className="font-medium">${(parseFloat(booking.price.replace('$', '')) * 0.8).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service Fee:</span>
                        <span className="font-medium">${(parseFloat(booking.price.replace('$', '')) * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tip:</span>
                        <span className="font-medium">${(parseFloat(booking.price.replace('$', '')) * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t border-border pt-2">
                        <span>Total:</span>
                        <span>{booking.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 min-w-[140px]">
            <Button 
              variant="default" 
              size="sm" 
              iconName="Repeat" 
              iconPosition="left"
              onClick={() => onRebook?.(booking)}
            >
              Rebook Trip
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Download" 
              iconPosition="left"
              onClick={() => onDownloadReceipt?.(booking.receiptId)}
            >
              Receipt
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              iconName="Heart" 
              iconPosition="left"
              onClick={() => onSaveAsFavorite?.(booking)}
            >
              Save Route
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"} 
              iconPosition="left"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Less' : 'Details'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;