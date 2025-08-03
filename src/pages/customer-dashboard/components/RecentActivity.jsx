import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const recentTrips = [
    {
      id: "BK-2025-098",
      date: "2025-01-25",
      time: "03:45 PM",
      pickup: "JFK Airport Terminal 1",
      dropoff: "Manhattan Midtown",
      vehicle: "Mercedes S-Class",
      driver: "Robert Johnson",
      status: "completed",
      rating: 5,
      price: "$135.00",
      duration: "52 mins",
      distance: "18.5 miles"
    },
    {
      id: "BK-2025-097",
      date: "2025-01-23",
      time: "08:30 AM",
      pickup: "Home - Upper East Side",
      dropoff: "Corporate Office",
      vehicle: "BMW 7 Series",
      driver: "Sarah Williams",
      status: "completed",
      rating: 4,
      price: "$65.00",
      duration: "28 mins",
      distance: "8.2 miles"
    },
    {
      id: "BK-2025-096",
      date: "2025-01-20",
      time: "07:15 PM",
      pickup: "Restaurant - SoHo",
      dropoff: "Home - Upper East Side",
      vehicle: "Cadillac Escalade",
      driver: "David Martinez",
      status: "completed",
      rating: 5,
      price: "$85.00",
      duration: "35 mins",
      distance: "12.1 miles"
    },
    {
      id: "BK-2025-095",
      date: "2025-01-18",
      time: "11:00 AM",
      pickup: "Hotel - Times Square",
      dropoff: "LaGuardia Airport",
      vehicle: "Mercedes E-Class",
      driver: "Jennifer Lee",
      status: "completed",
      rating: 5,
      price: "$95.00",
      duration: "42 mins",
      distance: "15.3 miles"
    }
  ];

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
                    {trip.id}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {new Date(trip.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-sm text-muted-foreground font-inter">
                        at {trip.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        {trip.duration} • {trip.distance}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Car" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-inter font-medium text-foreground">
                        {trip.vehicle}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={16} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground font-inter">
                        {trip.driver}
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
                        {trip.pickup}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-inter font-medium text-foreground">
                        {trip.dropoff}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rating & Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-inter">Rating:</span>
                    <div className="flex items-center gap-1">
                      {renderStars(trip.rating)}
                    </div>
                  </div>
                  <div className="text-lg font-inter font-semibold text-foreground">
                    {trip.price}
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