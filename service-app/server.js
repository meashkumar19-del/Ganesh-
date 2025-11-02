// ServicePro Backend Server
// Node.js + Express backend with JWT authentication

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// In-memory database (replace with actual database in production)
const database = {
    users: [],
    providers: [],
    bookings: []
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// Input validation middleware
const validateRegistration = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().notEmpty(),
    body('phone').isMobilePhone(),
    body('userType').isIn(['client', 'provider'])
];

const validateBooking = [
    body('serviceType').notEmpty(),
    body('date').isISO8601(),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('duration').isInt({ min: 1 }),
    body('location').trim().notEmpty()
];

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User Registration
app.post('/api/auth/register', validateRegistration, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password, name, phone, userType } = req.body;

        // Check if user already exists
        const existingUser = database.users.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            id: Date.now().toString(),
            email,
            password: hashedPassword,
            name,
            phone,
            userType,
            verified: false,
            createdAt: new Date().toISOString()
        };

        database.users.push(user);

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, userType: user.userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = database.users.find(u => u.email === email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, userType: user.userType },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return user data without password
        const { password: _, ...userWithoutPassword } = user;

        res.json({
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = database.users.find(u => u.id === req.user.userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

// Get all service providers
app.get('/api/providers', (req, res) => {
    const { service, minRating, maxRate } = req.query;

    let providers = database.providers;

    // Filter by service type
    if (service) {
        providers = providers.filter(p => p.service.toLowerCase() === service.toLowerCase());
    }

    // Filter by minimum rating
    if (minRating) {
        providers = providers.filter(p => p.rating >= parseFloat(minRating));
    }

    // Filter by maximum hourly rate
    if (maxRate) {
        providers = providers.filter(p => p.hourlyRate <= parseFloat(maxRate));
    }

    res.json(providers);
});

// Get single provider
app.get('/api/providers/:id', (req, res) => {
    const provider = database.providers.find(p => p.id === req.params.id);
    if (!provider) {
        return res.status(404).json({ error: 'Provider not found' });
    }
    res.json(provider);
});

// Create booking
app.post('/api/bookings', authenticateToken, validateBooking, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { serviceType, date, time, duration, location, details, providerId } = req.body;

        // Verify provider exists if specified
        if (providerId) {
            const provider = database.providers.find(p => p.id === providerId);
            if (!provider) {
                return res.status(404).json({ error: 'Provider not found' });
            }
        }

        const booking = {
            id: Date.now().toString(),
            userId: req.user.userId,
            serviceType,
            date,
            time,
            duration,
            location,
            details,
            providerId: providerId || null,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        database.bookings.push(booking);

        res.status(201).json({
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user bookings
app.get('/api/bookings', authenticateToken, (req, res) => {
    const userBookings = database.bookings.filter(b => b.userId === req.user.userId);
    res.json(userBookings);
});

// Get single booking
app.get('/api/bookings/:id', authenticateToken, (req, res) => {
    const booking = database.bookings.find(b => b.id === req.params.id);

    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied' });
    }

    res.json(booking);
});

// Update booking status
app.patch('/api/bookings/:id', authenticateToken, (req, res) => {
    const { status } = req.body;
    const booking = database.bookings.find(b => b.id === req.params.id);

    if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied' });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    booking.status = status;
    booking.updatedAt = new Date().toISOString();

    res.json({
        message: 'Booking updated successfully',
        booking
    });
});

// Delete booking
app.delete('/api/bookings/:id', authenticateToken, (req, res) => {
    const bookingIndex = database.bookings.findIndex(b => b.id === req.params.id);

    if (bookingIndex === -1) {
        return res.status(404).json({ error: 'Booking not found' });
    }

    const booking = database.bookings[bookingIndex];

    // Check if user owns this booking
    if (booking.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Access denied' });
    }

    database.bookings.splice(bookingIndex, 1);

    res.json({ message: 'Booking deleted successfully' });
});

// Contact form
app.post('/api/contact', [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().notEmpty()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    // In production, send email or store in database
    console.log('Contact form submission:', { name, email, message });

    res.json({ message: 'Message received. We will contact you soon!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`ServicePro server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
