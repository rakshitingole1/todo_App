const mongoose = require('mongoose');

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/todo_list_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0');

// Get the default Mongoose connection
const db = mongoose.connection;

// Event listener for connection error
db.on('error', console.error.bind(console, 'Error connecting to database:'));

// Event listener for successful connection
db.once('open', function() {
    console.log('Successfully connected to the database');
});

// Define your schema and models below if needed
