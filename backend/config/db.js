import mongoose from "mongoose";

export const db = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
    } catch (e) {
        console.error(e)
    }
}