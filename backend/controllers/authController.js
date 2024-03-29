import User from "../model/user.js";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export async function authController (req, res) {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({
            message: "Username and password required"
        })
    }

    // Check if the user exists
    const existingUser = await User.findOne({ username: user }).exec();
    if (!existingUser) return res.sendStatus(401); // Unauthorized

    // If user exists, analyze password with the stored one in the db
    const match = await bcrypt.compare(password, existingUser.password)
    if (match) {
        const roles = Object.values(existingUser.roles).filter(Boolean)

        // Create jwts token
        const accessToken = jwt.sign(
            // Payload
            {
                UserInfo: {
                    username: existingUser.username,
                    roles: roles
                }
            },
            // Secret
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s'}    
        );
        const refreshToken = jwt.sign(
            // Payload
            {username: existingUser.username},
            // Secret
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        // Saving refreshToken with current user
        existingUser.refreshToken = refreshToken;
        const result = await existingUser.save();
        console.log(result)
        console.log(roles)

        // Create secure cookie with refresh token
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000})

        // Send authorisation roles and access token to user
        res.json({ roles, accessToken })

    } else {
        res.sendStatus(401)
    }
}