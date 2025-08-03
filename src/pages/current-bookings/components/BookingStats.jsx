import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingStats = ({ bookings }) => {
  const stats = [
    {
      id: 'total',
      label: 'Total Bookings',
      value: bookings.length,
      icon: 'Calendar',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      value: bookings.filter(b => b.status === 'confirmed').length,
      icon: 'CheckCircle',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'active',
      label: 'Active Trips',
      value: bookings.filter(b => ['driver_assigned', 'en_route'].includes(b.status)).length,
      icon: 'Activity',
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 'pending',
      label: 'Pending',
      value: bookings.filter(b => b.status === 'pending').length,
      icon: 'Clock',
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

export default BookingStats;