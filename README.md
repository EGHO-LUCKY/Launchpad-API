# 🚀 Launchpad API

> A RESTful API for registering users and publishing ideas.

---

## 📌 Overview

Launchpad API allows users to:

- Register and authenticate
- Create and publish ideas
- View ideas
- Delete their own ideas

---

## ⚙️ Installation

### 1️⃣ Install dependencies

```bash
pnpm install

---
### 2️⃣ Setup environment variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_database_connection_string
SECRET=your_secret_key

###  3️⃣ Run the server
node app.js

🌐 API Endpoints

<base_url> = Your deployed URL or http://localhost:PORT

🏠 Root Route
GET /
Returns: "Register and/or login to use this platform"

👤 Authentication

🔐 Register

POST /register
Required_Fields = {
  "email": "string",
  "username": "string",
  "password": "string"
}

✅ On success:

Registers user
Automatically logs them in

🔑 Login

POST /login
Required_Fields = {
  "username": "string",
  "password": "string"
}


💡 Ideas
📄 Get All Ideas

GET /<user>/ideas
Returns all ideas published by users.

➕ Create Idea
POST /<user>/ideas
Required_Fields = {
  "title": "string",
  "category": "string",
  "shortDescription": "string",
  "fullDescription": "string"
}

🔍 Get Single Idea
GET /<user>/ideas/<ideaId>
Returns idea by ideaId.


❌ Delete Idea
DELETE /<user>/ideas/<ideaId>
Deletes idea by ideaId
Only allowed if the idea belongs to the logged-in user