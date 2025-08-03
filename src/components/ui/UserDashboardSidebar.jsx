import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserDashboardSidebar = ({ isOpen = true, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const sidebarItems = [
    {
      id: 'overview',
      label: 'Dashboard Overview',
      icon: 'LayoutDashboard',
      path: '/customer-dashboard',
      type: 'link'
    },
    {
      id: 'bookings',
      label: 'My Bookings',
      icon: 'Calendar',
      type: 'section',
      children: [
        { label: 'Current Bookings', path: '/customer-dashboard/current-bookings', icon: 'Clock' },
        { label: 'Booking History', path: '/customer-dashboard/booking-history', icon: 'History' },
        { label: 'Recurring Bookings', path: '/customer-dashboard/recurring-bookings', icon: 'Repeat' }
      ]
    },
    {
      id: 'quick-book',
      label: 'Quick Book',
      icon: 'Plus',
      path: '/vehicle-booking-system',
      type: 'link',
      highlight: true
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      type: 'section',
      children: [
        { label: 'Profile Settings', path: '/customer-dashboard/profile', icon: 'Settings' },
        { label: 'Payment Methods', path: '/customer-dashboard/payments', icon: 'CreditCard' },
        { label: 'Preferences', path: '/customer-dashboard/preferences', icon: 'Sliders' }
      ]
    },
    {
      id: 'support',
      label: 'Support',
      icon: 'HelpCircle',
      type: 'section',
      children: [
        { label: 'Contact Support', path: '/customer-dashboard/support', icon: 'MessageCircle' },
        { label: 'FAQ', path: '/customer-dashboard/faq', icon: 'FileQuestion' },
        { label: 'Live Chat', path: '/customer-dashboard/chat', icon: 'MessageSquare' }
      ]
    }
  ];

  const SidebarItem = ({ item }) => {
    if (item.type === 'link') {
      return (
        <Link
          to={item.path}
          className={`
            flex items-center px-4 py-3 rounded-lg luxury-transition group
            ${isActiveRoute(item.path) 
              ? 'bg-accent text-accent-foreground' 
              : item.highlight 
              ? 'bg-primary text-primary-foreground hover:bg-secondary'
              : 'text-foreground hover:bg-muted hover:text-accent'
            }
          `}
        >
          <Icon 
            name={item.icon} 
            size={20} 
            className="flex-shrink-0" 
          />
          {isOpen && (
            <span className="ml-3 font-inter font-medium text-sm">
              {item.label}
            </span>
          )}
        </Link>
      );
    }

    if (item.type === 'section') {
      const isExpanded = expandedSections[item.id];
      
      return (
        <div>
          <button
            onClick={() => toggleSection(item.id)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg luxury-transition text-foreground hover:bg-muted hover:text-accent group"
          >
            <div className="flex items-center">
              <Icon 
                name={item.icon} 
                size={20} 
                className="flex-shrink-0" 
              />
              {isOpen && (
                <span className="ml-3 font-inter font-medium text-sm">
                  {item.label}
                </span>
              )}
            </div>
            {isOpen && (
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="luxury-transition group-hover:text-accent" 
              />
            )}
          </button>
          
          {isOpen && isExpanded && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={`
                    flex items-center px-4 py-2 rounded-lg luxury-transition text-sm
                    ${isActiveRoute(child.path) 
                      ? 'bg-accent/10 text-accent border-l-2 border-accent' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  <Icon 
                    name={child.icon} 
                    size={16} 
                    className="flex-shrink-0" 
                  />
                  <span className="ml-3 font-inter">
                    {child.label}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`
        hidden lg:flex flex-col fixed left-0 top-20 bottom-0 z-1000 bg-background border-r border-border luxury-transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
      `}>
        <div className="flex-1 overflow-y-auto py-6">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        {/* Sidebar Toggle */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="w-full justify-center"
          >
            <Icon 
              name={isOpen ? "ChevronLeft" : "ChevronRight"} 
              size={20} 
            />
            {isOpen && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-1000 bg-background border-t border-border">
        <div className="flex items-center justify-around py-2">
          {sidebarItems.slice(0, 4).map((item) => {
            const path = item.type === 'link' ? item.path : '/customer-dashboard';
            return (
              <Link
                key={item.id}
                to={path}
                className={`
                  flex flex-col items-center px-3 py-2 rounded-lg luxury-transition
                  ${isActiveRoute(path) 
                    ? 'text-accent' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon 
                  name={item.icon} 
                  size={20} 
                />
                <span className="text-xs font-inter mt-1">
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default UserDashboardSidebar;