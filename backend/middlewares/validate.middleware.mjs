import { matchedData, validationResult } from "express-validator"


export const validate = (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        })
    }
    req.body = matchedData(req);
    next();
}