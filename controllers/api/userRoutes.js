const router = require('express').Router();
const {User}   = require('../../models');
router.post("/", async(req,res) => {
    console.log("API users create route")
    try{
        const user = await User.create(req.body)
    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
        
        res.json({ user: user, message: 'You are now logged in!' });
      });
  
    } catch (err) {
        console.log("err: ",err)
      res.status(400).json(err);
    }

    // res.status(400).json("success",)
})

module.exports = router