import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Login from "pages/login";
import Register from "pages/register";
import CustomerDashboard from "pages/customer-dashboard";
import Homepage from "pages/homepage";
import BookingConfirmation from "pages/booking-confirmation";
import VehicleBookingSystem from "pages/vehicle-booking-system";
import CurrentBookings from "pages/current-bookings";
import BookingHistory from "pages/booking-history";
import RecurringBookings from "pages/recurring-bookings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/customer-dashboard/current-bookings" element={<CurrentBookings />} />
        <Route path="/customer-dashboard/booking-history" element={<BookingHistory />} />
        <Route path="/recurring-bookings" element={<RecurringBookings />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/vehicle-booking-system" element={<VehicleBookingSystem />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;