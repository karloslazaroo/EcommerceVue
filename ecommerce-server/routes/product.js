const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Save files to the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });




  router.post('/api/product', upload.single('image'), (req, res) => {
    const thumbnail = 'uploads/' + req.file.filename; // Correct path to the image
    res.json({ thumbnail: thumbnail });
  });

// get all products
router.get('/', async (req, res) =>{
    try {
        const product = await Product.find();
        res.json(product);

    } catch (err) {
        res.json({message: err.message});

    }
});

//add new product
router.post('/', async (req, res) =>{
    const product = new Product({
      product_name: req.body.product_name,
      thumbnail: req.body.thumbnail, // Updated to use the correct field name
      quantity: req.body.quantity,
      description: req.body.description,
      price: req.body.price,
      size: req.body.size,
    });
  
    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (err) {
      res.json({ message: err.message });
    }
  });

//delete product
router.delete('/:id', getProduct, async (req,res) => {
    try {
        await res.product.deleteOne()
        res.json({message: 'Deleted Product'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//update product
router.patch('api/product/:id', getProduct, async (req, res)=>{
   
    if (req.body.product_name != null) {
        res.product.product_name = req.body.product_name
    }

    if (req.body.thumbnail != null) {
        res.product.thumbnail = req.body.thumbnail
    }
    
    if (req.body.quantity != null) {
        res.product.quantity = req.body.quantity
    }
    if (req.body.description != null) {
        res.product.description = req.body.description
    }
    if (req.body.price != null) {
        res.product.price = req.body.price
    }
    if (req.body.size != null) {
        res.product.size = req.body.size
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


async function getProduct (req, res, next) {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product'})
        }
    } catch (err) {
        return res.status(500).jsonn ({message: err.message})

    }

    res.product = product
    next()

}

module.exports = router;
