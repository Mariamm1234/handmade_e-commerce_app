const mongoose = require('mongoose');
const url='mongodb://localhost:27017/e-commerce'
const connectDb = () => {
    mongoose.connect(url).then(() => {
        console.log('Connected successfully to server');
    });
}

module.exports = connectDb;