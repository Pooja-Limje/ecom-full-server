const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/public", require("./routes/public.route"))
app.use("/api/user", require("./routes/user.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "Server Error", error: err.message })
})

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})