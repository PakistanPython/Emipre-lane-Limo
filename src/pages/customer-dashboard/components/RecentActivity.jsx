import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import api from '../../../services/api';

const RecentActivity = () => {
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings?status=completed&limit=4');
        setRecentTrips(data.bookings);
      } catch (error) {
        console.error("Failed to fetch recent activity", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={`${
          index < rating 
            ? 'text-warning fill-current' :'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Recent Activity
          </h2>
          <Link to="/customer-dashboard/booking-history">
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
              View All History
            </Button>
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {recentTrips.map((trip) => (
          <div key={trip.id} className="p-6 hover:bg-muted/30 luxury-transition">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Trip Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-inter font-medium bg-success/10 text-success border border-success/20">
                    Completed
                  </span>
                  <span className="text-sm text-muted-foreground font-inter">
                    {trip.bookingNumber}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {new Date(trip.pickupDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-muted-foreground font-inter">
                        at {trip.pickupTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        {trip.actualDuration} mins • {trip.actualDistance} miles
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Car" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {trip.vehicle.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        {trip.driver?.name || 'N/A'}
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
                        {trip.pickupLocation}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        {trip.dropoffLocation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-inter">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(trip.customerRating)}
                    </div>
                  </div>
                  <div className="text-lg font-inter font-semibold text-foreground">
                    ${trip.totalAmount}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-col">
                <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
                  Book Again
                </Button>
                <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
                  Receipt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
