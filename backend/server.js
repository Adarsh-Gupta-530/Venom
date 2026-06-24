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
app.use(cors({
  origin: ["http://localhost:5173", "https://venom-zlei-nd2l1yu0q-adarshgupta4530-5398s-projects.vercel.app"],
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
