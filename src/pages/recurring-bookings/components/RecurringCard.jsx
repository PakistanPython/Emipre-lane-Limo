import React, { useState } from 'react';
        import Icon from '../../../components/AppIcon';
        import Button from '../../../components/ui/Button';

        const RecurringCard = ({ 
          booking, 
          onModify, 
          onPause, 
          onResume, 
          onCancel, 
          onSkipNext,
          onViewSchedule 
        }) => {
          const [isExpanded, setIsExpanded] = useState(false);

          const getStatusColor = (status) => {
            switch (status) {
              case 'active':
                return 'text-green-700 bg-green-50 border-green-200';
              case 'paused':
                return 'text-orange-700 bg-orange-50 border-orange-200';
              case 'cancelled':
                return 'text-red-700 bg-red-50 border-red-200';
              default:
                return 'text-muted-foreground bg-muted border-border';
            }
          };

          const getStatusText = (status) => {
            switch (status) {
              case 'active':
                return 'Active';
              case 'paused':
                return 'Paused';
              case 'cancelled':
                return 'Cancelled';
              default:
                return 'Unknown';
            }
          };

          const getStatusIcon = (status) => {
            switch (status) {
              case 'active':
                return 'Play';
              case 'paused':
                return 'Pause';
              case 'cancelled':
                return 'X';
              default:
                return 'Circle';
            }
          };

          const getScheduleText = (schedule) => {
            switch (schedule.type) {
              case 'daily':
                return schedule.frequency === 'weekdays' ? 'Weekdays' : 'Every day';
              case 'weekly':
                const days = schedule.frequency.split(',').map(day => 
                  day.charAt(0).toUpperCase() + day.slice(1)
                ).join(', ');
                return `Every ${days}`;
              case 'monthly':
                return `${schedule.frequency} of each month`;
              default:
                return 'Custom schedule';
            }
          };

          const getNextTripText = (nextTrip) => {
            if (!nextTrip) return 'No upcoming trips';
            
            const tripDate = new Date(nextTrip);
            const now = new Date();
            const diffTime = tripDate.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Tomorrow';
            if (diffDays < 7) return `In ${diffDays} days`;
            
            return tripDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
          };

          return (
            <div className="bg-card border border-border rounded-lg luxury-shadow hover:shadow-lg luxury-transition">
              {/* Main Card Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    {/* Status and Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`
                        flex items-center gap-2 px-3 py-1 rounded-full text-xs font-inter font-medium border
                        ${getStatusColor(booking.status)}
                      `}>
                        <Icon name={getStatusIcon(booking.status)} size={12} />
                        {getStatusText(booking.status)}
                      </span>
                      <span className="text-sm text-muted-foreground font-inter">
                        #{booking.id}
                      </span>
                    </div>

                    {/* Booking Name */}
                    <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                      {booking.name}
                    </h3>

                    {/* Schedule and Next Trip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Calendar" size={16} className="text-muted-foreground" />
                          <span className="text-sm font-inter font-medium text-foreground">
                            {getScheduleText(booking.schedule)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Clock" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground font-inter">
                            {booking.schedule.time} • {booking.estimatedDuration}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                          <span className="text-sm font-inter font-medium text-foreground">
                            Next Trip: {getNextTripText(booking.nextTrip)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground font-inter">
                            {booking.pricePerTrip} per trip
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

                    {/* Progress */}
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-inter font-medium text-foreground">
                          Progress
                        </span>
                        <span className="text-sm text-muted-foreground font-inter">
                          {booking.completedTrips} / {booking.totalTrips} trips
                        </span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div 
                          className="bg-accent h-2 rounded-full luxury-transition" 
                          style={{ 
                            width: `${Math.min((booking.completedTrips / booking.totalTrips) * 100, 100)}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Driver Info */}
                    {booking.driver && (
                      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg mb-4">
                        <img
                          src={booking.driver.avatar}
                          alt={booking.driver.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-inter font-semibold text-foreground">
                              {booking.driver.name}
                            </p>
                            {booking.driver.preferred && (
                              <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full font-medium">
                                Preferred
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span className="text-xs text-muted-foreground font-inter">
                              {booking.driver.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-border pt-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                              Schedule Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Type:</span>
                                <span className="font-medium capitalize">{booking.schedule.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Start Date:</span>
                                <span className="font-medium">
                                  {new Date(booking.schedule.startDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">End Date:</span>
                                <span className="font-medium">
                                  {new Date(booking.schedule.endDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Billing:</span>
                                <span className="font-medium capitalize">{booking.billing}</span>
                              </div>
                            </div>
                          </div>
                          
                          {booking.specialRequirements && (
                            <div>
                              <h4 className="text-sm font-inter font-semibold text-foreground mb-2">
                                Special Requirements
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {booking.specialRequirements}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    {booking.status === 'active' && booking.nextTrip && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        iconName="SkipForward" 
                        iconPosition="left"
                        onClick={() => onSkipNext?.(booking.id)}
                      >
                        Skip Next
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="Edit" 
                      iconPosition="left"
                      onClick={() => onModify?.(booking.id)}
                    >
                      Modify
                    </Button>
                    
                    {booking.status === 'active' ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Pause" 
                        iconPosition="left"
                        onClick={() => onPause?.(booking.id)}
                      >
                        Pause
                      </Button>
                    ) : booking.status === 'paused' ? (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        iconName="Play" 
                        iconPosition="left"
                        onClick={() => onResume?.(booking.id)}
                      >
                        Resume
                      </Button>
                    ) : null}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName="Calendar" 
                      iconPosition="left"
                      onClick={() => onViewSchedule?.(booking.id)}
                    >
                      Schedule
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      iconName={isExpanded ? "ChevronUp" : "ChevronDown"} 
                      iconPosition="left"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        };

        export default RecurringCard;