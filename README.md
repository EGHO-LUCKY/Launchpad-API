# 🚀 Launchpad API

> A RESTful API for registering users and publishing ideas.
> [Swagger Documentation](https://launchpad-api-omega.vercel.app/docs)

---

##  Overview

Launchpad API allows users to:

- Register and get authenticated
- Create and publish ideas
- View ideas
- Update and Delete personal ideas

---

##  Installation

###  Install dependencies

```bash
pnpm install
```

---
###  Setup environment variables

Create a .env file in the root directory and add:

```bash
PORT=5000
MONGO_URI=your_database_connection_string
SECRET=your_secret_key
```

###  Run the server
```bash
node app.js
```

 API Endpoints
```bash
<base_url>
https://launchpad-api-omega.vercel.app/
http://localhost:PORT
```

###  Root Route  
GET `/`  
Returns: "Register and/or login to use this platform"

###  Authentication

####  Register  

POST `/register`
```bash
Required_Fields = {
  "email": "string", // User email 
  "username": "string", // Fullname
  "password": "string"
}
```

 On success:

Registers user
Automatically logs them in

####  Login  

POST `/login`
```bash
Required_Fields = {
  "username": "string", // User email
  "password": "string"
}
```

 
####  Get All Ideas

GET  `/<user>/ideas`  
Returns all ideas published by users.

####  Create Idea  
POST `/<user>/ideas/`
```bash
Required_Fields = {
  "title": "string",
  "category": "string",
  "shortDescription": "string",
  "fullDescription": "string"
}
```

####  Get Idea by category

GET `/<user>/idea-category`

Returns ideas by Category.


####  Get My published Idea

GET `/<user>/my-ideas`

Return User published ideas.



####  Get Single Idea

GET `/<user>/ideas/<ideaId>`

Returns idea by ideaId.


####  Update Idea

PATCH `/<user>/ideas/<ideaId>`

Updates an idea by ideaId  
Only allowed if the idea belongs to the logged-in user


####  Delete Idea

DELETE `/<user>/ideas/<ideaId>`

Deletes idea by ideaId  
Only allowed if the idea belongs to the logged-in user
