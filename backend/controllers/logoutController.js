import User from "../model/user.js";

// build the refresh token handler:
export async function logoutController (req, res) {

    // on client side, delete the accessToken
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204) // No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const existingUser = await User.findOne({ refreshToken }).exec();
    if (!existingUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite:'None', secure: true })
        return res.sendStatus(204)
    }

    // Delete refreshToken in db
    existingUser.refreshToken = ''
    const result = await foundUser.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite:'None', secure: true })
    res.sendStatus(204)
}