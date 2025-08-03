import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegistrationTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Corporate Executive',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: `Empire Lane Limo has transformed my business travel. The booking process is seamless, and I never have to worry about being late for important meetings.`,
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Event Planner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: `For high-profile events, reliability is everything. Empire Lane consistently delivers exceptional service that exceeds my clients' expectations.`,
      rating: 5
    },
    {
      id: 3,
      name: 'Jennifer Davis',role: 'Frequent Traveler',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: `The account dashboard makes managing my travel so much easier. I can track expenses, rebook favorite routes, and everything is organized perfectly.`,
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < rating ? "var(--color-accent)" : "var(--color-border)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-inter font-semibold text-foreground mb-2">
          Trusted by Professionals
        </h3>
        <p className="text-sm text-muted-foreground">
          See what our registered customers say about their experience
        </p>
      </div>

      <div className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-background border border-border rounded-lg p-4 luxury-shadow">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-inter font-medium text-sm text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {testimonial.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} color="var(--color-accent)" />
          <span>Join 10,000+ satisfied customers</span>
        </div>
      </div>
    </div>
  );
};

export default RegistrationTestimonials;