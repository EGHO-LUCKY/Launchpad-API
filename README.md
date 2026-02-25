# Launchpad API

## USAGE
pnpm add

Add Environment variable

## ROUTES
### https://<base url>/ 
=========== Returns ============== 
"Register and/or login to use this platform"


### https://<base url>/register
=========== Requires ============= 
nameOfInputFields = {"email", "username" and "password"}

On Success: REGISTERS AND LOGIN USER
================================== 


### https://<base url>/login
=========== Requires ============= 
nameOfInputFields = {"username" and "password"}


### https://<base url>/<user>/ideas
GET: Gets all Ideas published by users
POST: Creates an Idea with the required input fields
nameOfInputFields = {title, category, shortDescription fullDescription}
================================== 


### https://<base url>/<user>/ideas/<ideaId>
GET: Gets Idea by ideaId
DELETE: Deletes Idea by ideaId if idea was created by logged in User
================================== 


### https://<base url>/<user>/ideas/<ideaId>
Gets Idea by ideaId
================================== 
