import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HistoryFilters = ({ 
  activeFilter, 
  dateRange, 
  onFilterChange, 
  onDateRangeChange, 
  bookings 
}) => {
  const getBookingCount = (type) => {
    if (type === 'all') return bookings.length;
    return bookings.filter(booking => 
      booking.bookingType.toLowerCase().includes(type.toLowerCase())
    ).length;
  };

  const typeFilters = [
    { id: 'all', label: 'All Types', icon: 'List' },
    { id: 'airport', label: 'Airport', icon: 'Plane' },
    { id: 'point', label: 'Point to Point', icon: 'Navigation' },
    { id: 'corporate', label: 'Corporate', icon: 'Briefcase' },
    { id: 'sightseeing', label: 'Sightseeing', icon: 'Camera' }
  ];

  const dateFilters = [
    { id: 'all', label: 'All Time' },
    { id: 'week', label: 'Last Week' },
    { id: 'month', label: 'Last Month' },
    { id: 'year', label: 'This Year' }
  ];

  return (
    <div className="mb-8">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-col gap-4">
          {/* Type Filter Buttons */}
          <div>
            <h3 className="text-sm font-inter font-semibold text-foreground mb-3">
              Filter by Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((filter) => {
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
          </div>

          {/* Date Range and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-sm font-inter font-semibold text-foreground mb-3">
                Date Range
              </h3>
              <div className="flex flex-wrap gap-2">
                {dateFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => onDateRangeChange(filter.id)}
                    className={`
                      px-3 py-1.5 rounded-lg luxury-transition text-sm font-inter font-medium
                      ${dateRange === filter.id
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search trips..."
                  className="
                    pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                    placeholder:text-muted-foreground
                  "
                />
              </div>
              
              <Button variant="outline" size="sm" iconName="Download">
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;