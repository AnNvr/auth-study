import * as url from "url";
const __dirname = url.fileURLToPath(new URL("file:///C:/Projects/auth-study/backend/logs", import.meta.url));
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs"; // Synchronous fs module
import * as fsp from "fs/promises"; // Promises-based fs module
import path from "path";

export const logEvents = async (message, logName) => {
    const date = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${date}\t${uuidv4()}\t${message}`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsp.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsp.appendFile(
            path.join(__dirname, "..", "logs", logName),
            logItem
        );
    } catch (err) {
        console.log(err);
    }
};

export const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
    next();
};
