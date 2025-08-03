import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'Airport Transfers', href: '/vehicle-booking-system' },
        { label: 'Corporate Travel', href: '/vehicle-booking-system' },
        { label: 'Wedding Transportation', href: '/vehicle-booking-system' },
        { label: 'Special Events', href: '/vehicle-booking-system' },
        { label: 'Hourly Service', href: '/vehicle-booking-system' },
        { label: 'Point-to-Point', href: '/vehicle-booking-system' }
      ]
    },
    {
      title: 'Fleet',
      links: [
        { label: 'Premium Sedans', href: '/vehicle-booking-system' },
        { label: 'Luxury SUVs', href: '/vehicle-booking-system' },
        { label: 'Stretch Limousines', href: '/vehicle-booking-system' },
        { label: 'Executive Vans', href: '/vehicle-booking-system' },
        { label: 'Party Buses', href: '/vehicle-booking-system' },
        { label: 'Classic Cars', href: '/vehicle-booking-system' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/homepage' },
        { label: 'Our Chauffeurs', href: '/homepage' },
        { label: 'Safety Standards', href: '/homepage' },
        { label: 'Careers', href: '/homepage' },
        { label: 'Press & Media', href: '/homepage' },
        { label: 'Partner Program', href: '/homepage' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', href: '/homepage' },
        { label: 'Help Center', href: '/homepage' },
        { label: 'Booking Support', href: '/customer-dashboard' },
        { label: 'Corporate Accounts', href: '/homepage' },
        { label: 'Terms of Service', href: '/homepage' },
        { label: 'Privacy Policy', href: '/homepage' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'Facebook', href: '#' },
    { name: 'Twitter', icon: 'Twitter', href: '#' },
    { name: 'Instagram', icon: 'Instagram', href: '#' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#' }
  ];

  const contactInfo = [
    {
      icon: 'Phone',
      label: 'Call Us',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: 'Mail',
      label: 'Email Us',
      value: 'info@empirelane.com',
      href: 'mailto:info@empirelane.com'
    },
    {
      icon: 'MapPin',
      label: 'Visit Us',
      value: '123 Luxury Ave, New York, NY 10001',
      href: '#'
    }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12L21 12M21 12L15 6M21 12L15 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="7" cy="12" r="2" fill="black"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-inter font-semibold text-lg leading-none">Empire Lane</span>
                <span className="font-inter font-light text-sm text-gray-300 leading-none">Limo</span>
              </div>
            </Link>

            {/* Description */}
            <p className="font-inter text-gray-300 leading-relaxed">
              Premium chauffeur and limousine services providing luxury transportation solutions for business, special events, and personal travel across major metropolitan areas.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-accent luxury-transition group"
                >
                  <Icon name={contact.icon} size={18} className="flex-shrink-0 group-hover:text-accent" />
                  <div>
                    <div className="font-inter text-sm font-medium text-white">
                      {contact.label}
                    </div>
                    <div className="font-inter text-sm">
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:text-black luxury-transition"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-inter font-bold text-lg text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="font-inter text-sm text-gray-300 hover:text-accent luxury-transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-inter font-bold text-xl text-white mb-2">
                Stay Updated
              </h3>
              <p className="font-inter text-gray-300">
                Subscribe to receive exclusive offers, service updates, and luxury travel tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <Button
                variant="default"
                size="default"
                className="bg-accent text-black hover:bg-accent/90 px-6"
                iconName="Send"
                iconPosition="right"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="font-inter text-sm text-gray-300">
                © {currentYear} Empire Lane Limo. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  to="/homepage"
                  className="font-inter text-sm text-gray-300 hover:text-accent luxury-transition"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-500">•</span>
                <Link
                  to="/homepage"
                  className="font-inter text-sm text-gray-300 hover:text-accent luxury-transition"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-500">•</span>
                <Link
                  to="/homepage"
                  className="font-inter text-sm text-gray-300 hover:text-accent luxury-transition"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-300">
                <Icon name="Shield" size={16} />
                <span className="font-inter text-xs">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Icon name="CheckCircle" size={16} />
                <span className="font-inter text-xs">DOT Licensed</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Icon name="Award" size={16} />
                <span className="font-inter text-xs">BBB A+ Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;