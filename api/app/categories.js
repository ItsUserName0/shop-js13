const express = require('express');
const Category = require('../models/Category');
const auth = require("../middleware/auth");
const permit = require('../middleware/permit');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch(e) {
    next(e);
  }
});

router.post("/", auth, permit('admin'), async (req, res, next) => {
  try {
    const categoryData = req.body;
    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
