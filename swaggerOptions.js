const path = require("path");

module.exports = (port) => ({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Launchpad API",
            version: "1.0.0",
            description: "Launchpad is an idea validation platform designed to help users share, evaluate, and discover startup ideas within a structured community environment. Users can submit ideas, categorize them, receive feedback through comments, upvote promising concepts, and explore trending submissions.",
            contact: {
                name: "LUCKY EGHO (MD)",
                email: "egholucky1@gmail.com"
            }
        },
        servers: [
            {
                url: process.env.SWAGGER_HOST || "http://localhost:3000",
                description: "API server"
            }
        ]
    },
    apis: [
        path.join(__dirname, "./docs/registerSwagger.js"),
        path.join(__dirname, "./docs/loginSwagger.js"),
        path.join(__dirname, "./docs/ideasSwagger.js")
    ]
});