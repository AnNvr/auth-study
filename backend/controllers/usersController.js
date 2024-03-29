import User from "../model/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users)
        return res.status(204).json({
            message: "No users found.",
        });
    res.json(users);
};

export const getUserByID = async (req, res) => {
    // check if the ID exists
    if (!req?.params?.id)
        return res.status(400).json({
            message: "User ID required",
        });
    // test passed - now search for the user
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({
            message: `User ID ${req.params.id} not found`,
        });
    }
    res.json(user);
};

export const deleteUser = async (req, res) => {
    if (!req?.body?.id)
        return res.status(400).json({
            message: "User ID required",
        });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({
            message: `User ID ${req.params.id} not found`,
        });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
};

// chaning operator in the conditional statement should allow me
// to access the id of the user's object even if either the req, or the body/params values
// are undefined or null.
