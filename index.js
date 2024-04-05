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
  MAD: Number,
  COA: Number,
  IP: Number,
  WEBX: Number,
});

const Marks = mongoose.model('Marks', marksSchema);

app.post('/submit', async (req, res) => {
  const { MAD, COA, IP, WEBX } = req.body;
  try {
    const newMarks = new Marks({ MAD, COA, IP, WEBX });
    await newMarks.save();
    res.status(200).json({ message: 'Marks submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/marks', async (req, res) => {
  try {
    const marks = await Marks.findOne(); // Assuming there's only one document with marks data
    if (!marks) {
      res.status(404).json({ message: 'Marks data not found' });
      return;
    }
    res.status(200).json(marks); // Returning the marks data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
