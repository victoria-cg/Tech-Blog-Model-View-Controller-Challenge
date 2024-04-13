const {Blog} = require("../../models/")
const withAuth = require("../../utils/auth")
const router = require("express").Router()

router.post("/", withAuth, async(req,res) => {
    const newBlog = Blog.create({...req.body, user_id: req.session.user_id})
})

router.delete("/:id", withAuth, async(req,res) => {
    const deletedBlog = Blog.destroy({where: {
        user_id: req.session.user_id,
        id: req.params.id
    }})
})
module.exports = router