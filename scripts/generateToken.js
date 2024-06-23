const jwt = require('jsonwebtoken');
require('dotenv').config();

const payload = {
  email: 'test@example.com'
};

const options = {
  expiresIn: '1h'
};

const token = jwt.sign(payload, process.env.JWT_SECRET, options);
console.log(`Generated JWT Token: ${token}`);
