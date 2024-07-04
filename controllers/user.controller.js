// useGetAllOrders
// userGetOrderDetails
// userUpadtePassword
// userPlaceOrder
// userCancelOrder

const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")

exports.userGetAllOrders = asyncHandler(async (req, res) => {
    const result = await Order.find({ user: req.params.id }).populate("products.product").sort({ createdAt: -1 })
    res.json({ message: "Order Fetch Success", result })
})
exports.userGetOrderDetails = asyncHandler(async (req, res) => {
    const result = await Order.findById({ user: req.params.id })
    res.json({ message: "Order Details Fetch Success", result })
})
exports.userUpdatePassword = asyncHandler(async (req, res) => {
    res.json({ message: "Order Update Success", result })
})
exports.userPlaceOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "Order Place Success" })
})
exports.userCancelOrder = asyncHandler(async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, { status: "cancel" })
    res.json({ message: "Order Cancel Success" })
})
