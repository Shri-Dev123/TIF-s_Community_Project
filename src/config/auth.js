const jwt = require('jsonwebtoken');

// Middleware to authenticate user by verifying JWT token
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, "JWT_SECRET", (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing' });
  }
};

// Function to generate JWT token for user
const generateAuthToken = (user) => {
  return jwt.sign({ id: user.id }, "JWT_SECRET", { expiresIn: '24h' });
};

module.exports = { authenticateUser, generateAuthToken };
