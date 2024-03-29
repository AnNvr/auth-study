// CORS options here
export const list = [
    "https://www.yoursite.com",
    "http://localhost:3500",
    "http://127.0.0.1:5500",
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (list.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200,
};

// `origin` is a function called by the CORS middleware every time
// a request to the server comes from a domain. It has two parameters; origin and callback.
//  the `origin` parameter is the req coming through, `callback` is the callback fn
// to be called once the origin has been tested.
// Inside the the `origin` function, a check is executed to test if the origin of
// the req is in the list (list.indexOf(origin) !== -1) or if it isn't (!origin)
// If the origin is allowed or undefined, the callback kicks in a `null` or `true`.
// Else, it will throw an error and the access denied.
