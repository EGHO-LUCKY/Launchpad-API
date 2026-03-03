module.exports = (req, res, next) => {
    const { username, fullName, password } = req.body
    
    if (!username || !fullName || !password) {
            return res.status(400).json({ message: "Missing Credentials" });
    };

    next();
}