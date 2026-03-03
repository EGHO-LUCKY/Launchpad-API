module.exports = (req, res, next) => {
    const {title, category, shortDescription, fullDescription} = req.body;

    if (!title || !category || !shortDescription || !fullDescription){
      return res.status(400).json({message: "Missing Idea field(s)"});
    }
    next();
}