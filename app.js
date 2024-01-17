const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model.js');

const app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Iteration 1 - Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/express-mongoose-recipes-dev';

mongoose
    .connect('mongodb://localhost:27017/express-mongoose-recipes-dev', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((x) =>
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
    )
    .catch((err) => console.error('Error connecting to mongo', err));

// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send('<h1>LAB | Express Mongoose Recipes</h1>');
});

//  Iteration 3 - Create a Recipe route
app.post('/api/recipes', async (request, response) => {
    console.log(request.body);
    const payload = request.body;
    try {
        // Create the recipe
        const newRecipe = await Recipe.create(payload);
        // Return the new recipe into the response
        response.status(201).json(newRecipe);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error });
    }
});
//  Iteration 4 - Get All Recipes
//  GET  /recipes route

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

// Start the server
app.listen(5005, () => console.log('My first app listening on port 5005!'));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
