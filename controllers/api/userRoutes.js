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

//route for registered user to login:
router.post('/login', async (req, res) => {
  try {
    // find user by email from post request body
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'login failed: incorrect email or passoword' });
      return;
    }

    // create variable to check if the password in the post request body matches the password in the database, if not, return 400 error
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'login failed: incorrect email or passoword' });
      return;
    }

    // use the ID of the logged in user to create session variables 
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'Login successful!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});
//localhost:3001/api/users/logout
router.post("/logout", (req,res) =>{
  req.session.destroy(()=> {
    res.json("Signed out successfully!")
  })
})

module.exports = router