require('dotenv').config();

module.exports = {
  secret: process.env.JWT_SECRET || 'SECRET_KEY_RANDOM'
}