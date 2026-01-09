require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routers/authRouters');
const followRoutes = require('./routers/followRouters');
const userRoutes = require('./routers/userRouters');
const posts = require('./routers/postRouters');
const community = require('./routers/communityRouters');
const uploadRoutes = require('./routers/uploadRouters');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/follow', followRoutes);
app.use('/users', userRoutes);
app.use('/posts', posts);
app.use('/community', community);
app.use('/upload', uploadRoutes);

const start = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error('MONGO_DB_URL is not defined in .env file');
    }
    
    await mongoose.connect(process.env.MONGO_DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.error('Server startup error:', e.message);
    process.exit(1);
  }
};

start();
