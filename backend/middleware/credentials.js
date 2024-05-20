import { whiteList } from "../config/corsOptions.js";

export const credentials = (req, res, next) => {
    // extract the `Origin` header from the incoming request
    const origin = req.headers.origin

    // check if the origin is included in the whitelist
    if (whiteList.includes(origin)) {

        // crucial for authentication: allows credential to be included on requests
        // made to this domain
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}