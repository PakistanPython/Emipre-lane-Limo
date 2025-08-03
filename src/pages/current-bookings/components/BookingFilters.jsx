import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BookingFilters = ({ activeFilter, onFilterChange, bookings }) => {
  const getBookingCount = (status) => {
    if (status === 'all') return bookings.length;
    if (status === 'active') {
      return bookings.filter(booking => 
        ['driver_assigned', 'en_route'].includes(booking.status)
      ).length;
    }
    return bookings.filter(booking => booking.status === status).length;
  };

  const filters = [
    { id: 'all', label: 'All Bookings', icon: 'List' },
    { id: 'confirmed', label: 'Confirmed', icon: 'CheckCircle' },
    { id: 'active', label: 'Active', icon: 'Activity' },
    { id: 'pending', label: 'Pending', icon: 'Clock' }
  ];

  return (
    <div className="mb-8">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const count = getBookingCount(filter.id);
              const isActive = activeFilter === filter.id;
              
              return (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg luxury-transition text-sm font-inter font-medium
                    ${isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <Icon name={filter.icon} size={16} />
                  <span>{filter.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-medium
                    ${isActive 
                      ? 'bg-accent-foreground/10 text-accent-foreground' 
                      : 'bg-background text-muted-foreground'
                    }
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search and Sort */}
          <div className="flex-1 flex gap-2 justify-end">
            <div className="relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <input
                type="text"
                placeholder="Search bookings..."
                className="
                  pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                  placeholder:text-muted-foreground
                "
              />
            </div>
            
            <Button variant="outline" size="sm" iconName="Filter">
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;