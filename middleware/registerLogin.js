const User = require("../models/user");

module.exports = async (req, res, next) => {
    try {
        const user = await User.register({
            username: req.body.email,
            fullName: req.body.username,
        }, req.body.password);

        req.login(user, (err) => {
            if (err) {
                next(err);
                return res.json({ message: "Login after registration failed", error: err });
            }
            next();
        });
    } catch (err) {
        next(err);
        if (err.name === "UserExistsError") {
            return res.json({ message: "Email already exist" });
        };
        return res.json({ message: "Failed to create user" });;
    }
}
