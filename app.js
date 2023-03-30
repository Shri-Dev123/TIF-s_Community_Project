const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Set up middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://kalshettyshrikant:Shrikantkallshetty@cluster0.wlnlw8w.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfully connected to the database.');
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

// Define routes
const authRoutes = require('./src/routes/authRoutes');
const communityRoutes = require('./src/routes/communityRoutes');
const memberRoutes = require('./src/routes/memberRoutes');
const roleRoutes = require('./src/routes/roleRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/roles', roleRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
