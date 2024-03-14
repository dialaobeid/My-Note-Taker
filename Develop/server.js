const express = require('express');
const path = require('path');

// const index = require('./public/assets/js/index.js'); 

// linking to the routes folder
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initializing the app & creating a port
const app = express();
const PORT = process.env.PORT || 3000;

// route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// to use apiRoutes & htmlRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// to start the server
app.listen(PORT, () => console.log(`Working on PORT: ${PORT}`));
