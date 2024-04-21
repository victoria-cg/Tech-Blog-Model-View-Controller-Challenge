const {Blog} = require("../../models/")
const withAuth = require("../../utils/auth")
const router = require("express").Router()

//create/post a new blog associated with the logged in user
router.post("/", withAuth, async(req,res) => {
    const newBlog = Blog.create({...req.body, user_id: req.session.user_id})
})

//delete a blog associated with the logged in user by its id as a parameter on the delete API route
router.delete("/:id", withAuth, async(req,res) => {
    const deletedBlog = Blog.destroy({where: {
        user_id: req.session.user_id,
        id: req.params.id
    }})
})

//GET API route for all the blogs associated with the logged in user
//user's own blogs are returned at the api/blogs/dashboard endpoint
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


module.exports = router