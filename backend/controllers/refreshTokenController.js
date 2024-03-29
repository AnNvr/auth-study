import User from "../model/user.js";
import * as jwt from "jsonwebtoken";

export async function handleRefreshToken (req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt;

    const existingUser = await User.findOne({ refreshToken }).exec()
    if (!existingUser) return res.sendStatus(403) // Forbidden
    // verify jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || existingUser.username !== decoded.username) return res.sendStatus(403)
            const roles = Object.values(existingUser.roles)
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: decoded.username,
                        roles: roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s'}
            )
            res.json({ roles, accessToken })
        }
    )
}