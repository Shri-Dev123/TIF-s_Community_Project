const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ErrorHandler } = require('../helpers/error');

// Middleware to verify the user token and check if the user exists
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ErrorHandler(401, 'Authorization header missing');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ErrorHandler(401, 'Token missing');
    }

    const decoded = jwt.verify(token,"JWT_SECRET");
    const user = await User.findById({ _id: decoded.userId, 'tokens.token': token });
    console.log(user);
    if (!user) {
      throw new ErrorHandler(401, 'Invalid token');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ message: 'Token expired' });
    }

    return res.status(401).send({ message: error.message });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied. You do not have admin privileges.' });
  }

  next();
};

module.exports = {verifyToken,isAdmin}