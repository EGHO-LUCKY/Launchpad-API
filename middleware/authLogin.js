const passport = require("passport");

module.exports = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.json({ message: info });
    }

    req.login(user, (err) => {
      if (err) return next(err);

      req.authUser = user;
      next();
    });
  })(req, res, next)
}
