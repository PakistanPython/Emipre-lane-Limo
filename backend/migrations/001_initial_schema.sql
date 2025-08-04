-- Empire Lane Limo Database Schema Migration
-- Migration: 001_initial_schema.sql
-- Description: Create initial database schema for Empire Lane Limo application

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(200),
    phone VARCHAR(20) UNIQUE,
    role VARCHAR(30) NOT NULL DEFAULT 'customer', -- 'customer', 'admin', 'driver'
    membership_tier VARCHAR(50) DEFAULT 'standard', -- 'standard', 'premium', 'vip'
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);



-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'sedan', 'suv', 'limousine', 'party_bus', 'luxury_van'
    brand VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    vin VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(50),
    fuel_type VARCHAR(30) DEFAULT 'gasoline',
    transmission VARCHAR(20) DEFAULT 'automatic',
    features JSONB, -- amenities like wifi, bar, entertainment system
    base_hourly_rate DECIMAL(10,2) NOT NULL,
    base_distance_rate DECIMAL(10,2) NOT NULL,
    airport_transfer_rate DECIMAL(10,2),
    minimum_booking_hours INTEGER DEFAULT 2,
    image_urls TEXT[], -- array of image URLs
    is_available BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    maintenance_due_date DATE,
    insurance_expiry_date DATE,
    registration_expiry_date DATE,
    mileage INTEGER DEFAULT 0,
    location_city VARCHAR(100),
    location_state VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service_areas table
CREATE TABLE IF NOT EXISTS service_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    country VARCHAR(50) NOT NULL DEFAULT 'United States',
    airport_code VARCHAR(10),
    is_primary_market BOOLEAN DEFAULT false,
    base_rate_multiplier DECIMAL(4,2) DEFAULT 1.00,
    minimum_fare DECIMAL(8,2),
    airport_surcharge DECIMAL(8,2),
    coverage_radius_miles INTEGER DEFAULT 50,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    booking_number VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'
    booking_type VARCHAR(30) NOT NULL, -- 'point_to_point', 'hourly', 'airport_transfer', 'event'
    service_city VARCHAR(100) NOT NULL,
    pickup_location TEXT NOT NULL,
    pickup_latitude DECIMAL(10,8),
    pickup_longitude DECIMAL(11,8),
    dropoff_location TEXT,
    dropoff_latitude DECIMAL(10,8),
    dropoff_longitude DECIMAL(11,8),
    pickup_date DATE NOT NULL,
    pickup_time TIME NOT NULL,
    estimated_duration_minutes INTEGER,
    actual_duration_minutes INTEGER,
    estimated_distance_miles DECIMAL(8,2),
    actual_distance_miles DECIMAL(8,2),
    is_airport_transfer BOOLEAN DEFAULT false,
    flight_number VARCHAR(20),
    airline VARCHAR(100),
    terminal VARCHAR(10),
    meet_and_greet BOOLEAN DEFAULT false,
    flight_monitoring BOOLEAN DEFAULT false,
    wait_time_included_minutes INTEGER DEFAULT 15,
    special_requirements TEXT,
    passenger_count INTEGER DEFAULT 1,
    estimated_price DECIMAL(10,2) NOT NULL,
    final_price DECIMAL(10,2),
    gratuity_amount DECIMAL(10,2),
    total_amount DECIMAL(10,2),
    payment_status VARCHAR(30) DEFAULT 'pending', -- 'pending', 'authorized', 'captured', 'refunded', 'failed'
    payment_method VARCHAR(30), -- 'credit_card', 'debit_card', 'corporate_account', 'cash'
    payment_reference VARCHAR(100),
    is_recurring BOOLEAN DEFAULT false,
    recurring_pattern VARCHAR(50), -- 'daily', 'weekly', 'monthly', 'custom'
    recurring_end_date DATE,
    parent_booking_id UUID REFERENCES bookings(id),
    driver_id UUID, -- will be added when driver management is implemented
    driver_notes TEXT,
    customer_rating INTEGER CHECK (customer_rating >= 1 AND customer_rating <= 5),
    customer_feedback TEXT,
    internal_notes TEXT,
    cancellation_reason TEXT,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create booking_activities table
CREATE TABLE IF NOT EXISTS booking_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'created', 'confirmed', 'modified', 'cancelled', 'started', 'completed', 'payment_processed'
    description TEXT NOT NULL,
    performed_by_user_id UUID REFERENCES users(id),
    performed_by_system BOOLEAN DEFAULT false,
    metadata JSONB, -- additional context data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    customer_name VARCHAR(200) NOT NULL,
    customer_title VARCHAR(200),
    customer_company VARCHAR(200),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    testimonial_text TEXT NOT NULL,
    service_type VARCHAR(100),
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pricing_rules table
CREATE TABLE IF NOT EXISTS pricing_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    rule_type VARCHAR(50) NOT NULL, -- 'base_rate', 'surge_pricing', 'discount', 'promotion'
    vehicle_types TEXT[], -- array of applicable vehicle types
    service_areas TEXT[], -- array of applicable cities/areas
    conditions JSONB, -- flexible conditions like time of day, day of week, etc.
    adjustment_type VARCHAR(20) NOT NULL, -- 'percentage', 'fixed_amount', 'multiplier'
    adjustment_value DECIMAL(10,2) NOT NULL,
    minimum_booking_amount DECIMAL(10,2),
    maximum_discount_amount DECIMAL(10,2),
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_until TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    priority INTEGER DEFAULT 0, -- higher priority rules apply first
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    device_info JSONB,
    ip_address INET,
    user_agent TEXT,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create password_reset_tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);

CREATE INDEX IF NOT EXISTS idx_vehicles_type ON vehicles(type);
CREATE INDEX IF NOT EXISTS idx_vehicles_location ON vehicles(location_city, location_state);
CREATE INDEX IF NOT EXISTS idx_vehicles_availability ON vehicles(is_available, is_active);

CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_pickup_date ON bookings(pickup_date);
CREATE INDEX IF NOT EXISTS idx_bookings_service_city ON bookings(service_city);
CREATE INDEX IF NOT EXISTS idx_bookings_booking_number ON bookings(booking_number);
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);

-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_user_status_date ON bookings(user_id, status, pickup_date);
CREATE INDEX IF NOT EXISTS idx_vehicles_type_city_available ON vehicles(type, location_city, is_available);

CREATE INDEX IF NOT EXISTS idx_booking_activities_booking_id ON booking_activities(booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_activities_type ON booking_activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_booking_activities_created_at ON booking_activities(created_at);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

-- Add check constraints for data validation
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_booking_dates') THEN
        ALTER TABLE bookings ADD CONSTRAINT chk_booking_dates 
            CHECK (pickup_date >= CURRENT_DATE);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_passenger_count') THEN
        ALTER TABLE bookings ADD CONSTRAINT chk_passenger_count 
            CHECK (passenger_count > 0 AND passenger_count <= 20);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_price_positive') THEN
        ALTER TABLE bookings ADD CONSTRAINT chk_price_positive 
            CHECK (estimated_price > 0);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_vehicle_capacity') THEN
        ALTER TABLE vehicles ADD CONSTRAINT chk_vehicle_capacity 
            CHECK (capacity > 0 AND capacity <= 50);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_vehicle_year') THEN
        ALTER TABLE vehicles ADD CONSTRAINT chk_vehicle_year 
            CHECK (year >= 1990 AND year <= EXTRACT(YEAR FROM CURRENT_DATE) + 2);
    END IF;
END $$;

-- Create function for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_areas_updated_at ON service_areas;
CREATE TRIGGER update_service_areas_updated_at BEFORE UPDATE ON service_areas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_testimonials_updated_at ON testimonials;
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pricing_rules_updated_at ON pricing_rules;
CREATE TRIGGER update_pricing_rules_updated_at BEFORE UPDATE ON pricing_rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
