# Backend Integration Guide

Your React frontend now has a complete Node.js/Express backend integrated within the same project. Here's how to use it:

## 🚀 Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run database migrations:**
   ```bash
   NODE_TLS_REJECT_UNAUTHORIZED=0 npm run migrate
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

The backend will run on `http://localhost:3002`

## 🔧 Frontend Integration

### Update your React app to use the backend:

1. **Create an API service file** (`src/services/api.js`):
   ```javascript
   const API_BASE_URL = 'http://localhost:3002/api';

   class ApiService {
     constructor() {
       this.baseURL = API_BASE_URL;
       this.token = localStorage.getItem('authToken');
     }

     async request(endpoint, options = {}) {
       const url = `${this.baseURL}${endpoint}`;
       const config = {
         headers: {
           'Content-Type': 'application/json',
           ...options.headers,
         },
         ...options,
       };

       if (this.token) {
         config.headers.Authorization = `Bearer ${this.token}`;
       }

       const response = await fetch(url, config);
       const data = await response.json();

       if (!response.ok) {
         throw new Error(data.error || 'API request failed');
       }

       return data;
     }

     // Authentication
     async register(userData) {
       return this.request('/auth/register', {
         method: 'POST',
         body: JSON.stringify(userData),
       });
     }

     async login(credentials) {
       const response = await this.request('/auth/login', {
         method: 'POST',
         body: JSON.stringify(credentials),
       });
       
       if (response.token) {
         localStorage.setItem('authToken', response.token);
         this.token = response.token;
       }
       
       return response;
     }

     // Vehicles
     async getVehicles(filters = {}) {
       const params = new URLSearchParams(filters);
       return this.request(`/vehicles?${params}`);
     }

     async getVehicleById(id) {
       return this.request(`/vehicles/${id}`);
     }

     // Bookings
     async createBooking(bookingData) {
       return this.request('/bookings', {
         method: 'POST',
         body: JSON.stringify(bookingData),
       });
     }

     async getMyBookings() {
       return this.request('/bookings/my-bookings');
     }

     // Service Areas
     async getServiceAreas() {
       return this.request('/service-areas');
     }

     async getServiceCities() {
       return this.request('/service-areas/cities');
     }

     // Testimonials
     async getTestimonials() {
       return this.request('/testimonials');
     }

     async getFeaturedTestimonials() {
       return this.request('/testimonials/featured');
     }
   }

   export default new ApiService();
   ```

2. **Update your components to use the API service:**
   ```javascript
   import ApiService from '../services/api';

   // In your component
   useEffect(() => {
     const fetchVehicles = async () => {
       try {
         const response = await ApiService.getVehicles();
         setVehicles(response.vehicles);
       } catch (error) {
         console.error('Failed to fetch vehicles:', error);
       }
     };

     fetchVehicles();
   }, []);
   ```

## 📊 Available Data

Your database now contains:

### Vehicles (8 vehicles)
- Executive Sedans (Mercedes S-Class, BMW 7 Series, Audi A8)
- Luxury SUVs (Cadillac Escalade, Range Rover)
- Stretch Limousine (Lincoln Town Car)
- Party Bus (Ford E-450)
- Luxury Van (Mercedes Sprinter)

### Service Areas (10 cities)
- New York, NY (JFK, LGA, EWR)
- Los Angeles, CA
- Chicago, IL
- Miami, FL
- San Francisco, CA
- Boston, MA
- Washington, DC
- Atlanta, GA

### Sample Testimonials (8 testimonials)
- Featured customer reviews with ratings
- Various service types covered

## 🔐 Authentication Flow

1. **User Registration:**
   ```javascript
   const userData = {
     email: 'user@example.com',
     password: 'password123',
     firstName: 'John',
     lastName: 'Doe',
     phone: '+1234567890'
   };
   
   const response = await ApiService.register(userData);
   ```

2. **User Login:**
   ```javascript
   const credentials = {
     email: 'user@example.com',
     password: 'password123'
   };
   
   const response = await ApiService.login(credentials);
   // Token is automatically stored and used for future requests
   ```

## 🎯 Booking Flow

1. **Check Vehicle Availability:**
   ```javascript
   const availabilityData = {
     pickupDate: '2024-08-15',
     pickupTime: '14:00',
     serviceCity: 'New York',
     vehicleType: 'sedan',
     capacity: 3
   };
   
   const response = await ApiService.request('/vehicles/availability', {
     method: 'POST',
     body: JSON.stringify(availabilityData)
   });
   ```

2. **Create Booking:**
   ```javascript
   const bookingData = {
     vehicleId: 'vehicle-uuid',
     bookingType: 'point_to_point',
     serviceCity: 'New York',
     pickupLocation: '123 Main St, New York, NY',
     dropoffLocation: '456 Broadway, New York, NY',
     pickupDate: '2024-08-15',
     pickupTime: '14:00',
     passengerCount: 2,
     estimatedPrice: 150.00
   };
   
   const response = await ApiService.createBooking(bookingData);
   ```

## 🛠 Development Workflow

1. **Start both servers:**
   ```bash
   # Terminal 1 - Frontend (React)
   npm start

   # Terminal 2 - Backend (Node.js)
   cd backend
   npm start
   ```

2. **Frontend runs on:** `http://localhost:3000`
3. **Backend runs on:** `http://localhost:3002`

## 🚀 Production Deployment

For production, the backend can serve your React build:

1. **Build your React app:**
   ```bash
   npm run build
   ```

2. **Set environment variable:**
   ```bash
   export NODE_ENV=production
   ```

3. **Start the backend:**
   ```bash
   cd backend
   npm start
   ```

The backend will serve your React app and handle all API requests on the same port.

## 📝 Environment Variables

The backend is already configured with your Supabase credentials. If you need to modify them, edit `backend/.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL_NON_POOLING=your_postgres_url
JWT_SECRET=your_jwt_secret
PORT=3002
```

## 🔍 Testing the API

You can test the API endpoints using curl or any API testing tool:

```bash
# Health check
curl http://localhost:3002/health

# Get vehicles
curl http://localhost:3002/api/vehicles

# Get service areas
curl http://localhost:3002/api/service-areas

# Get testimonials
curl http://localhost:3002/api/testimonials
```

## 📚 Next Steps

1. **Update your React components** to use the new API service
2. **Implement authentication** in your frontend
3. **Add booking functionality** to your vehicle booking system
4. **Style and enhance** the user experience
5. **Add error handling** and loading states
6. **Test the complete flow** from frontend to database

Your backend is now fully functional and ready to power your Empire Lane Limo application!

