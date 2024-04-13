const hasAuth = (req, res, next) => {
    // if user isn't logged in, they get redirected to the login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = hasAuth;