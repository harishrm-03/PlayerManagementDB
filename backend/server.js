const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models/index");

// Import route files
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
console.log("🚀 Setting up middleware...");
app.use(cors());
app.use(express.json()); // Replaces body-parser.json()
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


// Routes
console.log("🔗 Setting up routes...");
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/performances', performanceRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send("✅ Player Management System API is running...");
});

// Database Connection
console.log("🛠️ Testing database connection...");
sequelize.authenticate()
  .then(() => {
    console.log("✅ Database connected");

    // Sync models and start server only if DB connection is successful
    return sequelize.sync({ alter: false }); // Disable automatic alteration of tables
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Stop server if DB connection fails
  });

// Log environment variables only in development mode
if (process.env.NODE_ENV === "development") {
  console.log("🔍 Environment Variables:");
  console.log("DB_HOST:", process.env.DB_HOST);
  console.log("DB_USER:", process.env.DB_USER);
  console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
  console.log("DB_NAME:", process.env.DB_NAME);
}
