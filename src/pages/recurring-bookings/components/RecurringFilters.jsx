import React from 'react';
        import Button from '../../../components/ui/Button';
        import Icon from '../../../components/AppIcon';

        const RecurringFilters = ({ activeFilter, onFilterChange, bookings }) => {
          const getBookingCount = (filterType) => {
            switch (filterType) {
              case 'all':
                return bookings.length;
              case 'active':
                return bookings.filter(booking => booking.status === 'active').length;
              case 'paused':
                return bookings.filter(booking => booking.status === 'paused').length;
              case 'daily':
                return bookings.filter(booking => booking.schedule?.type === 'daily').length;
              case 'weekly':
                return bookings.filter(booking => booking.schedule?.type === 'weekly').length;
              case 'monthly':
                return bookings.filter(booking => booking.schedule?.type === 'monthly').length;
              default:
                return 0;
            }
          };

          const filters = [
            { id: 'all', label: 'All Recurring', icon: 'List' },
            { id: 'active', label: 'Active', icon: 'Play' },
            { id: 'paused', label: 'Paused', icon: 'Pause' },
            { id: 'daily', label: 'Daily', icon: 'Sun' },
            { id: 'weekly', label: 'Weekly', icon: 'Calendar' },
            { id: 'monthly', label: 'Monthly', icon: 'CalendarDays' }
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
                        placeholder="Search recurring bookings..."
                        className="
                          pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm
                          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                          placeholder:text-muted-foreground
                        "
                      />
                    </div>
                    
                    <Button variant="outline" size="sm" iconName="Calendar">
                      <span className="hidden sm:inline">Schedule</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default RecurringFilters;