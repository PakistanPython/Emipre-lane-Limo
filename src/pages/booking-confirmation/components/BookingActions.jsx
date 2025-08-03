import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingActions = ({ bookingData, onModify, onCancel }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const handleAddToCalendar = () => {
    const event = {
      title: `Empire Lane Limo - ${bookingData.tripType}`,
      start: new Date(`${bookingData.date}T${bookingData.time}`),
      description: `Pickup: ${bookingData.pickupLocation}\nDestination: ${bookingData.destination}\nVehicle: ${bookingData.vehicle.make} ${bookingData.vehicle.model}\nReference: ${bookingData.reference}`
    };

    // Create calendar event URL (Google Calendar)
    const startTime = event.start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endTime = new Date(event.start.getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startTime}/${endTime}&details=${encodeURIComponent(event.description)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Empire Lane Limo Booking',
      text: `My ride is confirmed! Reference: ${bookingData.reference}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      alert('Booking details copied to clipboard!');
    }
  };

  const handleTrackRide = () => {
    navigate('/customer-dashboard/current-bookings', { 
      state: { bookingId: bookingData.id } 
    });
  };

  const handleModifyBooking = () => {
    if (onModify) {
      onModify(bookingData.id);
    } else {
      navigate('/vehicle-booking-system', { 
        state: { modifyBooking: bookingData } 
      });
    }
  };

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const confirmCancellation = () => {
    if (onCancel) {
      onCancel(bookingData.id);
    }
    setShowCancelModal(false);
    navigate('/customer-dashboard');
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border luxury-shadow p-6">
        <h2 className="text-xl font-inter font-semibold text-foreground mb-6 flex items-center">
          <Icon name="Settings" size={20} className="mr-2 text-accent" />
          Booking Actions
        </h2>

        <div className="space-y-4">
          {/* Primary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="default"
              onClick={handleTrackRide}
              iconName="MapPin"
              iconPosition="left"
              className="w-full"
            >
              Track Your Ride
            </Button>
            
            <Button
              variant="outline"
              onClick={handleAddToCalendar}
              iconName="Calendar"
              iconPosition="left"
              className="w-full"
            >
              Add to Calendar
            </Button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="ghost"
              onClick={handleShare}
              iconName="Share"
              iconPosition="left"
              className="w-full"
            >
              Share
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleModifyBooking}
              iconName="Edit"
              iconPosition="left"
              className="w-full"
            >
              Modify
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleCancelBooking}
              iconName="X"
              iconPosition="left"
              className="w-full text-error hover:text-error"
            >
              Cancel
            </Button>
          </div>

          {/* Contact Support */}
          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-inter font-medium text-foreground">
                  Need Help?
                </h3>
                <p className="text-sm text-muted-foreground font-inter">
                  Our support team is available 24/7
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center luxury-transition hover:bg-success/20">
                  <Icon name="Phone" size={16} className="text-success" />
                </button>
                <button className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center luxury-transition hover:bg-primary/20">
                  <Icon name="MessageCircle" size={16} className="text-primary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-1300 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg border border-border luxury-shadow-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={32} className="text-error" />
              </div>
              <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                Cancel Booking?
              </h3>
              <p className="text-muted-foreground font-inter">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
              >
                Keep Booking
              </Button>
              <Button
                variant="destructive"
                onClick={confirmCancellation}
                className="flex-1"
              >
                Cancel Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingActions;