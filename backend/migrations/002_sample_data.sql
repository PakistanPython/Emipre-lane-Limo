-- Empire Lane Limo Sample Data Migration
-- Migration: 002_sample_data.sql
-- Description: Insert sample data for testing and demonstration

-- Enable UUID extension
-- This is already in 001_initial_schema.sql, no need to repeat
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Clear existing data to prevent conflicts on re-run
DELETE FROM pricing_rules;
DELETE FROM testimonials;
DELETE FROM service_areas;
DELETE FROM vehicles;

-- Insert sample service areas
INSERT INTO service_areas (city, state, airport_code, is_primary_market, minimum_fare, airport_surcharge) VALUES
('New York', 'NY', 'JFK', true, 75.00, 15.00),
('New York', 'NY', 'LGA', true, 65.00, 15.00),
('New York', 'NY', 'EWR', true, 85.00, 15.00),
('Los Angeles', 'CA', 'LAX', true, 80.00, 20.00),
('Chicago', 'IL', 'ORD', true, 70.00, 15.00),
('Miami', 'FL', 'MIA', true, 65.00, 12.00),
('San Francisco', 'CA', 'SFO', true, 85.00, 20.00),
('Boston', 'MA', 'BOS', true, 70.00, 15.00),
('Washington', 'DC', 'DCA', true, 75.00, 15.00),
('Atlanta', 'GA', 'ATL', true, 65.00, 12.00);

-- Insert sample vehicles
INSERT INTO vehicles (name, type, brand, model, year, capacity, license_plate, vin, base_hourly_rate, base_distance_rate, airport_transfer_rate, location_city, location_state, features, image_urls) VALUES
('Executive Sedan', 'sedan', 'Mercedes-Benz', 'S-Class', 2023, 3, 'EL001NY', '1HGBH41JXMN109186', 85.00, 3.50, 120.00, 'New York', 'NY', '{"wifi": true, "leather_seats": true, "climate_control": true, "phone_charger": true}', '{"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"}'),
('Luxury SUV', 'suv', 'Cadillac', 'Escalade', 2023, 6, 'EL002NY', '1HGBH41JXMN109187', 120.00, 4.00, 160.00, 'New York', 'NY', '{"wifi": true, "leather_seats": true, "entertainment_system": true, "mini_bar": true, "privacy_partition": true}', '{"https://images.unsplash.com/photo-1544636331-e26879cd4d9b"}'),
('Stretch Limousine', 'limousine', 'Lincoln', 'Town Car', 2022, 8, 'EL003NY', '1HGBH41JXMN109188', 180.00, 5.50, 220.00, 'New York', 'NY', '{"wifi": true, "leather_seats": true, "entertainment_system": true, "mini_bar": true, "mood_lighting": true, "privacy_partition": true}', '{"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"}'),
('Party Bus', 'party_bus', 'Ford', 'E-450', 2023, 20, 'EL004NY', '1HGBH41JXMN109189', 250.00, 7.00, 300.00, 'New York', 'NY', '{"wifi": true, "sound_system": true, "led_lighting": true, "dance_floor": true, "mini_bar": true, "karaoke": true}', '{"https://images.unsplash.com/photo-1544636331-e26879cd4d9b"}'),
('Business Sedan', 'sedan', 'BMW', '7 Series', 2023, 3, 'EL005LA', '1HGBH41JXMN109190', 80.00, 3.25, 115.00, 'Los Angeles', 'CA', '{"wifi": true, "leather_seats": true, "climate_control": true}', '{"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"}'),
('Premium SUV', 'suv', 'Range Rover', 'Autobiography', 2023, 6, 'EL006LA', '1HGBH41JXMN109191', 125.00, 4.25, 165.00, 'Los Angeles', 'CA', '{"wifi": true, "leather_seats": true, "entertainment_system": true, "mini_bar": true}', '{"https://images.unsplash.com/photo-1544636331-e26879cd4d9b"}'),
('Executive Sedan', 'sedan', 'Audi', 'A8', 2023, 3, 'EL007CHI', '1HGBH41JXMN109192', 75.00, 3.00, 110.00, 'Chicago', 'IL', '{"wifi": true, "leather_seats": true, "climate_control": true}', '{"https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"}'),
('Luxury Van', 'luxury_van', 'Mercedes-Benz', 'Sprinter', 2023, 12, 'EL008MIA', '1HGBH41JXMN109193', 150.00, 4.50, 190.00, 'Miami', 'FL', '{"wifi": true, "leather_seats": true, "entertainment_system": true, "mini_bar": true, "conference_table": true}', '{"https://images.unsplash.com/photo-1544636331-e26879cd4d9b"}');

-- Insert sample pricing rules
INSERT INTO pricing_rules (name, rule_type, adjustment_type, adjustment_value, valid_from, valid_until, vehicle_types, service_areas, conditions) VALUES
('Weekend Surge', 'surge_pricing', 'multiplier', 1.25, '2024-01-01 00:00:00+00', '2024-12-31 23:59:59+00', '{"sedan", "suv", "limousine"}', '{"New York", "Los Angeles", "Chicago"}', '{"days_of_week": ["saturday", "sunday"]}'),
('Airport Transfer Base', 'base_rate', 'fixed_amount', 15.00, '2024-01-01 00:00:00+00', NULL, '{"sedan", "suv", "limousine", "luxury_van"}', NULL, '{"service_type": "airport_transfer"}'),
('New Customer Discount', 'discount', 'percentage', 10.00, '2024-01-01 00:00:00+00', '2024-12-31 23:59:59+00', NULL, NULL, '{"customer_type": "new", "max_uses": 1}'),
('Holiday Premium', 'surge_pricing', 'multiplier', 1.50, '2024-12-20 00:00:00+00', '2025-01-05 23:59:59+00', NULL, NULL, '{"holiday_period": true}'),
('Corporate Discount', 'discount', 'percentage', 15.00, '2024-01-01 00:00:00+00', NULL, NULL, NULL, '{"customer_type": "corporate", "minimum_monthly_bookings": 5}');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, customer_title, customer_company, rating, testimonial_text, service_type, is_featured, is_approved, image_url) VALUES
('Alexander Thompson', 'CEO', 'Thompson Industries', 5, 'Empire Lane Limo provided exceptional service for our corporate event. The driver was professional, the vehicle was immaculate, and everything was perfectly on time. Highly recommended for business transportation needs.', 'Corporate Event', true, true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'),
('Sarah Mitchell', 'Wedding Planner', 'Elegant Events', 5, 'We have used Empire Lane Limo for multiple weddings and they never disappoint. Their attention to detail and luxury vehicles make every special day even more memorable. The bridal party always feels like royalty.', 'Wedding Transportation', true, true, 'https://images.unsplash.com/photo-1494790108755-2616b612b786'),
('Michael Rodriguez', 'Executive', 'Global Finance Corp', 5, 'As someone who travels frequently for business, I can say that Empire Lane Limo sets the standard for professional transportation. Reliable, comfortable, and always exceeds expectations.', 'Airport Transfer', true, true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'),
('Jennifer Chen', 'Event Coordinator', 'Premier Productions', 5, 'The party bus service was absolutely fantastic! Our clients had an amazing time and the vehicle was equipped with everything we needed for a successful corporate celebration. Will definitely book again.', 'Corporate Party', true, true, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'),
('David Wilson', 'Private Client', NULL, 5, 'From booking to drop-off, everything was seamless. The luxury sedan was spotless and the chauffeur was courteous and knowledgeable about the city. This is how premium transportation should be done.', 'Personal Transportation', false, true, NULL),
('Lisa Anderson', 'Marketing Director', 'Tech Innovations', 4, 'Great service overall. The SUV was comfortable and perfect for our team outing. Driver was punctual and professional. Minor delay due to traffic but handled well with good communication.', 'Corporate Transportation', false, true, NULL),
('Robert Johnson', 'Private Client', NULL, 5, 'Booked the limousine for our anniversary dinner. The experience was magical from start to finish. Attention to detail was impressive and made our special evening unforgettable.', 'Special Occasion', false, true, NULL),
('Amanda Foster', 'HR Manager', 'Global Solutions Inc', 5, 'We regularly use Empire Lane Limo for executive transportation and client pickups. Consistently reliable service with professional drivers who understand the importance of making great first impressions.', 'Executive Transportation', false, true, NULL);

-- Note: Sample users and bookings are not included in this migration
-- as they would contain sensitive information and should be created
-- through the application's registration and booking processes

