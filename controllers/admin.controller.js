const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")
const { upload } = require("../utils/upload")
const cloudinary = require("cloudinary").v2
const path = require("path")
const Order = require("../models/Order")
const User = require("../models/User")


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Product Fetch Success", result })
})
exports.addProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload error" })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        // console.log(req.file.path)
        const result = await Product.create({ ...req.body, images: secure_url })
        res.json({ message: "Product Add Success", result })
    })
})
exports.updateProduct = asyncHandler(async (req, res) => {
    res.json({ message: "Product Update Success" })
})
exports.deleteProduct = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)
    const str = result.images.split("/")
    const img = str[str.length - 1].split(".")[0]
    await cloudinary.uploader.destroy(img)
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product Delete Success" })
})
exports.deactivateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, { active: false })
    res.json({ message: "Product Deactivate Success" })
})
exports.activateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, { active: true })
    res.json({ message: "Product Activate Success" })
})

exports.getProductDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Product Detail Fetch Success" })
})
// order
exports.getAllOrders = asyncHandler(async (req, res) => {
    const result = await Order.find()
        .populate("user", { password: 0, active: 0, createdAt: 0, __v: 0 })
        .populate("products.product", {
            _id: 1, name: 1, desc: 1, price: 1, mrp: 1, images: 1
        })
        .sort({ createdAt: -1 })
    res.json({ message: "Order Fetch Success", result })
})
exports.getOrderDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Order Detail Fetch Success" })
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    res.json({ message: "Order Cancel Success" })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    await Order.findByIdAndUpdate(id, { status })
    res.json({ message: "Order Status Update Success" })
})

// user
exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User Fetch Success", result })
})
exports.getUserDetails = asyncHandler(async (req, res) => {
    res.json({ message: "User Detail Fetch Success" })
})
exports.blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(id, { active: false })
    res.json({ message: "User Block Success" })
})
exports.unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndUpdate(id, { active: true })
    res.json({ message: "User Un-Block Success" })
})
exports.getUserOrders = asyncHandler(async (req, res) => {
    res.json({ message: "User Order Fetch Success" })
})