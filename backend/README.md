# Empire Lane Limo Backend

This is the Node.js/Express backend API for the Empire Lane Limo application, integrated within the React frontend project.

## Features

- **Authentication**: User registration, login, and profile management
- **Vehicle Management**: Browse available vehicles, check availability
- **Booking System**: Create, view, and manage bookings
- **Service Areas**: Manage service locations and pricing
- **Testimonials**: Customer reviews and feedback
- **Database**: PostgreSQL with Supabase integration

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # Supabase configuration
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── vehicles.js          # Vehicle management routes
│   │   ├── bookings.js          # Booking management routes
│   │   ├── serviceAreas.js      # Service area routes
│   │   └── testimonials.js      # Testimonial routes
│   ├── utils/
│   │   └── auth.js              # Authentication utilities
│   ├── migrate.js               # Database migration script
│   └── server.js                # Main server file
├── migrations/
│   ├── 001_initial_schema.sql   # Initial database schema
│   ├── 002_sample_data.sql      # Sample data
│   └── 003_drop_existing_tables.sql
├── .env                         # Environment variables
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

The `.env` file is already configured with your Supabase credentials:

```env
SUPABASE_URL=https://moslnrtahatuzmoiawlk.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
POSTGRES_URL_NON_POOLING=your_postgres_url
JWT_SECRET=empire_lane_limo_jwt_secret_key_2024
PORT=3002
```

### 3. Run Database Migrations

```bash
cd backend
NODE_TLS_REJECT_UNAUTHORIZED=0 npm run migrate
```

### 4. Start the Backend Server

```bash
cd backend
npm start
```

The server will start on port 3002. You can verify it's running by visiting:
- Health check: http://localhost:3002/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)
- `PUT /api/auth/profile` - Update user profile (requires auth)

### Vehicles
- `GET /api/vehicles` - Get all available vehicles
- `GET /api/vehicles/:id` - Get vehicle by ID
- `GET /api/vehicles/types/list` - Get vehicle types
- `POST /api/vehicles/availability` - Check vehicle availability

### Bookings
- `POST /api/bookings` - Create new booking (requires auth)
- `GET /api/bookings/my-bookings` - Get user bookings (requires auth)
- `GET /api/bookings/:id` - Get booking by ID (requires auth)
- `PUT /api/bookings/:id/cancel` - Cancel booking (requires auth)

### Service Areas
- `GET /api/service-areas` - Get all service areas
- `GET /api/service-areas/cities` - Get service cities
- `GET /api/service-areas/primary-markets` - Get primary markets
- `GET /api/service-areas/:city/pricing` - Get city pricing

### Testimonials
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/featured` - Get featured testimonials
- `GET /api/testimonials/service/:serviceType` - Get testimonials by service type

## Database Schema

The database includes the following main tables:

- **users**: User accounts and profiles
- **vehicles**: Vehicle fleet information
- **bookings**: Booking records and details
- **service_areas**: Service locations and pricing
- **testimonials**: Customer reviews
- **booking_activities**: Booking history tracking
- **pricing_rules**: Dynamic pricing configuration

## Integration with Frontend

To integrate this backend with your React frontend:

1. **Update API Base URL**: In your frontend, set the API base URL to `http://localhost:3002/api`

2. **Authentication**: Use JWT tokens for authenticated requests. Include the token in the Authorization header:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

3. **CORS**: The backend is configured to accept requests from `http://localhost:3000` and `http://localhost:5173`

## Development Scripts

- `npm start` - Start the production server
- `npm run dev` - Start with nodemon for development
- `npm run migrate` - Run database migrations

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in your environment
2. The server will serve static files from the React build directory
3. All React routes will be handled by the backend server

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- CORS configuration
- Environment variable protection

## Sample Data

The database includes sample data for:
- 8 vehicles across different types (sedan, SUV, limousine, party bus, luxury van)
- 10 service areas in major US cities
- 8 customer testimonials
- Pricing rules for different scenarios

You can use this data to test the application functionality.

