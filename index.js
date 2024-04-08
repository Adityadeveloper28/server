const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://aditya:aditya123@cluster0.zoiqagj.mongodb.net/student_marks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Endpoint to handle signup requests
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Here you would perform validation, password hashing, etc.
    // For simplicity, let's assume the data is valid and save it directly to the database
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      // User not found
      res.status(404).json({ message: 'User not found' });
      return;
    }
    // Check if password matches
    if (user.password !== password) {
      // Password does not match
      res.status(401).json({ message: 'Incorrect password' });
      return;
    }
    // Login successful
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to submit marks
app.post('/submit', async (req, res) => {
  const { MAD, COA, IP, WEBX } = req.body;
  try {
    // Save marks to the database
    const newMarks = new Marks({ MAD, COA, IP, WEBX });
    await newMarks.save();
    res.status(200).json({ message: 'Marks submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to fetch marks
app.get('/marks', async (req, res) => {
  try {
    // Fetch all marks from the database
    const marks = await Marks.find();
    if (!marks || marks.length === 0) {
      res.status(404).json({ message: 'Marks data not found' });
      return;
    }
    res.status(200).json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
