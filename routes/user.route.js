const router = require("express").Router()
const userController = require("./../controllers/user.controller")

router
    .get("/order/:id", userController.userGetAllOrders)
    .get("/order-details/:id", userController.userGetOrderDetails)
    .post("/place-order", userController.userPlaceOrder)
    .get("/order-cancel/:id", userController.userCancelOrder)
    .post("/update-password", userController.userUpadtePassword)

module.exports = router