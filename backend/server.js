const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');
const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth');

// Load environment variables from the project root .env
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();

// Middleware
const allowedOrigins = ["http://localhost:5173", "https://venom-zlei.vercel.app"];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(helmet());
app.use(express.json());

// Use routes
app.use(authRoutes);
app.use(chatRoutes);

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
