const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});


//route that handles logging out other users, redirects to admin 
router.get("/logoutUser/:sessionKey", (req,res) => {
  //gets the sessionKey from param
  req_key = req.params.sessionKey
  //destroys whatever is in the sessionStore at sessionKey
  req.sessionStore.destroy(req_key);
  
  //redirect back to admin
  res.redirect('/admin')
})


router.get('/github', passport.authenticate('github'))

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


module.exports = router;
