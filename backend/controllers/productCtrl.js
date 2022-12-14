const Product = require("../models/productModels");
const cloudinary = require('../middleware/cloudinary');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// Create new product
const createProduct = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path, {folder: 'vethuppi'}, use_filename => true, unique_filename => false);

  const product = await Product.productModel({
    user: req.user.id,
    title: req.body.title,
    desc: req.body.desc,
    img: {
      public_id: result.public_id,
      secure_url: result.secure_url,
    },
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    status: req.body.status,
  });
    const savedProduct = await product.save();
  res.status(201).json({ success: true, savedProduct });
});

// get all product details
const getProduct = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 15;
  const productsCount = await Product.productModel.countDocuments();

  const apiFeatures = new ApiFeatures(Product.productModel.find(), req.query)
    .search()
    .filter();
  apiFeatures.pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products, productsCount });
});

// Get one product details
const getOneProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

// Update one product --Admin
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  var product = await Product.productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  product = await Product.productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({ success: true, product });
});

// Delete one product
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.productModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  } else {
    await product.remove();
    res.status(200).json({ success: true, message: "Product deleteed" });
  }
});

module.exports = {
  createProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
