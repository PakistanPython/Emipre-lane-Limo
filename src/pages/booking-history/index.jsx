import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import HistoryCard from './components/HistoryCard';
import HistoryFilters from './components/HistoryFilters';
import HistoryStats from './components/HistoryStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BookingHistory = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const navigate = useNavigate();

  // Mock data for booking history
  const mockHistoryBookings = [
    {
      id: "BK-2024-156",
      date: "2024-12-15",
      time: "03:30 PM",
      pickup: "JFK Airport Terminal 1",
      dropoff: "Manhattan Financial District",
      vehicle: "Mercedes S-Class",
      driver: {
        name: "Robert Davis",
        rating: 4.9,
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face"
      },
      status: "completed",
      duration: "42 mins",
      price: "$145.00",
      bookingType: "Airport Transfer",
      rating: 5,
      receiptId: "RCP-2024-156",
      tripPhotos: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=300&h=200&fit=crop"]
    },
    {
      id: "BK-2024-142",
      date: "2024-12-08",
      time: "09:15 AM",
      pickup: "The Plaza Hotel",
      dropoff: "Central Park Zoo",
      vehicle: "BMW 7 Series",
      driver: {
        name: "Lisa Zhang",
        rating: 4.8,
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      status: "completed",
      duration: "18 mins",
      price: "$65.00",
      bookingType: "Point to Point",
      rating: 4,
      receiptId: "RCP-2024-142",
      tripPhotos: null
    },
    {
      id: "BK-2024-138",
      date: "2024-12-05",
      time: "07:45 PM",
      pickup: "Corporate Office - 5th Ave",
      dropoff: "LaGuardia Airport",
      vehicle: "Cadillac Escalade",
      driver: {
        name: "Thomas Wilson",
        rating: 4.7,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      status: "completed",
      duration: "38 mins",
      price: "$110.00",
      bookingType: "Corporate",
      rating: 5,
      receiptId: "RCP-2024-138",
      tripPhotos: null
    },
    {
      id: "BK-2024-125",
      date: "2024-11-28",
      time: "02:00 PM",
      pickup: "Statue of Liberty",
      dropoff: "Times Square",
      vehicle: "Tesla Model S",
      driver: {
        name: "Maria Rodriguez",
        rating: 4.9,
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
      },
      status: "completed",
      duration: "35 mins",
      price: "$95.00",
      bookingType: "Sightseeing",
      rating: 5,
      receiptId: "RCP-2024-125",
      tripPhotos: ["https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop"]
    },
    {
      id: "BK-2024-112",
      date: "2024-11-20",
      time: "06:30 AM",
      pickup: "Home - Brooklyn Heights",
      dropoff: "Newark Airport",
      vehicle: "Mercedes E-Class",
      driver: {
        name: "David Kim",
        rating: 4.6,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      status: "completed",
      duration: "55 mins",
      price: "$165.00",
      bookingType: "Airport Transfer",
      rating: 4,
      receiptId: "RCP-2024-112",
      tripPhotos: null
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
      setBookings(mockHistoryBookings);
      setFilteredBookings(mockHistoryBookings);
      setLoading(false);
    }, 1000);
  }, [navigate]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-inter">Loading booking history...</p>
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