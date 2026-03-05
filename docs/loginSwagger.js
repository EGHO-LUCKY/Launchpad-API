/**
 * @swagger
 * tags:
 *   - name: Login
 *     description: Logs in a User
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLoginReqDto:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: email
 *         password:
 *           type: string
 *           description: password
 *     UserLoginResDto:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Login response
 *         user:
 *           type: string
 *           description: Fullname
 *       example:
 *         message: Registration and login successful
 *         user: Lucky Egho
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in User
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginReqDto'
 *     responses:
 *       "200":
 *         description: Success message and the fullname of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserLoginResDto'
 *       "401":
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: IncorrectUsernameError or IncorrectPasswordError
 */