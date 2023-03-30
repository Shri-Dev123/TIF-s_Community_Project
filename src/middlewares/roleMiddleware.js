const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');


exports.roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, "JWT_SECRET");
      const userId = decodedToken.userId;
      const userRole = decodedToken.roles;

      req.userId = userId;
      req.userRole = userRole;
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'You are not authorized to access this resource' });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
};





