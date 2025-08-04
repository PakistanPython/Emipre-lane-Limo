const express = require('express');
const { supabaseAdmin } = require('../config/database');

const router = express.Router();

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const { type, city, capacity } = req.query;

    let query = supabaseAdmin
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .eq('is_available', true);

    // Apply filters
    if (type) {
      query = query.eq('type', type);
    }
    if (city) {
      query = query.eq('location_city', city);
    }
    if (capacity) {
      query = query.gte('capacity', parseInt(capacity));
    }

    const { data: vehicles, error } = await query.order('name');

    if (error) {
      console.error('Get vehicles error:', error);
      return res.status(500).json({ error: 'Failed to fetch vehicles' });
    }

    // Format response
    const formattedVehicles = vehicles.map(vehicle => ({
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      capacity: vehicle.capacity,
      color: vehicle.color,
      features: vehicle.features || {},
      baseHourlyRate: parseFloat(vehicle.base_hourly_rate),
      baseDistanceRate: parseFloat(vehicle.base_distance_rate),
      airportTransferRate: vehicle.airport_transfer_rate ? parseFloat(vehicle.airport_transfer_rate) : null,
      minimumBookingHours: vehicle.minimum_booking_hours,
      imageUrls: vehicle.image_urls || [],
      locationCity: vehicle.location_city,
      locationState: vehicle.location_state
    }));

    res.json({ vehicles: formattedVehicles });

  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get vehicle by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: vehicle, error } = await supabaseAdmin
      .from('vehicles')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error || !vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Format response
    const formattedVehicle = {
      id: vehicle.id,
      name: vehicle.name,
      type: vehicle.type,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      capacity: vehicle.capacity,
      licensePlate: vehicle.license_plate,
      color: vehicle.color,
      fuelType: vehicle.fuel_type,
      transmission: vehicle.transmission,
      features: vehicle.features || {},
      baseHourlyRate: parseFloat(vehicle.base_hourly_rate),
      baseDistanceRate: parseFloat(vehicle.base_distance_rate),
      airportTransferRate: vehicle.airport_transfer_rate ? parseFloat(vehicle.airport_transfer_rate) : null,
      minimumBookingHours: vehicle.minimum_booking_hours,
      imageUrls: vehicle.image_urls || [],
      isAvailable: vehicle.is_available,
      locationCity: vehicle.location_city,
      locationState: vehicle.location_state,
      mileage: vehicle.mileage
    };

    res.json({ vehicle: formattedVehicle });

  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get vehicle types
router.get('/types/list', async (req, res) => {
  try {
    const { data: vehicles, error } = await supabaseAdmin
      .from('vehicles')
      .select('type')
      .eq('is_active', true);

    if (error) {
      console.error('Get vehicle types error:', error);
      return res.status(500).json({ error: 'Failed to fetch vehicle types' });
    }

    // Get unique types
    const types = [...new Set(vehicles.map(v => v.type))];

    res.json({ types });

  } catch (error) {
    console.error('Get vehicle types error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Check vehicle availability
router.post('/availability', async (req, res) => {
  try {
    const { pickupDate, pickupTime, serviceCity, vehicleType, capacity } = req.body;

    // Validate required fields
    if (!pickupDate || !pickupTime || !serviceCity) {
      return res.status(400).json({ 
        error: 'Pickup date, time, and service city are required' 
      });
    }

    // Get vehicles in the specified city
    let query = supabaseAdmin
      .from('vehicles')
      .select('*')
      .eq('is_active', true)
      .eq('is_available', true)
      .eq('location_city', serviceCity);

    if (vehicleType) {
      query = query.eq('type', vehicleType);
    }
    if (capacity) {
      query = query.gte('capacity', parseInt(capacity));
    }

    const { data: vehicles, error: vehiclesError } = await query;

    if (vehiclesError) {
      console.error('Get vehicles error:', vehiclesError);
      return res.status(500).json({ error: 'Failed to check availability' });
    }

    if (!vehicles.length) {
      return res.json({ availableVehicles: [] });
    }

    // Check for conflicting bookings
    const { data: bookings, error: bookingsError } = await supabaseAdmin
      .from('bookings')
      .select('vehicle_id, pickup_date, pickup_time, estimated_duration_minutes')
      .eq('pickup_date', pickupDate)
      .in('status', ['confirmed', 'in_progress']);

    if (bookingsError) {
      console.error('Get bookings error:', bookingsError);
      return res.status(500).json({ error: 'Failed to check availability' });
    }

    // Simple conflict check - in production, you'd want more sophisticated time overlap detection
    const bookedVehicleIds = new Set(bookings.map(b => b.vehicle_id));

    // Filter out booked vehicles
    const availableVehicles = vehicles
      .filter(vehicle => !bookedVehicleIds.has(vehicle.id))
      .map(vehicle => ({
        id: vehicle.id,
        name: vehicle.name,
        type: vehicle.type,
        brand: vehicle.brand,
        model: vehicle.model,
        capacity: vehicle.capacity,
        baseHourlyRate: parseFloat(vehicle.base_hourly_rate),
        baseDistanceRate: parseFloat(vehicle.base_distance_rate),
        airportTransferRate: vehicle.airport_transfer_rate ? parseFloat(vehicle.airport_transfer_rate) : null,
        imageUrls: vehicle.image_urls || []
      }));

    res.json({ availableVehicles });

  } catch (error) {
    console.error('Check availability error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

