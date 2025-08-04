import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useUser } from '../../../contexts/UserContext';
import api from '../../../services/api';

const DashboardStats = () => {
  const { user } = useUser();
  const [stats, setStats] = useState([
    { id: 1, label: "Total Bookings", value: "0", change: "", icon: "Calendar", color: "text-accent" },
    { id: 2, label: "Miles Traveled", value: "0", change: "", icon: "MapPin", color: "text-success" },
    { id: 3, label: "Total Spent", value: "$0", change: "", icon: "DollarSign", color: "text-primary" },
    { id: 4, label: "Loyalty Points", value: "0", change: "", icon: "Star", color: "text-warning" }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        const { data } = await api.get('/bookings/my-bookings');
        const bookings = data.bookings;

        const totalBookings = bookings.length;
        const totalSpent = bookings
          .filter(b => b.status === 'completed' && b.totalAmount)
          .reduce((acc, b) => acc + b.totalAmount, 0);
        const milesTraveled = bookings
          .filter(b => b.status === 'completed' && b.actualDistance)
          .reduce((acc, b) => acc + b.actualDistance, 0);

        setStats([
          { id: 1, label: "Total Bookings", value: totalBookings, change: "", icon: "Calendar", color: "text-accent" },
          { id: 2, label: "Miles Traveled", value: milesTraveled.toLocaleString(), change: "", icon: "MapPin", color: "text-success" },
          { id: 3, label: "Total Spent", value: `$${totalSpent.toLocaleString()}`, change: "", icon: "DollarSign", color: "text-primary" },
          { id: 4, label: "Loyalty Points", value: user.loyaltyPoints || 0, change: "", icon: "Star", color: "text-warning" }
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

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
