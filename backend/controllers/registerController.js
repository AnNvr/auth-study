import User from "../model/user.js";
import bcrypt from "bcrypt";

export async function registerController(req, res) {
    console.log(req.body);

    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({
            message: "Username and password are required.",
        });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username: username }).exec();
    if (duplicate) return res.sendStatus(409); // Conflict for duplication

    try {
        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create and store new user
        const result = await User.create({
            username: username,
            password: hashedPassword,
        });
        console.log(result);
        res.status(201).json({
            success: `User ${username} created!`,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal server error",
        });
    }
}
