const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

//isAdmin redirects to /dashboard if not admin
router.get("/admin", isAdmin, (req,res) =>{
  //grab sessionStore
  req_obj = req.sessionStore.sessions

  //array to store the relevant information
  session_array = [];
  //loop through all the sessions in the req_obj
  for(i=0; i < Object.keys(req_obj).length;i++){
    //grab the string at object position i
    req_key = Object.keys(req_obj)[i];
    //parse the string at [req_key] into an object
    cookie_and_pass = JSON.parse(req_obj[req_key])
    //parse the string into an object, and grab the .passport.user value (int)
    user_ID = JSON.parse(cookie_and_pass.passport.user)
    //push an object containing session key and userID
    session_array.push({SessionKey: req_key, SessionUserID: user_ID});
  }
  //render admin page with the array
  res.render("admin", {
    user:req.user,
    Sessions: session_array
  });
});

module.exports = router;
