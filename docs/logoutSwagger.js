/**
 * @swagger
 * tags:
 *   - name: Logout
 *     description: Logs out current User
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logs out User
 *     tags: [Logout]
 *     responses:
 *       200:
 *         description: Success message and the fullname of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: string
 *               example:
 *                 message: Logged out Successfully
 *                 user: egho lucky
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No User is logged in
 */
