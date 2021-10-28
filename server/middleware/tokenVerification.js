import jwt from "jsonwebtoken";


/**
 * Middleware to verify authentication token.
 */
export default (req, res, next) => {
    const header = req.headers.Authorization;
    if (!header) res.status(401).json({ data: null, message: "Not Logged In!" });
    else {
        try {
            const token = header.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_KEY, (err, payload) => {
                if (err) res.status(403).json({ data: null, message: "Unauthorized!" });
                else {
                    req.currentUser = payload;
                    next();
                }
            });
        } catch (error) {
            res.status(500).json({ data: null, message: "Something went wrong on the server." });
        }
    }
}