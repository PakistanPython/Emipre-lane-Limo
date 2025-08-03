import React from 'react';
        import Icon from '../../../components/AppIcon';

        const RecurringStats = ({ bookings }) => {
          const totalTrips = bookings.reduce((sum, booking) => sum + (booking.completedTrips || 0), 0);
          const totalScheduled = bookings.reduce((sum, booking) => sum + (booking.totalTrips || 0), 0);
          const avgPrice = bookings.length > 0 
            ? bookings.reduce((sum, booking) => sum + parseFloat(booking.pricePerTrip?.replace('$', '') || 0), 0) / bookings.length
            : 0;

          const stats = [
            {
              id: 'total',
              label: 'Total Recurring',
              value: bookings.length,
              icon: 'Repeat',
              color: 'text-blue-600 bg-blue-50'
            },
            {
              id: 'active',
              label: 'Active Schedules',
              value: bookings.filter(b => b.status === 'active').length,
              icon: 'Play',
              color: 'text-green-600 bg-green-50'
            },
            {
              id: 'completed',
              label: 'Completed Trips',
              value: totalTrips,
              icon: 'CheckCircle',
              color: 'text-purple-600 bg-purple-50'
            },
            {
              id: 'average',
              label: 'Avg per Trip',
              value: `$${avgPrice.toFixed(0)}`,
              icon: 'DollarSign',
              color: 'text-orange-600 bg-orange-50'
            }
          ];

          return (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-inter text-muted-foreground mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-inter font-bold text-foreground">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon name={stat.icon} size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        };

        export default RecurringStats;