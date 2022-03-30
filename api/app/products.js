const express = require('express');
const multer = require('multer');
const path = require('path');
const { nanoid } = require('nanoid');
const config = require('../config');
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    const query = {};
    const sort = {};

    if (req.query.filter === 'image') {
      query.image = {$ne: null};
    }

    if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
      sort._id = -1;
    }

    const products = await Product.find(query).sort(sort).populate("category", "title");

    return res.send(products);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(product);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin'), upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.price) {
      return res.status(400).send({message: 'Title and price are required'});
    }

    const productData = {
      category: req.body.category,
      title: req.body.title,
      price: parseFloat(req.body.price),
      description: req.body.description,
      image: null,
    };

    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = new Product(productData);

    await product.save();

    return res.send({message: 'Created new product', id: product._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;