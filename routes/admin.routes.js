const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")

router
    .get("/products", adminController.getAllProducts)
    .post("/add-products", adminController.addProduct)
    .put("/update-products/:id", adminController.updateProduct)
    .delete("/delete-products/:id", adminController.deleteProduct)
    .put("/deactivate-products/:id", adminController.deactivateProduct)
    .put("/activate-products/:id", adminController.activateProduct)
    .get("/product-details/:id", adminController.getProductDetails)

    .get("/orders", adminController.getAllOrders)
    .get("/order-detail/:id", adminController.getOrderDetails)
    .put("/cancel-order/:id", adminController.cancelOrder)
    .put("/update-order-status/:id", adminController.updateOrderStatus)

    .get("/users", adminController.getAllUsers)
    .get("/user-details/:id", adminController.getUserDetails)
    .put("/block-user/:id", adminController.blockUser)
    .put("/unblock-user/:id", adminController.unblockUser)
    .get("/user-orders/:id", adminController.getUserOrders)


module.exports = router