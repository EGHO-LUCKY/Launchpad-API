const User = require("../models/user");
const Idea = require("../models/idea");
const _ = require("lodash");

module.exports.home = (req, res) => {
    res.json({message: "Register and/or login to use this platform"});
}

module.exports.register = (req, res) => {
    res.json({ message: "Registration and login successful", user: req.user.fullName });
}

module.exports.login = (req, res) => {
    res.json({ message: "Logged in successfully", user: req.user.fullName });
}

module.exports.logout = (req, res) => {
    res.json({ message: "Logged out Successfully", username: req.loggedOutUser.fullName });
}

module.exports.getIdeas = async (req, res) => {
    const fullName = _.lowerCase(req.params.user);
    if (_.lowerCase(req.user.fullName) === fullName){
      const ideas = await Idea.find();
      return res.json(ideas);
    };
    return res.status(401).json({message: `No Authentication found for ${fullName}`});
};

module.exports.putIdea = async (req, res, next) => {
    try {
        const { title, category, shortDescription, fullDescription } = req.body;
        const idea = await Idea.create({
        author: req.user.fullName,
        authorId: req.user._id,
        title,
        category,
        shortDescription,
        fullDescription
      });
      return res.json({message: "Idea Created Successfully", idea});
    } catch(err){
      next(err);
      return res.status(500).json({message: "Error Creating Idea"});
    }
}

module.exports.getIdea = async (req, res) => {
    const { ideaId } = req.params;
    const idea = await Idea.findOne({_id: req.params.ideaId});
    if (!idea){
      return res.status(404).json({message: `Idea with _id: ${ideaId} not found`});
    }
    return res.json(idea);
}

module.exports.patchIdea = async (req, res) => {
    const { ideaId } = req.params;
    const idea = await Idea.findOne({_id: req.params.ideaId});
    if (!idea) return res.status(404).json({message: `Idea with _id: ${ideaId} not found`});

    if (!idea.authorId.equals(req.user._id)) {
        return res.status(401).json({message: `Idea _id: ${ideaId} can only be updated by Author ${idea.author}`});
    } 

    const {title, category, shortDescription, fullDescription} = req.body;
    const newTitle = title || idea.title;
    const newCategory = category || idea.category;
    const newShortDescription = shortDescription || idea.shortDescription;
    const newFullDescription = fullDescription || idea.fullDescription;

    await Idea.updateOne({_id: idea._id},
      {$set: {
        title: newTitle,
        category: newCategory,
        shortDescription: newShortDescription,
        fullDescription: newFullDescription
      }}
    )
    
    return res.json({message: `Successfully Updated Idea _id: ${ideaId}`})
}

module.exports.deleteIdea = async (req, res) => {
    const { ideaId } = req.params;
    const idea = await Idea.findOne({_id: ideaId});
    if (!idea) return res.status(404).json({message: `Idea with _id: ${ideaId} not found`});

    if (!idea.authorId.equals(req.user._id)) {
        return res.status(401).json({message: `Idea _id: ${ideaId} can only be deleted by Author ${idea.author}`});
    }

    await Idea.deleteOne({_id: ideaId});
    return res.json({message: `Successfully Deleted Idea _id: ${ideaId}`})
  }

module.exports.ideaCategory = async (req, res) => {
    const ideas = await Idea.aggregate([{
        $group: {
            _id: "$category",      // group by category field
            ideas: { $push: "$$ROOT" }  // push full documents into each group
        }}])
        .sort({_id: 1}); // Sorts by _id in ascending order

    res.json(ideas);
}