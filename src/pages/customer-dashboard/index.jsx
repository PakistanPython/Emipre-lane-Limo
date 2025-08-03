import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationAwareHeader from '../../components/ui/AuthenticationAwareHeader';
import UserDashboardSidebar from '../../components/ui/UserDashboardSidebar';
import GlobalCTAButton from '../../components/ui/GlobalCTAButton';
import DashboardStats from './components/DashboardStats';
import UpcomingBookings from './components/UpcomingBookings';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import AccountOverview from './components/AccountOverview';
import Icon from '../../components/AppIcon';

const CustomerDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setIsAuthenticated(true);
    setLoading(false);
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'bookings', label: 'Bookings', icon: 'Calendar' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'account', label: 'Account', icon: 'User' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-inter">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <DashboardStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <UpcomingBookings />
                <RecentActivity />
              </div>
              <div className="space-y-8">
                <QuickActions />
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div className="space-y-8">
            <UpcomingBookings />
          </div>
        );
      case 'activity':
        return (
          <div className="space-y-8">
            <RecentActivity />
          </div>
        );
      case 'account':
        return (
          <div className="space-y-8">
            <AccountOverview />
          </div>
        );
      default:
        return null;
    }
  };

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
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-inter font-bold text-foreground mb-2">
                  Welcome back, Alexander
                </h1>
                <p className="text-muted-foreground font-inter">
                  Manage your bookings and account preferences
                </p>
              </div>
              
              {/* Mobile Tab Navigation */}
              <div className="lg:hidden">
                <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-md luxury-transition text-sm font-inter font-medium
                        ${activeTab === tab.id 
                          ? 'bg-background text-foreground luxury-shadow' 
                          : 'text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Tab Navigation */}
          <div className="hidden lg:block mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 py-4 px-1 border-b-2 luxury-transition font-inter font-medium text-sm
                      ${activeTab === tab.id
                        ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                      }
                    `}
                  >
                    <Icon name={tab.icon} size={16} />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </main>

      {/* Global CTA Button */}
      <GlobalCTAButton variant="floating" />
    </div>
  );
};

export default CustomerDashboard;