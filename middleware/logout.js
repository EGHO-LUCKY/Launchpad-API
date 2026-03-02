module.exports = (req, res, next) => {
  if (!req.user) return res.json({message: "No User is logged in"});

  req.loggedOutUser = req.user;
  req.logout(err => {
      if (err) return next(err);
      next();
    });
  }