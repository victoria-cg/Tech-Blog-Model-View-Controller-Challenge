//import express.js server
const router = require('express').Router();
//import files for user and blog API routes
const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");

router.use((req, res, next) => {
    console.log("===============================APIROUTES HIT ==================================")
    next()
})

//create aliases for routes to make the URL simpler for the API routes
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
module.exports = router