const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://aditya:aditya123@cluster0.zoiqagj.mongodb.net/student_marks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const marksSchema = new mongoose.Schema({
  subject: String,
  marks: Number,
});

const Marks = mongoose.model('Marks', marksSchema);

app.post('/submit', async (req, res) => {
  const { subject, marks } = req.body;
  try {
    const newMarks = new Marks({ subject, marks });
    await newMarks.save();
    res.status(200).json({ message: 'Marks submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
