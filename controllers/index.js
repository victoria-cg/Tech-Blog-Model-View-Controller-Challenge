const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
//creates express middleware for home routes and API routes
router.use("/api", apiRoutes)
router.use("/", homeRoutes)
module.exports = router

