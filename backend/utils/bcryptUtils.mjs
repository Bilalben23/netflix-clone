
import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    const slatRound = 10;
    const hashedPassword = bcrypt.hash(password, slatRound);
    return hashedPassword;
}