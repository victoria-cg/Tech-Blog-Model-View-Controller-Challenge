const router = require('express').Router();

//middleware tracks when homeroutes are hit and logs that to console
router.use((req, res, next) => {
    console.log("===============================HOMEROUTES HIT ==================================")
    next()
})

router.get('/', (req, res) => {
    console.log("homepage hit")
    var user = "Victoria Greenwood"
    const blogs = [{id: 1, title: "Blog 1"}, {id: 2, title: "Blog 2"},]
    res.render("homepage", {user,blogs, logged_in:req.session.logged_in})
});

router.get("/signup", (req, res) => {
    console.log("===================Signup route hit======================")
    res.render("signup")
})

router.get("/login", (req, res) => {
    console.log("=====login route hit======")
    res.render("loginPage")
})

module.exports = router