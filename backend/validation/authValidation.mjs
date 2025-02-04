import { checkSchema } from "express-validator";


const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

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
        },
        escape: true
    },
    email: {
        in: "body",
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "Email is invalid"
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
            errorMessage: "Password must be at least 8 characters"
        },
        matches: {
            options: [strongPasswordRegex],
            errorMessage: "Password must include uppercase, lowercase, a number, and a special character"
        }
    }
})



export const loginValidation = checkSchema({
    email: {
        in: "body",
        trim: true,
        notEmpty: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: "email is invalid"
        },
        escape: true
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
        optional: true,
        toBoolean: true,
        isBoolean: {
            errorMessage: "Remember me must be a boolean"
        }
    }
})