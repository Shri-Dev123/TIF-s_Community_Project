const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    // check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({ name, email, password: hashedPassword, roles });
    await user.save();

    // create and sign a new JWT token
    const token = jwt.sign({ userId: user._id }, "JWT_SECRET");

    // send response with user details and JWT token
    res.status(201).json({ message: 'User registered successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user with the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // create and sign a new JWT token
    const token = jwt.sign({ userId: user._id }, "JWT_SECRET");

    // send response with user details and JWT token
    res.status(200).json({ message: 'User logged in successfully', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    // verify the refresh token
    const decodedToken = jwt.verify(refreshToken, "JWT_SECRET_KEY");

    // check if user with the decoded token exists
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // create and sign a new access token
    const accessToken = jwt.sign({ userId: user._id }, "JWT_SECRET_KEY", { expiresIn: '15m' });

    // send response with the new access token
    res.status(200).json({ message: 'Token refreshed successfully', accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getMe = async (req, res) => {
  try {
    // Get the user ID from the request object
    const userId = req.userId;

    // Find the user with the given ID
    const user = await User.findById(userId);

    // If user is not found, return an error response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If user is found, return the user object
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
