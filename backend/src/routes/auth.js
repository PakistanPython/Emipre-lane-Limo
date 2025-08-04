const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/database');
const { hashPassword, verifyPassword, generateToken, authenticateToken } = require('../utils/auth');

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, full_name, phone, preferredVehicle, notifications } = req.body;

    // Validate required fields
    if (!email || !password || !full_name) {
      return res.status(400).json({ 
        error: 'Email, password, and full name are required' 
      });
    }
    
    const nameParts = full_name.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ 
        error: 'Password must be at least 8 characters long' 
      });
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email: email.toLowerCase(),
      password: password,
      options: {
        email_confirm: false,
        user_metadata: {
          full_name: full_name,
          phone: phone || null,
        }
      }
    });

    if (error) {
      console.error("Supabase auth.signUp error:", error);
      return res.status(400).json({ error: error.message });
    }

    const user = data.user;

    if (!user) {
      return res.status(500).json({ error: "User not returned after registration" });
    }

    const session = data.session;

    if (!user || !session) {
      return res.status(500).json({ error: "User or session not returned after registration" });
    }

    // Return user data and token
    const userResponse = {
      id: user.id,
      email: user.email,
      full_name: full_name,
      phone: phone || null,
      preferredVehicle: preferredVehicle || null,
      notifications: notifications !== false,
      createdAt: user.created_at
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token: session.access_token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error("Supabase auth.signInWithPassword error:", error);
      return res.status(401).json({ error: error.message });
    }

    const user = data.user;
    const session = data.session;

    if (!user || !session) {
      return res.status(500).json({ error: "User or session not returned after login" });
    }

    // Return user data and token
    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata.first_name,
      lastName: user.user_metadata.last_name,
      phone: user.user_metadata.phone,
      preferredVehicle: user.user_metadata.preferred_vehicle_type,
      notifications: user.user_metadata.notifications_enabled,
      membershipTier: user.user_metadata.membership_tier,
      loyaltyPoints: user.user_metadata.loyalty_points,
      profileImage: user.user_metadata.profile_image_url,
      createdAt: user.created_at
    };

    res.json({
      message: "Login successful",
      user: userResponse,
      token: session.access_token
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = req.user; // User object from authenticateToken middleware

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.user_metadata.first_name,
      lastName: user.user_metadata.last_name,
      phone: user.user_metadata.phone,
      preferredVehicle: user.user_metadata.preferred_vehicle_type,
      notifications: user.user_metadata.notifications_enabled,
      membershipTier: user.user_metadata.membership_tier,
      loyaltyPoints: user.user_metadata.loyalty_points,
      profileImage: user.user_metadata.profile_image_url,
      emergencyContactName: user.user_metadata.emergency_contact_name,
      emergencyContactPhone: user.user_metadata.emergency_contact_phone,
      specialRequirements: user.user_metadata.special_requirements,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    };

    res.json({ user: userResponse });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      firstName,
      lastName,
      phone,
      preferredVehicle,
      notifications,
      emergencyContactName,
      emergencyContactPhone,
      specialRequirements
    } = req.body;

    // Prepare update data for user_metadata
    const userMetadata = {};
    if (firstName !== undefined) userMetadata.first_name = firstName;
    if (lastName !== undefined) userMetadata.last_name = lastName;
    if (phone !== undefined) userMetadata.phone = phone;
    if (preferredVehicle !== undefined) userMetadata.preferred_vehicle_type = preferredVehicle;
    if (notifications !== undefined) userMetadata.notifications_enabled = notifications;
    if (emergencyContactName !== undefined) userMetadata.emergency_contact_name = emergencyContactName;
    if (emergencyContactPhone !== undefined) userMetadata.emergency_contact_phone = emergencyContactPhone;
    if (specialRequirements !== undefined) userMetadata.special_requirements = specialRequirements;

    const { data: updatedAuthUser, error } = await supabaseAdmin.auth.updateUser(
      req.user.id,
      {
        data: userMetadata,
      }
    );

    if (error) {
      console.error("Supabase auth.updateUser error:", error);
      return res.status(500).json({ error: error.message });
    }

    const updatedUser = updatedAuthUser.user;

    // Return updated user data
    const userResponse = {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.user_metadata.first_name,
      lastName: updatedUser.user_metadata.last_name,
      phone: updatedUser.user_metadata.phone,
      preferredVehicle: updatedUser.user_metadata.preferred_vehicle_type,
      notifications: updatedUser.user_metadata.notifications_enabled,
      membershipTier: updatedUser.user_metadata.membership_tier,
      loyaltyPoints: updatedUser.user_metadata.loyalty_points,
      emergencyContactName: updatedUser.user_metadata.emergency_contact_name,
      emergencyContactPhone: updatedUser.user_metadata.emergency_contact_phone,
      specialRequirements: updatedUser.user_metadata.special_requirements,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at
    };

    res.json({
      message: "Profile updated successfully",
      user: userResponse
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
