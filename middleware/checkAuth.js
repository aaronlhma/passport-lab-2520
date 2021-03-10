module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
  isAdmin: (req, res, next) => {
    if (req.user === undefined){
      res.redirect('/auth/login');
    }
    if (req.user.role === 'admin') {
      return next();
    } res.redirect("/dashboard");
  },
};
