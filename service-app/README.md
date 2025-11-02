# ServicePro - Professional Service Booking Platform

A comprehensive web application for booking professional service providers including event staff, hospitality workers, and personal assistants.

## Features

### Client Features
- **User Registration & Authentication**: Secure JWT-based authentication
- **Service Provider Discovery**: Browse and filter verified service providers
- **Booking System**: Easy-to-use booking interface with date, time, and location
- **Service Categories**:
  - Event Staff (waiters, servers, event coordinators)
  - Hospitality (concierge, room service, guest relations)
  - Personal Assistants (errand running, scheduling, admin tasks)
- **Provider Ratings & Reviews**: View ratings and reviews from previous clients
- **Booking Management**: Track and manage your bookings

### Service Provider Features
- **Provider Profile**: Create and manage professional profile
- **Service Listings**: List services and hourly rates
- **Booking Requests**: Receive and manage booking requests
- **Verification Badge**: Get verified for increased trust

### Security Features
- **Password Hashing**: bcrypt for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation using express-validator
- **CORS Protection**: Configured CORS for API security
- **XSS Protection**: Input sanitization to prevent XSS attacks

## Tech Stack

### Frontend
- **HTML5 & CSS3**: Modern semantic HTML with responsive design
- **Tailwind CSS**: Utility-first CSS framework
- **Font Awesome**: Icon library
- **Vanilla JavaScript**: No framework dependencies, lightweight and fast

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **express-validator**: Input validation and sanitization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd service-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and update the values:
   - `JWT_SECRET`: Change to a strong secret key
   - `PORT`: Server port (default: 3000)

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Or for production:
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
service-app/
├── index.html          # Main frontend HTML file
├── app.js             # Frontend JavaScript
├── server.js          # Backend Express server
├── package.json       # Node.js dependencies
├── .env.example       # Environment variables template
└── README.md          # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Service Providers
- `GET /api/providers` - Get all providers (with filters)
- `GET /api/providers/:id` - Get single provider

### Bookings
- `POST /api/bookings` - Create booking (protected)
- `GET /api/bookings` - Get user bookings (protected)
- `GET /api/bookings/:id` - Get single booking (protected)
- `PATCH /api/bookings/:id` - Update booking status (protected)
- `DELETE /api/bookings/:id` - Delete booking (protected)

### Contact
- `POST /api/contact` - Submit contact form

## Usage Guide

### For Clients

1. **Sign Up**: Click "Sign Up" and register as a "Client"
2. **Browse Providers**: View featured service providers on the homepage
3. **Book Service**:
   - Click "Book Now" on a provider or "Book a Service Now"
   - Fill in service details (type, date, time, duration, location)
   - Submit booking request
4. **Manage Bookings**: View and manage your bookings in your account

### For Service Providers

1. **Sign Up**: Click "Sign Up" and register as a "Service Provider"
2. **Complete Profile**: Add your services, rates, and availability
3. **Get Verified**: Complete verification process for trust badge
4. **Receive Bookings**: Accept or decline booking requests
5. **Build Reputation**: Collect ratings and reviews from clients

## Future Enhancements

### Planned Features
- [ ] Real-time chat between clients and providers
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Calendar integration for availability
- [ ] Push notifications for booking updates
- [ ] Mobile app (React Native)
- [ ] Advanced search and filters
- [ ] Provider portfolio/gallery
- [ ] Background check verification
- [ ] Insurance and liability coverage
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Referral program

### Database Integration
Currently using in-memory storage. Future versions will include:
- MongoDB or PostgreSQL for persistent data storage
- Redis for caching and session management
- AWS S3 for file uploads (profile pictures, documents)

### Payment Integration
```javascript
// Future Stripe integration example
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payments/create-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    metadata: { bookingId: req.body.bookingId }
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});
```

## Security Best Practices

1. **Never commit `.env` file** - Contains sensitive credentials
2. **Use strong JWT secrets** - Change default secret in production
3. **Enable HTTPS** - Use SSL/TLS certificates in production
4. **Rate limiting** - Implement rate limiting to prevent abuse
5. **Input validation** - Always validate and sanitize user inputs
6. **Regular updates** - Keep dependencies up to date
7. **Error handling** - Don't expose sensitive errors to clients

## Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## Deployment

### Deploy to Heroku
```bash
heroku create servicepro-app
git push heroku main
heroku config:set JWT_SECRET=your-secret-key
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to AWS/DigitalOcean
- Set up Node.js environment
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Configure environment variables
- Start with PM2 process manager

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@servicepro.com or open an issue in the repository.

## Acknowledgments

- Tailwind CSS for the styling framework
- Font Awesome for icons
- Avatar images from pravatar.cc
- Express.js community for excellent documentation

---

**Built with ❤️ by the ServicePro Team**
