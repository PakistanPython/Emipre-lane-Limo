import React, { useState, useEffect } from 'react';
        import { useNavigate } from 'react-router-dom';
        import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
        import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
        import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
        import RecurringCard from './components/RecurringCard';
        import RecurringFilters from './components/RecurringFilters';
        import RecurringStats from './components/RecurringStats';
        import Icon from '../../components/AppIcon';
        import Button from '../../components/ui/Button';

        const RecurringBookings = () => {
          const [isAuthenticated, setIsAuthenticated] = useState(false);
          const [sidebarOpen, setSidebarOpen] = useState(true);
          const [loading, setLoading] = useState(true);
          const [bookings, setBookings] = useState([]);
          const [filteredBookings, setFilteredBookings] = useState([]);
          const [activeFilter, setActiveFilter] = useState('all');
          const navigate = useNavigate();

          // Mock data for recurring bookings
          const mockRecurringBookings = [
            {
              id: "RB-2025-001",
              name: "Daily Airport Commute",
              pickup: "Manhattan Financial District",
              dropoff: "JFK Airport Terminal 4",
              vehicle: "Mercedes S-Class",
              schedule: {
                type: "daily",
                frequency: "weekdays",
                time: "07:30 AM",
                startDate: "2025-01-15",
                endDate: "2025-12-31"
              },
              driver: {
                name: "James Wilson",
                rating: 4.9,
                preferred: true,
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              },
              status: "active",
              nextTrip: "2025-01-28T07:30:00",
              pricePerTrip: "$125.00",
              estimatedDuration: "45 mins",
              totalTrips: 45,
              completedTrips: 12,
              specialRequirements: "Child seat required",
              billing: "corporate"
            },
            {
              id: "RB-2025-002", 
              name: "Weekly Client Meetings",
              pickup: "The Plaza Hotel",
              dropoff: "Corporate Office - 5th Ave",
              vehicle: "BMW 7 Series",
              schedule: {
                type: "weekly", 
                frequency: "tuesday,thursday",
                time: "02:00 PM",
                startDate: "2025-01-07",
                endDate: "2025-06-30"
              },
              driver: {
                name: "Michael Chen",
                rating: 4.8,
                preferred: false,
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              },
              status: "active",
              nextTrip: "2025-01-28T14:00:00",
              pricePerTrip: "$85.00",
              estimatedDuration: "25 mins",
              totalTrips: 48,
              completedTrips: 8,
              specialRequirements: null,
              billing: "personal"
            },
            {
              id: "RB-2025-003",
              name: "Monthly Medical Appointments",
              pickup: "Home - Brooklyn Heights", 
              dropoff: "NYU Medical Center",
              vehicle: "Tesla Model S",
              schedule: {
                type: "monthly",
                frequency: "15th",
                time: "10:00 AM",
                startDate: "2025-01-15",
                endDate: "2025-12-15"
              },
              driver: {
                name: "Sarah Johnson",
                rating: 4.9,
                preferred: true,
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              },
              status: "active",
              nextTrip: "2025-02-15T10:00:00",
              pricePerTrip: "$95.00",
              estimatedDuration: "35 mins",
              totalTrips: 12,
              completedTrips: 1,
              specialRequirements: "Wheelchair accessible",
              billing: "insurance"
            },
            {
              id: "RB-2025-004",
              name: "Weekend Airport Transfers",
              pickup: "LaGuardia Airport",
              dropoff: "Manhattan - Various Hotels",
              vehicle: "Cadillac Escalade",
              schedule: {
                type: "weekly",
                frequency: "saturday,sunday", 
                time: "06:00 PM",
                startDate: "2025-01-04",
                endDate: "2025-03-30"
              },
              driver: null,
              status: "paused",
              nextTrip: null,
              pricePerTrip: "$110.00",
              estimatedDuration: "40 mins",
              totalTrips: 24,
              completedTrips: 4,
              specialRequirements: "Multiple drop-off points",
              billing: "corporate"
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
              setBookings(mockRecurringBookings);
              setFilteredBookings(mockRecurringBookings);
              setLoading(false);
            }, 1000);
          }, [navigate]);

          useEffect(() => {
            filterBookings(activeFilter);
          }, [bookings, activeFilter]);

          const filterBookings = (filter) => {
            let filtered = bookings;
            
            switch (filter) {
              case 'active':
                filtered = bookings.filter(booking => booking.status === 'active');
                break;
              case 'paused':
                filtered = bookings.filter(booking => booking.status === 'paused');
                break;
              case 'daily':
                filtered = bookings.filter(booking => booking.schedule.type === 'daily');
                break;
              case 'weekly':
                filtered = bookings.filter(booking => booking.schedule.type === 'weekly');
                break;
              case 'monthly':
                filtered = bookings.filter(booking => booking.schedule.type === 'monthly');
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
                  <p className="text-muted-foreground font-inter">Loading recurring bookings...</p>
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
                          Recurring Bookings
                        </h1>
                        <p className="text-muted-foreground font-inter">
                          Manage your scheduled regular transportation services
                        </p>
                      </div>
                      
                      <Button 
                        onClick={() => navigate('/vehicle-booking-system')}
                        iconName="Plus" 
                        iconPosition="left"
                      >
                        New Recurring Booking
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <RecurringStats bookings={bookings} />

                  {/* Filters */}
                  <RecurringFilters 
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                    bookings={bookings}
                  />

                  {/* Bookings List */}
                  <div className="space-y-6">
                    {filteredBookings.length === 0 ? (
                      <div className="bg-card border border-border rounded-lg p-12 text-center">
                        <Icon name="Repeat" size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                          {activeFilter === 'all' ? 'No Recurring Bookings' : `No ${activeFilter} Recurring Bookings`}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {activeFilter === 'all' 
                            ? "You don't have any recurring bookings set up yet." 
                            : `You don't have any ${activeFilter} recurring bookings at the moment.`
                          }
                        </p>
                        <Button 
                          onClick={() => navigate('/vehicle-booking-system')}
                          iconName="Plus" 
                          iconPosition="left"
                        >
                          Create Recurring Booking
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {filteredBookings.map((booking) => (
                          <RecurringCard 
                            key={booking.id} 
                            booking={booking}
                            onModify={(bookingId) => console.log('Modify recurring booking:', bookingId)}
                            onPause={(bookingId) => console.log('Pause recurring booking:', bookingId)}
                            onResume={(bookingId) => console.log('Resume recurring booking:', bookingId)}
                            onCancel={(bookingId) => console.log('Cancel recurring booking:', bookingId)}
                            onSkipNext={(bookingId) => console.log('Skip next trip:', bookingId)}
                            onViewSchedule={(bookingId) => console.log('View full schedule:', bookingId)}
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

        export default RecurringBookings;