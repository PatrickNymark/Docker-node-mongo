const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Models
const Item = require('./models/Item');

// Body-parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set('view engine', 'ejs');


// Connect to MongoDB
mongoose
    .connect(
        'mongodb://mongo:27017/docker-node-mongo',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    Item.find()
        .then(items => res.render('index', { items }))
        .catch(err => res.status(404).json(err));
});

app.post('/item/add', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.redirect('/'));
});


const port = 5000 || process.env.PORT;

app.listen(port, () => console.log(`Server running on ${port}`))