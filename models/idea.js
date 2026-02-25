const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    user: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now}
});

const voteSchema = new mongoose.Schema({
    count: {type: Number, default: 0},
    user: String
});

const ideaSchema = new mongoose.Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    category: {type: String, required: true},
    shortDescription: {type: String, required: true},
    fullDescription: {type: String, required: true},
    comments: [commentSchema],
    votes: [voteSchema],
    createdAt: {type: Date, default: Date.now}
});

const Idea = mongoose.model("Idea", ideaSchema);

module.exports = Idea;