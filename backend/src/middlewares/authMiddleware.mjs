import passport from "passport"

/**
 * 
 * Middleware to authenticate the user using JWT
 * Attaches the user object to the request if authenticated
 */
export const authenticateJWT = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "An error occurred during authentication"
            })
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not logged in. Please log in to access this resource."
            })
        }

        req.user = user;
        next();

    })(req, res, next);
}