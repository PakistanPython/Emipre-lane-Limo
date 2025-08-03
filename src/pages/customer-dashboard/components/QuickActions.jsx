import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Book New Ride",
      description: "Schedule your next premium transportation",
      icon: "Plus",
      color: "bg-accent text-accent-foreground",
      link: "/vehicle-booking-system",
      primary: true
    },
    {
      id: 2,
      title: "Airport Transfer",
      description: "Quick booking for airport trips",
      icon: "Plane",
      color: "bg-primary text-primary-foreground",
      link: "/vehicle-booking-system?type=airport",
      primary: false
    },
    {
      id: 3,
      title: "Hourly Service",
      description: "Book chauffeur by the hour",
      icon: "Clock",
      color: "bg-secondary text-secondary-foreground",
      link: "/vehicle-booking-system?type=hourly",
      primary: false
    },
    {
      id: 4,
      title: "Corporate Booking",
      description: "Business travel arrangements",
      icon: "Building",
      color: "bg-muted text-foreground",
      link: "/vehicle-booking-system?type=corporate",
      primary: false
    }
  ];

  const savedLocations = [
    {
      id: 1,
      name: "Home",
      address: "Upper East Side, Manhattan",
      icon: "Home",
      type: "home"
    },
    {
      id: 2,
      name: "Office",
      address: "Financial District, Manhattan",
      icon: "Building",
      type: "work"
    },
    {
      id: 3,
      name: "JFK Airport",
      address: "Terminal 4, Queens",
      icon: "Plane",
      type: "airport"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Booking Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-inter font-semibold text-foreground mb-6">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className="group block"
            >
              <div className={`
                p-6 rounded-lg luxury-transition hover:luxury-shadow-lg
                ${action.primary 
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90' 
                  : 'bg-muted hover:bg-muted/80 text-foreground'
                }
              `}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className={`
                    p-3 rounded-full luxury-transition group-hover:scale-110
                    ${action.primary 
                      ? 'bg-accent-foreground/10' 
                      : 'bg-background'
                    }
                  `}>
                    <Icon 
                      name={action.icon} 
                      size={24} 
                      className={action.primary ? 'text-accent-foreground' : 'text-accent'}
                    />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-sm mb-1">
                      {action.title}
                    </h3>
                    <p className={`text-xs font-inter ${
                      action.primary 
                        ? 'text-accent-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Saved Locations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-inter font-semibold text-foreground">
            Saved Locations
          </h2>
          <Link to="/customer-dashboard/preferences">
            <Button variant="ghost" size="sm" iconName="Settings" iconPosition="left">
              Manage
            </Button>
          </Link>
        </div>

        <div className="space-y-4">
          {savedLocations.map((location) => (
            <div
              key={location.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted luxury-transition group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-background group-hover:bg-accent group-hover:text-accent-foreground luxury-transition">
                  <Icon name={location.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-inter font-medium text-foreground text-sm">
                    {location.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-inter">
                    {location.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Link to={`/vehicle-booking-system?pickup=${encodeURIComponent(location.address)}`}>
                  <Button variant="ghost" size="sm" iconName="ArrowRight">
                    From Here
                  </Button>
                </Link>
                <Link to={`/vehicle-booking-system?dropoff=${encodeURIComponent(location.address)}`}>
                  <Button variant="ghost" size="sm" iconName="ArrowLeft">
                    To Here
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Link to="/customer-dashboard/preferences">
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left" fullWidth>
              Add New Location
            </Button>
          </Link>
        </div>
      </div>

      {/* Loyalty Program Status */}
      <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent text-accent-foreground">
              <Icon name="Star" size={20} />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground">
                Empire Elite Status
              </h3>
              <p className="text-sm text-muted-foreground font-inter">
                Gold Member
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-inter font-bold text-accent">
              2,450
            </p>
            <p className="text-xs text-muted-foreground font-inter">
              Points
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm font-inter">
            <span className="text-muted-foreground">Progress to Platinum</span>
            <span className="text-foreground font-medium">2,450 / 5,000</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full luxury-transition"
              style={{ width: '49%' }}
            />
          </div>
          <p className="text-xs text-muted-foreground font-inter">
            1,550 points needed for Platinum status
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-accent/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-inter font-medium text-foreground">
              Next Reward Available
            </span>
            <Button variant="outline" size="sm" iconName="Gift">
              Redeem Points
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;