import React from 'react';
import Icon from '../../../components/AppIcon';

const DashboardStats = () => {
  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      value: "24",
      change: "+3 this month",
      changeType: "positive",
      icon: "Calendar",
      color: "text-accent"
    },
    {
      id: 2,
      label: "Miles Traveled",
      value: "1,247",
      change: "+156 this month",
      changeType: "positive",
      icon: "MapPin",
      color: "text-success"
    },
    {
      id: 3,
      label: "Total Spent",
      value: "$3,890",
      change: "+$420 this month",
      changeType: "positive",
      icon: "DollarSign",
      color: "text-primary"
    },
    {
      id: 4,
      label: "Loyalty Points",
      value: "2,450",
      change: "+180 this month",
      changeType: "positive",
      icon: "Star",
      color: "text-warning"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card border border-border rounded-lg p-6 luxury-shadow hover:luxury-shadow-lg luxury-transition"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
              <Icon name={stat.icon} size={20} />
            </div>
            <div className="text-right">
              <p className="text-2xl font-inter font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-inter font-medium text-foreground">
              {stat.label}
            </p>
            <p className={`text-xs font-inter ${
              stat.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;