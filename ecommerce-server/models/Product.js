const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_name: {    
        type:String,
        required: true
    },
    thumbnail: {     
        type: String,
        required: true
    },
    quantity: {     
        type: Number,
        required: true
    },
    description: {     
        type: String,
        required: true
    },
    price: {     
        type: Number,
        required: true
    },
    size: {     
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Product', productSchema);



