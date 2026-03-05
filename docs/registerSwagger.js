/**
 * @swagger
 * tags:
 *   - name: Registration
 *     description: Register users routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCreateReqDto:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Fullname
 *         email:
 *           type: string
 *           description: Email
 *         password:
 *           type: string
 *           description: Password
 *     UserCreateResDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Registration outcome
 *         user:
 *           type: string
 *           description: Fullname of User
 *       example:
 *         message: Registration and login successful
 *         user: Lucky Egho
 */


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Registration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreateReqDto'
 *     responses:
 *       "201":
 *         description: The Fullname of the registered user and success message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserCreateResDto'
 *       "400":
 *         description: Missing Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing Credentials
 *       "409":
 *         description: Email already exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already exist
 *       "500":
 *         description: Login after registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login after registration failed
 *       "501":
 *         description: Server Error - Failed to create user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server Error - Failed to create user
 */