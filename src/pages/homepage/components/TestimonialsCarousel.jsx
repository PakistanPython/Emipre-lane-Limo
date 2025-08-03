import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      title: 'CEO, TechCorp',
      location: 'New York, NY',
      rating: 5,
      content: `Empire Lane Limo has been our go-to transportation service for all corporate events and client meetings. Their professionalism and attention to detail is unmatched. The vehicles are always immaculate and the chauffeurs are courteous and punctual.`,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      service: 'Corporate Travel'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      title: 'Wedding Planner',
      location: 'Los Angeles, CA',
      rating: 5,
      content: `I've coordinated over 200 weddings and Empire Lane Limo consistently delivers exceptional service. Their stretch limousines are stunning and the red carpet treatment makes every couple feel like royalty. Highly recommended for special occasions.`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',service: 'Wedding Transportation'
    },
    {
      id: 3,
      name: 'Jennifer Chen',title: 'Business Executive',location: 'San Francisco, CA',
      rating: 5,
      content: `As someone who travels frequently for business, I appreciate the reliability and luxury that Empire Lane Limo provides. Their airport transfer service is seamless, and I can always count on them to be on time. The Wi-Fi and comfortable seating allow me to work during transit.`,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',service: 'Airport Transfers'
    },
    {
      id: 4,
      name: 'David Thompson',title: 'Event Coordinator',location: 'Chicago, IL',
      rating: 5,
      content: `Empire Lane Limo handled transportation for our annual corporate gala with 150+ attendees. Their fleet coordination was flawless, and every guest arrived in style and on time. The level of service exceeded our expectations.`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',service: 'Event Transportation'
    },
    {
      id: 5,
      name: 'Amanda Foster',title: 'Marketing Director',location: 'Miami, FL',
      rating: 5,
      content: `The luxury SUV service for our client entertainment was perfect. The chauffeur was professional, the vehicle was spotless, and the amenities made our VIP clients feel truly special. We'll definitely be using Empire Lane Limo for all future events.`,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      service: 'VIP Service'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-accent fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-inter font-bold text-3xl md:text-4xl text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued clients have to say about their premium transportation experience with Empire Lane Limo.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main Testimonial */}
          <div className="bg-white rounded-2xl luxury-shadow-lg p-8 md:p-12 mb-8">
            <div className="max-w-4xl mx-auto">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Quote" size={24} className="text-accent" />
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-center mb-8">
                <p className="font-inter text-lg md:text-xl text-foreground leading-relaxed mb-6">
                  "{testimonials[currentIndex].content}"
                </p>
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full object-cover luxury-shadow"
                  />
                  <div className="text-center md:text-left">
                    <h4 className="font-inter font-bold text-lg text-primary">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="font-inter text-sm text-muted-foreground">
                      {testimonials[currentIndex].title}
                    </p>
                    <p className="font-inter text-sm text-muted-foreground">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start space-y-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonials[currentIndex].rating)}
                  </div>
                  <span className="font-inter text-sm text-accent font-medium">
                    {testimonials[currentIndex].service}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full p-0"
              iconName="ChevronLeft"
            />

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`
                    w-3 h-3 rounded-full luxury-transition
                    ${index === currentIndex 
                      ? 'bg-accent' :'bg-border hover:bg-accent/50'
                    }
                  `}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={goToNext}
              className="w-10 h-10 rounded-full p-0"
              iconName="ChevronRight"
            />
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name={isAutoPlaying ? "Play" : "Pause"} size={16} />
              <span className="font-inter text-sm">
                {isAutoPlaying ? "Auto-playing" : "Paused"}
              </span>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="font-inter font-bold text-3xl text-accent mb-2">500+</div>
            <div className="font-inter text-sm text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="font-inter font-bold text-3xl text-accent mb-2">5.0</div>
            <div className="font-inter text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="font-inter font-bold text-3xl text-accent mb-2">24/7</div>
            <div className="font-inter text-sm text-muted-foreground">Service Available</div>
          </div>
          <div className="text-center">
            <div className="font-inter font-bold text-3xl text-accent mb-2">99%</div>
            <div className="font-inter text-sm text-muted-foreground">On-Time Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;