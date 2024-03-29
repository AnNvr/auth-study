import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { logger } from "./middleware/logEvents.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import { db } from "./config/db.js";
import { credentials } from "./middleware/credentials.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

// create express app
const app = express();

// define a PORT for the server
const PORT = process.env.PORT || 3500;

// connect to MongDB
db();

// custom middleware logger
app.use(logger);

// handle options credentials check before CORS
app.use(credentials);

// Enable CORS
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// routes for registration and authentication that don't require JWT verification
import registerRouter from "./routes/register.js";
app.use(registerRouter);
import authRouter from "./routes/auth.js";
app.use(authRouter);
import refreshRouter from "./routes/refresh.js";
app.use(refreshRouter);
import logoutRouter from "./routes/logout.js";
app.use(logoutRouter);

app.use(verifyJWT);
import usersRouter from "./routes/api/users.js";
app.use(usersRouter);

// Error handler should be the last middleware
app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
