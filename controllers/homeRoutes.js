//import express so we can run the server routes
const router = require('express').Router();
//import the models from './models so we can use them in this module
const { User, Blog} = require('../models');
//withAuth allows us to only render certain pages to authorized users
const withAuth = require('../utils/auth');

//middleware tracks when homeroutes are hit and logs that to console
router.use((req, res, next) => {
    console.log("===============================HOMEROUTES HIT ==================================")
    next()
})

//home route endpoint for homepage, get request for homepage handlebars view
router.get('/', async (req, res) => {
    console.log("homepage hit")
    try {
        //.findAll returns an array of objects from the Blog model/data (all the blog post objects), .catch handles the error and inside the error function if ther's an error it's logged and returned as the server response
        const blogData = await Blog.findAll().catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
        //const blogs = [{id: 1, title: "Blog 1"}, {id: 2, title: "Blog 2"},] this is what the array of blog objects looks like, except with the descriptions too
        //.map takes one array, does another function on that array data, an returns a new array of results
        //in this case we take the array of blog objects from blogData, and we use {plain:true} to serialize the data so we only get the infomration we need and put it into a new array called 'blogs'
        const blogs = blogData.map((blog)=> blog.get({plain: true}));
        // response renders hompage handlebars view, '.render' also accepts an object parameter, and I passed it the object 'blogs' so that those can render on screen too
        //if users needed to be logged in to see blogs, we would also pass 'logged_in:req.session.logged_in' inside the curly braces after 'blogs' to state that they needed a session authentication
        res.render("homepage", {blogs});
        //catch error if not successful and send status 500 server response, log error
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//homeroute endpoint for dashboard handlebars view, connects /dashboard URL endpoint to the correct view with response.render
//withAuth variable inside the get request makes sure the user is authenticated to see the dashboard

router.get("/dashboard", withAuth, async(req,res) => {
    try {
     //findAll return an array of objects from the blog model/data where the user is the specific logged in user
     //try catch block allows us to catch and log error responses
     const userBlogData = await Blog.findAll({where: {
         user_id: req.session.user_id,
     }}).catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
 //.map takes one array, does another function on that array data, an returns a new array of results
 //in this case we take the array of user-specific blog objects from userBlogData, and we use {plain:true} to serialize the data so we only get the infomration we need and put it into a new array called 'blogs'
     const userBlogs = userBlogData.map((userBlog) => userBlog.get({plain: true}));
     //response renders handlebars.js dashboard view and passes it the serialized user-specific blog data, session/user login/auth information
     res.render('dashboard', {userBlogs, logged_in: req.session.logged_in});
    } catch (error) {
     //catch and respond with error message if not successful
     res.status(500).json(err);
    }
 });
//home route to render the signup handlebars view with the /signup URL endpoint
router.get("/signup", (req, res) => {
    console.log("===================Signup route hit======================")
    res.render("signup")
});
//home route to render the login handlebars view with the /login URL endpoint
router.get("/login", (req, res) => {
    console.log("=====login route hit======")
    res.render("loginPage")
});

module.exports = router