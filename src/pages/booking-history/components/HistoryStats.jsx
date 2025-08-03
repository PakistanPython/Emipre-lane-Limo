import React from 'react';
import Icon from '../../../components/AppIcon';

const HistoryStats = ({ bookings }) => {
  const totalTrips = bookings.length;
  const totalSpent = bookings.reduce((sum, booking) => {
    return sum + parseFloat(booking.price.replace('$', ''));
  }, 0);
  
  const averageRating = bookings.reduce((sum, booking) => {
    return sum + (booking.rating || 0);
  }, 0) / bookings.length;

  const favoriteVehicle = bookings.reduce((acc, booking) => {
    acc[booking.vehicle] = (acc[booking.vehicle] || 0) + 1;
    return acc;
  }, {});
  
  const mostUsedVehicle = Object.keys(favoriteVehicle).reduce((a, b) => 
    favoriteVehicle[a] > favoriteVehicle[b] ? a : b, ''
  );

  const stats = [
    {
      id: 'trips',
      label: 'Total Trips',
      value: totalTrips,
      icon: 'MapPin',
      color: 'text-blue-600 bg-blue-50',
      subtext: 'Completed successfully'
    },
    {
      id: 'spent',
      label: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: 'DollarSign',
      color: 'text-green-600 bg-green-50',
      subtext: 'Across all bookings'
    },
    {
      id: 'rating',
      label: 'Average Rating',
      value: averageRating.toFixed(1),
      icon: 'Star',
      color: 'text-yellow-600 bg-yellow-50',
      subtext: 'Given to drivers'
    },
    {
      id: 'vehicle',
      label: 'Preferred Vehicle',
      value: mostUsedVehicle.split(' ')[0] || 'Mercedes',
      icon: 'Car',
      color: 'text-purple-600 bg-purple-50',
      subtext: 'Most frequently used'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-inter font-bold text-foreground mb-1">
              {stat.value}
            </p>
            <p className="text-sm font-inter font-medium text-foreground mb-1">
              {stat.label}
            </p>
            <p className="text-xs text-muted-foreground">
              {stat.subtext}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryStats;