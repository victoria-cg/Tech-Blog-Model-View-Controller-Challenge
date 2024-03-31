const router = require('express').Router();
const userRoutes = require("./userRoutes");

router.use((req, res, next) => {
    console.log("===============================APIROUTES HIT ==================================")
    next()
})

router.use("/users", userRoutes);
module.exports = router