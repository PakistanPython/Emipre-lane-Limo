const express = require('express');
const { supabaseAdmin } = require('../config/database');

const router = express.Router();

// Get all service areas
router.get('/', async (req, res) => {
  try {
    const { data: serviceAreas, error } = await supabaseAdmin
      .from('service_areas')
      .select('*')
      .eq('is_active', true)
      .order('city');

    if (error) {
      console.error('Get service areas error:', error);
      return res.status(500).json({ error: 'Failed to fetch service areas' });
    }

    // Format response
    const formattedAreas = serviceAreas.map(area => ({
      id: area.id,
      city: area.city,
      state: area.state,
      country: area.country,
      airportCode: area.airport_code,
      isPrimaryMarket: area.is_primary_market,
      baseRateMultiplier: parseFloat(area.base_rate_multiplier),
      minimumFare: area.minimum_fare ? parseFloat(area.minimum_fare) : null,
      airportSurcharge: area.airport_surcharge ? parseFloat(area.airport_surcharge) : null,
      coverageRadiusMiles: area.coverage_radius_miles
    }));

    res.json({ serviceAreas: formattedAreas });

  } catch (error) {
    console.error('Get service areas error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get service cities
router.get('/cities', async (req, res) => {
  try {
    const { data: serviceAreas, error } = await supabaseAdmin
      .from('service_areas')
      .select('city, state')
      .eq('is_active', true)
      .order('city');

    if (error) {
      console.error('Get service cities error:', error);
      return res.status(500).json({ error: 'Failed to fetch service cities' });
    }

    // Format response
    const cities = serviceAreas.map(area => ({
      city: area.city,
      state: area.state,
      displayName: `${area.city}, ${area.state}`
    }));

    res.json({ cities });

  } catch (error) {
    console.error('Get service cities error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get primary markets
router.get('/primary-markets', async (req, res) => {
  try {
    const { data: serviceAreas, error } = await supabaseAdmin
      .from('service_areas')
      .select('*')
      .eq('is_active', true)
      .eq('is_primary_market', true)
      .order('city');

    if (error) {
      console.error('Get primary markets error:', error);
      return res.status(500).json({ error: 'Failed to fetch primary markets' });
    }

    // Format response
    const markets = serviceAreas.map(area => ({
      id: area.id,
      city: area.city,
      state: area.state,
      airportCode: area.airport_code,
      minimumFare: area.minimum_fare ? parseFloat(area.minimum_fare) : null,
      coverageRadiusMiles: area.coverage_radius_miles
    }));

    res.json({ primaryMarkets: markets });

  } catch (error) {
    console.error('Get primary markets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get pricing for a specific city
router.get('/:city/pricing', async (req, res) => {
  try {
    const { city } = req.params;

    const { data: serviceArea, error } = await supabaseAdmin
      .from('service_areas')
      .select('*')
      .eq('city', city)
      .eq('is_active', true)
      .single();

    if (error || !serviceArea) {
      return res.status(404).json({ error: 'Service area not found' });
    }

    // Format response
    const pricing = {
      city: serviceArea.city,
      state: serviceArea.state,
      baseRateMultiplier: parseFloat(serviceArea.base_rate_multiplier),
      minimumFare: serviceArea.minimum_fare ? parseFloat(serviceArea.minimum_fare) : null,
      airportSurcharge: serviceArea.airport_surcharge ? parseFloat(serviceArea.airport_surcharge) : null,
      coverageRadiusMiles: serviceArea.coverage_radius_miles
    };

    res.json({ pricing });

  } catch (error) {
    console.error('Get city pricing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

