import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import api from '../../services/api';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import HistoryCard from './components/HistoryCard';
import HistoryFilters from './components/HistoryFilters';
import HistoryStats from './components/HistoryStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingHistory = () => {
  const { user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
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
        const { data } = await api.get('/bookings/my-bookings?status=completed');
        setBookings(data.bookings);
        setFilteredBookings(data.bookings);
      } catch (error) {
        console.error("Failed to fetch booking history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  useEffect(() => {
    filterBookings(activeFilter, dateRange);
  }, [bookings, activeFilter, dateRange]);

  const filterBookings = (filter, dateFilter) => {
    let filtered = bookings;
    
    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(booking => booking.bookingType.toLowerCase().includes(filter.toLowerCase()));
    }
    
    // Filter by date range
    if (dateFilter !== 'all') {
      const now = new Date();
      const bookingDate = new Date(booking => booking.date);
      
      switch (dateFilter) {
        case 'week':
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.date);
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return bookingDate >= weekAgo;
          });
          break;
        case 'month':
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.date);
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return bookingDate >= monthAgo;
          });
          break;
        case 'year':
          filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate.getFullYear() === now.getFullYear();
          });
          break;
      }
    }
    
    setFilteredBookings(filtered);
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-inter">Loading booking history...</p>
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
                  Booking History
                </h1>
                <p className="text-muted-foreground font-inter">
                  View your completed trips and manage receipts
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
          <HistoryStats bookings={bookings} />

          {/* Filters */}
          <HistoryFilters 
            activeFilter={activeFilter}
            dateRange={dateRange}
            onFilterChange={handleFilterChange}
            onDateRangeChange={handleDateRangeChange}
            bookings={bookings}
          />

          {/* Bookings List */}
          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="History" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                  No Booking History
                </h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any completed trips matching the selected filters.
                </p>
                <Button 
                  onClick={() => navigate('/vehicle-booking-system')}
                  iconName="Plus" 
                  iconPosition="left"
                >
                  Book Your First Ride
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <HistoryCard 
                    key={booking.id} 
                    booking={booking}
                    onRebook={(booking) => {
                      console.log('Rebook trip:', booking);
                      navigate('/vehicle-booking-system', { 
                        state: { 
                          prebookData: {
                            pickup: booking.pickup,
                            dropoff: booking.dropoff,
                            vehicle: booking.vehicle
                          }
                        }
                      });
                    }}
                    onDownloadReceipt={(receiptId) => console.log('Download receipt:', receiptId)}
                    onRateTrip={(bookingId, rating) => console.log('Rate trip:', bookingId, rating)}
                    onSaveAsFavorite={(booking) => console.log('Save as favorite:', booking)}
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

export default BookingHistory;
