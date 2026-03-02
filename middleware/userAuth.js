module.exports = (req, res, next) => {
    if (!req.isAuthenticated()){
      return res.json({message: "User not Authenticated"});
    }
    
    const { user } = req.params;
    if (user !== req.user.fullName){
      return res.json({message: `${user} is not Authenticated`});
    }

    next();
}