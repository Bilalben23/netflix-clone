import passport from "passport"
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt"
import { ENV_VARS } from "./envVars.mjs"
import { User } from "../models/user.model.mjs"


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ENV_VARS.ACCESS_SECRET_TOKEN
}


export function configurePassport() {
    passport.use(
        new JWTStrategy(options, async (payload, done) => {
            try {
                const foundUser = await User.findById(payload.id);
                if (foundUser) {
                    return done(null, foundUser);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                done(err, false);
            }
        })
    )
}

