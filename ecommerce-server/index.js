const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

app.use(bodyParser.json());
app.use(cors());

//mongodb+srv://karloslazaroo:101400karlo@cluster0.mongodb.net/Ecommerce-VUE?retryWrites=true&w=majority&ssl=true
//mongodb+srv://karloslazaroo:101400karlo@cluster0.eeo2sln.mongodb.net/Ecommerce-VUE

mongoose.connect('mongodb+srv://karloslazaroo:101400karlo@cluster0.eeo2sln.mongodb.net/Ecommerce-VUE', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', ()=> {
    console.log('Connected to MongoDB');
});


const inventoryRouter = require('./routes/product')

app.use('/api/product', inventoryRouter)
app.listen(4000, () => {
    console.log('Server is running');
});