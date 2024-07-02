const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000; // Default port is 5000, can be overridden by environment variable

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // Mount authentication routes
app.use('/api/users', userRoutes); // Mount user management routes

// Error handling middleware
app.use(errorHandler); // Handle errors globally

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, // Deprecated option, no longer needed
    useUnifiedTopology: true, // Deprecated option, no longer needed
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Default route
app.get('/', (req, res) => {
    res.send('API is running...'); // Simple response for root route
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
