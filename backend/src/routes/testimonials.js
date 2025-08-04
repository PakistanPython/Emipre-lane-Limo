const express = require('express');
const { supabaseAdmin } = require('../config/database');

const router = express.Router();

// Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const { featured, limit = 20, offset = 0 } = req.query;

    let query = supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_approved', true);

    if (featured === 'true') {
      query = query.eq('is_featured', true);
    }

    const { data: testimonials, error } = await query
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) {
      console.error('Get testimonials error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }

    // Format response
    const formattedTestimonials = testimonials.map(testimonial => ({
      id: testimonial.id,
      customerName: testimonial.customer_name,
      customerTitle: testimonial.customer_title,
      customerCompany: testimonial.customer_company,
      rating: testimonial.rating,
      testimonialText: testimonial.testimonial_text,
      serviceType: testimonial.service_type,
      isFeatured: testimonial.is_featured,
      imageUrl: testimonial.image_url,
      createdAt: testimonial.created_at
    }));

    res.json({ testimonials: formattedTestimonials });

  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get featured testimonials
router.get('/featured', async (req, res) => {
  try {
    const { data: testimonials, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .eq('is_featured', true)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Get featured testimonials error:', error);
      return res.status(500).json({ error: 'Failed to fetch featured testimonials' });
    }

    // Format response
    const formattedTestimonials = testimonials.map(testimonial => ({
      id: testimonial.id,
      customerName: testimonial.customer_name,
      customerTitle: testimonial.customer_title,
      customerCompany: testimonial.customer_company,
      rating: testimonial.rating,
      testimonialText: testimonial.testimonial_text,
      serviceType: testimonial.service_type,
      imageUrl: testimonial.image_url,
      createdAt: testimonial.created_at
    }));

    res.json({ testimonials: formattedTestimonials });

  } catch (error) {
    console.error('Get featured testimonials error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get testimonials by service type
router.get('/service/:serviceType', async (req, res) => {
  try {
    const { serviceType } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    const { data: testimonials, error } = await supabaseAdmin
      .from('testimonials')
      .select('*')
      .eq('is_approved', true)
      .eq('service_type', serviceType)
      .order('created_at', { ascending: false })
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

    if (error) {
      console.error('Get testimonials by service error:', error);
      return res.status(500).json({ error: 'Failed to fetch testimonials' });
    }

    // Format response
    const formattedTestimonials = testimonials.map(testimonial => ({
      id: testimonial.id,
      customerName: testimonial.customer_name,
      customerTitle: testimonial.customer_title,
      customerCompany: testimonial.customer_company,
      rating: testimonial.rating,
      testimonialText: testimonial.testimonial_text,
      serviceType: testimonial.service_type,
      isFeatured: testimonial.is_featured,
      imageUrl: testimonial.image_url,
      createdAt: testimonial.created_at
    }));

    res.json({ testimonials: formattedTestimonials });

  } catch (error) {
    console.error('Get testimonials by service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

