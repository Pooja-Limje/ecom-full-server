// publicGetAllProduct
// publicGetProductDetails
const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")

exports.publicGetAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find({ active: true })
    res.json({ message: "Product Fetch Success", result })
})

exports.publicGetProductDetails = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)
    res.json({ message: "Product Detail Fetch Success" })
})