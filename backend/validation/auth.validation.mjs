import { checkSchema } from "express-validator";

export const signupValidation = checkSchema({
    username: {
        in: "body",
        trim: true,
        isString: {
            errorMessage: "Username must be a string"
        },
        notEmpty: {
            errorMessage: "Username is required"
        },
        isLength: {
            options: {
                min: 3,
                max: 25
            },
            errorMessage: "Username must be between 3 and 25 characters"
        }
    },
    email: {
        in: "body",
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "email is invalid"
        }
    },
    password: {
        in: "body",
        trim: true,
        notEmpty: {
            errorMessage: "Password is required"
        },
        isLength: {
            options: {
                min: 8
            },
            errorMessage: "Password is must be at least 8 characters"
        }
    }
})



export const loginValidation = checkSchema({
    email: {
        in: "body",
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "email is invalid"
        }
    },
    password: {
        in: "body",
        trim: true,
        notEmpty: {
            errorMessage: "Password is required"
        }
    },
    rememberMe: {
        in: "body",
        toBoolean: true,
        isBoolean: {
            errorMessage: "Remember me must be boolean"
        }
    }
})