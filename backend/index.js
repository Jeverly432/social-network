const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routers/authRouters');
const followRoutes = require('./routers/followRouters');
const userRoutes = require('./routers/userRouters');
const posts = require('./routers/postRouters');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/follow', followRoutes);
app.use('/users', userRoutes);
app.use('/posts', posts);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://admin:admin@cluster.dwtbv2k.mongodb.net/social_network?appName=Cluster`);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
