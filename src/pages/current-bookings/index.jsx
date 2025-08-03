import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingStats from './components/BookingStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CurrentBookings = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  // Mock data for current bookings
  const mockBookings = [
    {
      id: "BK-2025-001",
      date: "2025-01-28",
      time: "09:30 AM",
      pickup: "Manhattan Financial District",
      dropoff: "JFK Airport Terminal 4",
      vehicle: "Mercedes S-Class",
      driver: {
        name: "James Wilson",
        rating: 4.9,
        phone: "+1 (555) 123-4567",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      status: "confirmed",
      estimatedDuration: "45 mins",
      price: "$125.00",
      bookingType: "Airport Transfer",
      specialRequirements: "Child seat required"
    },
    {
      id: "BK-2025-002",
      date: "2025-01-30",
      time: "07:00 PM",
      pickup: "The Plaza Hotel",
      dropoff: "Lincoln Center",
      vehicle: "BMW 7 Series",
      driver: {
        name: "Michael Chen",
        rating: 4.8,
        phone: "+1 (555) 987-6543",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      status: "driver_assigned",
      estimatedDuration: "25 mins",
      price: "$85.00",
      bookingType: "Point to Point",
      specialRequirements: null
    },
    {
      id: "BK-2025-003",
      date: "2025-02-02",
      time: "02:00 PM",
      pickup: "Corporate Office - 5th Ave",
      dropoff: "LaGuardia Airport",
      vehicle: "Cadillac Escalade",
      driver: null,
      status: "pending",
      estimatedDuration: "35 mins",
      price: "$95.00",
      bookingType: "Corporate",
      specialRequirements: "Corporate account billing"
    },
    {
      id: "BK-2025-004",
      date: "2025-01-28",
      time: "11:00 AM",
      pickup: "Brooklyn Bridge",
      dropoff: "Statue of Liberty",
      vehicle: "Tesla Model S",
      driver: {
        name: "Sarah Johnson",
        rating: 4.9,
        phone: "+1 (555) 456-7890",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      status: "en_route",
      estimatedDuration: "40 mins",
      price: "$110.00",
      bookingType: "Sightseeing",
      specialRequirements: null
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
    
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setFilteredBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    filterBookings(activeFilter);
  }, [bookings, activeFilter]);

  const filterBookings = (filter) => {
    let filtered = bookings;
    
    switch (filter) {
      case 'confirmed':
        filtered = bookings.filter(booking => booking.status === 'confirmed');
        break;
      case 'active':
        filtered = bookings.filter(booking => ['driver_assigned', 'en_route'].includes(booking.status));
        break;
      case 'pending':
        filtered = bookings.filter(booking => booking.status === 'pending');
        break;
      default:
        filtered = bookings;
    }
    
    setFilteredBookings(filtered);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-inter">Loading current bookings...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AuthenticationAwareHeader />
      <UserDashboardSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <main className={`
        pt-20 pb-20 lg:pb-8 luxury-transition-all duration-300
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}
      `}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-inter font-bold text-foreground mb-2">
                  Current Bookings
                </h1>
                <p className="text-muted-foreground font-inter">
                  Manage your active and upcoming reservations
                </p>
              </div>
              
              <Button 
                onClick={() => navigate('/vehicle-booking-system')}
                iconName="Plus" 
                iconPosition="left"
              >
                New Booking
              </Button>
            </div>
          </div>

          {/* Stats */}
          <BookingStats bookings={bookings} />

          {/* Filters */}
          <BookingFilters 
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            bookings={bookings}
          />

          {/* Bookings List */}
          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                  {activeFilter === 'all' ? 'No Current Bookings' : `No ${activeFilter} Bookings`}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {activeFilter === 'all' 
                    ? "You don't have any current bookings." 
                    : `You don't have any ${activeFilter} bookings at the moment.`
                  }
                </p>
                <Button 
                  onClick={() => navigate('/vehicle-booking-system')}
                  iconName="Plus" 
                  iconPosition="left"
                >
                  Book a Ride
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <BookingCard 
                    key={booking.id} 
                    booking={booking}
                    onModify={(bookingId) => console.log('Modify booking:', bookingId)}
                    onCancel={(bookingId) => console.log('Cancel booking:', bookingId)}
                    onTrack={(bookingId) => console.log('Track booking:', bookingId)}
                    onContactDriver={(booking) => console.log('Contact driver:', booking.driver)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Global CTA Button */}
      <GlobalCTAButton variant="floating" />
    </div>
  );
};

export default CurrentBookings;