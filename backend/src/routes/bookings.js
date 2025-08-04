const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/database');
const { authenticateToken } = require('../utils/auth');

const router = express.Router();

// Generate booking number
const generateBookingNumber = () => {
  const prefix = 'EL';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Create new booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      vehicleId,
      bookingType,
      serviceCity,
      pickupLocation,
      pickupLatitude,
      pickupLongitude,
      dropoffLocation,
      dropoffLatitude,
      dropoffLongitude,
      pickupDate,
      pickupTime,
      estimatedDuration,
      estimatedDistance,
      isAirportTransfer,
      flightNumber,
      airline,
      terminal,
      meetAndGreet,
      flightMonitoring,
      specialRequirements,
      passengerCount,
      estimatedPrice
    } = req.body;

    // Validate required fields
    if (!vehicleId || !bookingType || !serviceCity || !pickupLocation || !pickupDate || !pickupTime || !estimatedPrice) {
      return res.status(400).json({ 
        error: 'Vehicle ID, booking type, service city, pickup location, pickup date, pickup time, and estimated price are required' 
      });
    }

    // Verify vehicle exists and is available
    const { data: vehicle, error: vehicleError } = await supabaseAdmin
      .from('vehicles')
      .select('*')
      .eq('id', vehicleId)
      .eq('is_active', true)
      .eq('is_available', true)
      .single();

    if (vehicleError || !vehicle) {
      return res.status(404).json({ error: 'Vehicle not found or not available' });
    }

    // Generate booking number
    const bookingNumber = generateBookingNumber();
    const bookingId = uuidv4();

    // Create booking
    const bookingData = {
      id: bookingId,
      user_id: userId,
      vehicle_id: vehicleId,
      booking_number: bookingNumber,
      status: 'pending',
      booking_type: bookingType,
      service_city: serviceCity,
      pickup_location: pickupLocation,
      pickup_latitude: pickupLatitude || null,
      pickup_longitude: pickupLongitude || null,
      dropoff_location: dropoffLocation || null,
      dropoff_latitude: dropoffLatitude || null,
      dropoff_longitude: dropoffLongitude || null,
      pickup_date: pickupDate,
      pickup_time: pickupTime,
      estimated_duration_minutes: estimatedDuration || null,
      estimated_distance_miles: estimatedDistance || null,
      is_airport_transfer: isAirportTransfer || false,
      flight_number: flightNumber || null,
      airline: airline || null,
      terminal: terminal || null,
      meet_and_greet: meetAndGreet || false,
      flight_monitoring: flightMonitoring || false,
      special_requirements: specialRequirements || null,
      passenger_count: passengerCount || 1,
      estimated_price: estimatedPrice,
      payment_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: booking, error: bookingError } = await supabaseAdmin
      .from('bookings')
      .insert(bookingData)
      .select()
      .single();

    if (bookingError) {
      console.error('Booking creation error:', bookingError);
      return res.status(500).json({ error: 'Failed to create booking' });
    }

    // Create booking activity
    await supabaseAdmin
      .from('booking_activities')
      .insert({
        booking_id: bookingId,
        activity_type: 'created',
        description: 'Booking created by customer',
        performed_by_user_id: userId,
        created_at: new Date().toISOString()
      });

    // Format response
    const bookingResponse = {
      id: booking.id,
      bookingNumber: booking.booking_number,
      status: booking.status,
      bookingType: booking.booking_type,
      serviceCity: booking.service_city,
      pickupLocation: booking.pickup_location,
      dropoffLocation: booking.dropoff_location,
      pickupDate: booking.pickup_date,
      pickupTime: booking.pickup_time,
      estimatedDuration: booking.estimated_duration_minutes,
      estimatedDistance: booking.estimated_distance_miles,
      isAirportTransfer: booking.is_airport_transfer,
      flightNumber: booking.flight_number,
      airline: booking.airline,
      terminal: booking.terminal,
      meetAndGreet: booking.meet_and_greet,
      flightMonitoring: booking.flight_monitoring,
      specialRequirements: booking.special_requirements,
      passengerCount: booking.passenger_count,
      estimatedPrice: parseFloat(booking.estimated_price),
      paymentStatus: booking.payment_status,
      createdAt: booking.created_at,
      vehicle: {
        id: vehicle.id,
        name: vehicle.name,
        type: vehicle.type,
        brand: vehicle.brand,
        model: vehicle.model
      }
    };

    res.status(201).json({
      message: 'Booking created successfully',
      booking: bookingResponse
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user bookings
router.get('/my-bookings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, limit = 20, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('bookings')
      .select(`
        *,
        vehicles (
          id,
          name,
          type,
          brand,
          model,
          image_urls
        )
      `)
      .eq('user_id', userId);

    if (status) {
      query = query.eq('status', status);
    }

    const { data: bookings, error } = await query
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) {
      console.error('Get bookings error:', error);
      return res.status(500).json({ error: 'Failed to fetch bookings' });
    }

    // Format response
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      bookingNumber: booking.booking_number,
      status: booking.status,
      bookingType: booking.booking_type,
      serviceCity: booking.service_city,
      pickupLocation: booking.pickup_location,
      dropoffLocation: booking.dropoff_location,
      pickupDate: booking.pickup_date,
      pickupTime: booking.pickup_time,
      estimatedDuration: booking.estimated_duration_minutes,
      estimatedDistance: booking.estimated_distance_miles,
      isAirportTransfer: booking.is_airport_transfer,
      flightNumber: booking.flight_number,
      airline: booking.airline,
      specialRequirements: booking.special_requirements,
      passengerCount: booking.passenger_count,
      estimatedPrice: booking.estimated_price ? parseFloat(booking.estimated_price) : null,
      finalPrice: booking.final_price ? parseFloat(booking.final_price) : null,
      totalAmount: booking.total_amount ? parseFloat(booking.total_amount) : null,
      paymentStatus: booking.payment_status,
      customerRating: booking.customer_rating,
      customerFeedback: booking.customer_feedback,
      createdAt: booking.created_at,
      confirmedAt: booking.confirmed_at,
      completedAt: booking.completed_at,
      cancelledAt: booking.cancelled_at,
      vehicle: booking.vehicles ? {
        id: booking.vehicles.id,
        name: booking.vehicles.name,
        type: booking.vehicles.type,
        brand: booking.vehicles.brand,
        model: booking.vehicles.model,
        imageUrls: booking.vehicles.image_urls || []
      } : null
    }));

    res.json({ bookings: formattedBookings });

  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get booking by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: booking, error } = await supabaseAdmin
      .from('bookings')
      .select(`
        *,
        vehicles (
          id,
          name,
          type,
          brand,
          model,
          year,
          capacity,
          features,
          image_urls
        )
      `)
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Get booking activities
    const { data: activities } = await supabaseAdmin
      .from('booking_activities')
      .select('*')
      .eq('booking_id', id)
      .order('created_at', { ascending: false });

    // Format response
    const bookingResponse = {
      id: booking.id,
      bookingNumber: booking.booking_number,
      status: booking.status,
      bookingType: booking.booking_type,
      serviceCity: booking.service_city,
      pickupLocation: booking.pickup_location,
      dropoffLocation: booking.dropoff_location,
      pickupDate: booking.pickup_date,
      pickupTime: booking.pickup_time,
      estimatedDuration: booking.estimated_duration_minutes,
      actualDuration: booking.actual_duration_minutes,
      estimatedDistance: booking.estimated_distance_miles,
      actualDistance: booking.actual_distance_miles,
      isAirportTransfer: booking.is_airport_transfer,
      flightNumber: booking.flight_number,
      airline: booking.airline,
      terminal: booking.terminal,
      meetAndGreet: booking.meet_and_greet,
      flightMonitoring: booking.flight_monitoring,
      specialRequirements: booking.special_requirements,
      passengerCount: booking.passenger_count,
      estimatedPrice: booking.estimated_price ? parseFloat(booking.estimated_price) : null,
      finalPrice: booking.final_price ? parseFloat(booking.final_price) : null,
      gratuityAmount: booking.gratuity_amount ? parseFloat(booking.gratuity_amount) : null,
      totalAmount: booking.total_amount ? parseFloat(booking.total_amount) : null,
      paymentStatus: booking.payment_status,
      paymentMethod: booking.payment_method,
      customerRating: booking.customer_rating,
      customerFeedback: booking.customer_feedback,
      driverNotes: booking.driver_notes,
      cancellationReason: booking.cancellation_reason,
      createdAt: booking.created_at,
      confirmedAt: booking.confirmed_at,
      startedAt: booking.started_at,
      completedAt: booking.completed_at,
      cancelledAt: booking.cancelled_at,
      vehicle: booking.vehicles ? {
        id: booking.vehicles.id,
        name: booking.vehicles.name,
        type: booking.vehicles.type,
        brand: booking.vehicles.brand,
        model: booking.vehicles.model,
        year: booking.vehicles.year,
        capacity: booking.vehicles.capacity,
        features: booking.vehicles.features || {},
        imageUrls: booking.vehicles.image_urls || []
      } : null,
      activities: activities || []
    };

    res.json({ booking: bookingResponse });

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Cancel booking
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { reason } = req.body;

    // Get booking
    const { data: booking, error: getError } = await supabaseAdmin
      .from('bookings')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (getError || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if booking can be cancelled
    if (!['pending', 'confirmed'].includes(booking.status)) {
      return res.status(400).json({ 
        error: 'Booking cannot be cancelled in its current status' 
      });
    }

    // Update booking
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason || 'Cancelled by customer',
        cancelled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Cancel booking error:', updateError);
      return res.status(500).json({ error: 'Failed to cancel booking' });
    }

    // Create booking activity
    await supabaseAdmin
      .from('booking_activities')
      .insert({
        booking_id: id,
        activity_type: 'cancelled',
        description: `Booking cancelled by customer. Reason: ${reason || 'No reason provided'}`,
        performed_by_user_id: userId,
        created_at: new Date().toISOString()
      });

    res.json({
      message: 'Booking cancelled successfully',
      booking: {
        id: updatedBooking.id,
        status: updatedBooking.status,
        cancellationReason: updatedBooking.cancellation_reason,
        cancelledAt: updatedBooking.cancelled_at
      }
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

