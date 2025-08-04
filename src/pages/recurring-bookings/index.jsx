import React, { useState, useEffect } from 'react';
        import { useNavigate } from 'react-router-dom';
        import { useUser } from '../../contexts/UserContext';
        import api from '../../services/api';
        import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
        import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
        import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
        import Icon from '../../components/AppIcon';
        import Button from '../../components/ui/Button';

        const RecurringBookings = () => {
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
            setLoading(false);
          }, []);

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
                  <p className="text-muted-foreground font-inter">Loading recurring bookings...</p>
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

                  {/* Bookings List */}
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-lg p-12 text-center">
                      <Icon name="Repeat" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-inter font-semibold text-foreground mb-2">
                        No Recurring Bookings
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        You don't have any recurring bookings set up yet.
                      </p>
                      <Button
                        onClick={() => navigate('/vehicle-booking-system')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Create Recurring Booking
                      </Button>
                    </div>
                  </div>
                </div>
              </main>

              {/* Global CTA Button */}
              <GlobalCTAButton variant="floating" />
            </div>
          );
        };

        export default RecurringBookings;
