const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user.model.js');
const userRoutes = require('./routes/user.route.js');
const stickyRoutes = require('./routes/sticky.route');
const eventRoutes = require('./routes/eventPlan.route');
const timeLogRoutes = require('./routes/timeLog.route');

mongoose.connect('mongodb://localhost:27017/')
  .then(() => console.log('Connected to database!'))
  .catch(() => { console.log("Connection failed !")});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors()); 


app.use('/api/users', userRoutes);

app.use('/api/stickies', stickyRoutes);

app.use('/api/events', eventRoutes);

app.use('/api/timelogs', timeLogRoutes);





app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
 
app.get('/',(req, res) => {
    res.send("Hello from node.");
}
);




/*
app.post('/api/user', async (req, res) => {
 try{
    const user = await User.create(req.body);
    res.status(200).json(user);
 } catch (error){
    res.status(500).json({message : error.message});
 }
});

app.get('/api/user/:email', async (req,res) => {
  try { 
    const { email } = req.params;
    console.log("GET /api/user/:id called with id:", email);
    const user = await User.findOne({ email })
    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({message : error.message});
  }
});

app.get('/api/user/', async (req,res) => {
  try { 
    const user = await User.find({});
    res.status(200).json(user);
  } catch(error) {
    res.status(500).json({message : error.message});
  }
});

*/