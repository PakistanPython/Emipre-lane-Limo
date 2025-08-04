import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import api from '../../services/api';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import BookingCard from './components/BookingCard';
import BookingFilters from './components/BookingFilters';
import BookingStats from './components/BookingStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CurrentBookings = () => {
  const { user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate('/login');
    }
  }, [user, userLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/bookings/my-bookings');
        const currentBookings = data.bookings.filter(
          (b) => b.status !== 'completed' && b.status !== 'cancelled'
        );
        setBookings(currentBookings);
        setFilteredBookings(currentBookings);
      } catch (error) {
        console.error("Failed to fetch current bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

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

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-inter">Loading current bookings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
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
