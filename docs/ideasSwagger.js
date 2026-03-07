/**
 * @swagger
 * tags:
 *   - name: Ideas
 *     description: User Ideas
 */

// SCHEMAS
/**
 * @swagger
 * components:
 *   schemas:
 *     IdeaItemDto:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         author:
 *           type: string
 *         authorId:
 *           type: string
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         shortDescription:
 *           type: string
 *         fullDescription:
 *           type: string
 *         comments:
 *           type: array
 *           items:
 *             type: object
 *         votes:
 *           type: array
 *           items:
 *             type: object
 *         createdAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 * 
 *     IdeasViewResDto:
 *         type: array
 *         items:
 *           $ref: '#/components/schemas/IdeaItemDto'
 *         example:
 *           - _id: 3sasd98f7a98dfasd8f98f7a9d8ff98
 *             author: egho lucky
 *             authorId: 123456789
 *             title: Introduction to Artificial Intelligence
 *             category: Technology
 *             shortDescription: Basics of AI and its real-world applications
 *             fullDescription: An overview of Artificial Intelligence concepts including machine learning, neural networks, and automation. Covers practical applications such as chatbots like ChatGPT, recommendation systems used by Netflix, and autonomous technologies shaping modern industries.
 *             comments: []
 *             votes: []
 *             createdAt: 2026-02-26T01:01:55.831Z
 *             __v: 0
 * 
 *     IdeasViewCategoryResDto:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             _id: 
 *             type: string
 *             ideas:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IdeaItemDto'
 *         example:
 *           - _id: Technology
 *             ideas:
 *             - _id: 3sasd98f7a98dfasd8f98f7a9d8ff98
 *               author: egho lucky
 *               authorId: 123456789
 *               title: Introduction to Artificial Intelligence
 *               category: Technology
 *               shortDescription: Basics of AI and its real-world applications
 *               fullDescription: An overview of Artificial Intelligence concepts including machine learning, neural networks, and automation. Covers practical applications such as chatbots like ChatGPT, recommendation systems used by Netflix, and autonomous technologies shaping modern industries.
 *               comments: []
 *               votes: []
 *               createdAt: 2026-02-26T01:01:55.831Z
 *               __v: 0
 *
 *     IdeasCreateReqDto:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         category:
 *           type: string
 *         shortDescription:
 *           type: string
 *         fullDescription:
 *           type: string
 *
 *     IdeasCreateResDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         idea:
 *           $ref: '#/components/schemas/IdeaItemDto'
 *       example:
 *         message: Idea Created Successfully
 *         idea: 
 *           _id: 3sasd98f7a98dfasd8f98f7a9d8ff98
 *           author: egho lucky
 *           authorId: 123456789
 *           title: Introduction to Artificial Intelligence
 *           category: Technology
 *           shortDescription: Basics of AI and its real-world applications
 *           fullDescription: An overview of Artificial Intelligence concepts including machine learning, neural networks, and automation. Covers practical applications such as chatbots like ChatGPT, recommendation systems used by Netflix, and autonomous technologies shaping modern industries.
 *           comments: []
 *           votes: []
 *           createdAt: 2026-02-26T01:01:55.831Z
 *           __v: 0
 *
 *     IdeaViewResDto:
 *       type: object
 *       properties:
 *         idea:
 *           $ref: '#/components/schemas/IdeaItemDto'
 *       example:
 *         idea: 
 *           _id: 3sasd98f7a98dfasd8f98f7a9d8ff98
 *           author: egho lucky
 *           authorId: 123456789
 *           title: Introduction to Artificial Intelligence
 *           category: Technology
 *           shortDescription: Basics of AI and its real-world applications
 *           fullDescription: An overview of Artificial Intelligence concepts including machine learning, neural networks, and automation. Covers practical applications such as chatbots like ChatGPT, recommendation systems used by Netflix, and autonomous technologies shaping modern industries.
 *           comments: []
 *           votes: []
 *           createdAt: 2026-02-26T01:01:55.831Z
 *           __v: 0
 */  

// ROUTE
// /{user}/ideas

/**
 * @swagger
 * /{user}/ideas:
 *   get:
 *     summary: Get all ideas
 *     tags: [Ideas]
 *     description: Returns a list of all ideas in the database.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *     responses:
 *       200:
 *         description: List of all ideas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdeasViewResDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Authenticated
 *   post:
 *     summary: Creates new Idea for current User
 *     tags: [Ideas]
 *     description: Returns a Success message and details of Created Idea
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IdeasCreateReqDto'
 *     responses:
 *       200:
 *         description: Success message and details of Created Idea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdeasCreateResDto'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing Idea field(s)
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Authenticated
 */


// /{user}/ideas/{ideaId}
/**
 * @swagger
 * /{user}/ideas/{ideaId}:
 *   get:
 *     summary: Gets idea by ideaId
 *     tags: [Ideas]
 *     description: Returns idea by ideaId.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique mongodb _id
 *     responses:
 *       200:
 *         description: Returns the Idea with the specified ideaId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdeaItemDto'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid Idea ID
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Authenticated
 *   patch:
 *     summary: Updates an Idea of the current User
 *     tags: [Ideas]
 *     description: Returns a Success message
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of Idea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IdeasCreateReqDto'
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Successfully Updated Idea _id: sd7f8s7dfadga8d8a77d7faf7da8'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not authenticated
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Idea with _id: fk4jksfter4k5345lk45wef3l not found'
 *   delete:
 *     summary: Deletes an Idea of the current User
 *     tags: [Ideas]
 *     description: Returns a Success message
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *       - in: path
 *         name: ideaId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique ID of Idea
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Successfully Deleted Idea _id: s9d8f9s8dfs8d9fadhsdfh89'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not authenticated
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Idea with _id: fk4jksfter4k5345lk45wef3l not found'
 */


// /{user}/my-ideas
/**
 * @swagger
 * /{user}/my-ideas:
 *   get:
 *     summary: Get ideas of current user
 *     tags: [Ideas]
 *     description: Return ideas of the current user.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *     responses:
 *       200:
 *         description: Return Ideas of the current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdeasViewResDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Authenticated
 */


// /{user}/idea-category
/**
 * @swagger
 * /{user}/idea-category:
 *   get:
 *     summary: Get all ideas by category
 *     tags: [Ideas]
 *     description: Return all ideas by category.
 *     parameters:
 *       - in: path
 *         name: user
 *         required: true
 *         schema:
 *           type: string
 *         description: Fullname
 *     responses:
 *       200:
 *         description: Return Ideas of the current user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IdeasViewCategoryResDto'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not Authenticated
 */