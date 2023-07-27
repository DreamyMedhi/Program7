
const express = require('express');
const dotenv=require('dotenv');
const app = express();
const mongoose=require('mongoose');


dotenv.config();
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
});
app.use(express.urlencoded({extended:false}));

app.set('view engine', 'ejs');
const studentSchema = new mongoose.Schema({
  name: String,
  semester: Number,
  course: String
});

// Create a model for students
const Student = mongoose.model('Student', studentSchema);

app.post('/students', (req, res) => {
    const newStudent = new Student({
      name: req.body.name,
      semester: req.body.semester,
      course: req.body.course
    });
  
    newStudent.save()
      .then(() => {
        res.redirect('/students');
      })
      .catch((error) => {
        console.error('Error saving student:', error);
        res.status(500).send('Internal Server Error');
      });
  });

  // Create a route to fetch and display students who have chosen the "AWT" course
app.get('/students', (req, res) => {
    Student.find({ course: 'AWT', semester: 2 }).sort({_id:-1}).limit(1)
      .then((students) => {
        res.render('students', { students });
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error');
      });
  });
  
 // Define a route for the form page
app.get('/', (req, res) => {
    res.render('form');
  });
  

  app.listen(3000 ,() => {
    console.log("Server started");
  });