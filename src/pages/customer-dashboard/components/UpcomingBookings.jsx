import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import api from '../../../services/api';

const UpcomingBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        const upcoming = data.bookings.filter(
          (b) => b.status === 'pending' || b.status === 'confirmed' || b.status === 'driver_assigned'
        );
        setUpcomingBookings(upcoming);
      } catch (error) {
        console.error("Failed to fetch upcoming bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success/10 border-success/20';
      case 'driver_assigned':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'en_route':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'driver_assigned':
        return 'Driver Assigned';
      case 'pending':
        return 'Pending';
      case 'en_route':
        return 'En Route';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (upcomingBookings.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
          No Upcoming Bookings
        </h3>
        <p className="text-muted-foreground mb-6">
          You don't have any upcoming rides scheduled.
        </p>
        <Link to="/vehicle-booking-system">
          <Button variant="default" iconName="Plus" iconPosition="left">
            Book Your First Ride
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Upcoming Bookings
          </h2>
          <Link to="/customer-dashboard/current-bookings">
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
              View All
            </Button>
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {upcomingBookings.map((booking) => (
          <div key={booking.id} className="p-6 hover:bg-muted/30 luxury-transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Booking Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-inter font-medium border ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                  <span className="text-sm text-muted-foreground font-inter">
                    {booking.bookingType}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {new Date(booking.pickupDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        {booking.pickupTime} • {booking.estimatedDuration} mins
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Car" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {booking.vehicle.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        ${booking.estimatedPrice}
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
                  <div className="flex-1 space-y-2">
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        {booking.pickupLocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        {booking.dropoffLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                {booking.driver && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <img
                      src={booking.driver.avatar}
                      alt={booking.driver.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-inter font-medium text-foreground">
                        {booking.driver.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="text-warning fill-current" />
                          <span className="text-xs text-muted-foreground font-inter">
                            {booking.driver.rating}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground font-inter">
                          {booking.driver.phone}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="Phone">
                      Call
                    </Button>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                  Modify
                </Button>
                <Button variant="ghost" size="sm" iconName="X" iconPosition="left">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingBookings;
