const User = require("../models/user");
const validator = require("validator");

module.exports = async (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(400).json({message: "InvalidEmailError"});
    }
    
    try {
        const user = await User.register({
            username: req.body.email,
            fullName: req.body.username,
        }, req.body.password);

        req.login(user, (err) => {
            if (err) {
                next(err);
                return res.status(500).json({ message: "Login after registration failed", error: err });
            }
            next();
        });
    } catch (err) {
        next(err);
        if (err.name === "UserExistsError") {
            return res.status(409).json({ message: "Email already exist" });
        };
        return res.status(501).json({ message: "Server Error - Failed to create user" });;
    }
}
