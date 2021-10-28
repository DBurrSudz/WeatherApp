import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/**
 * Handles registration of a user
 * @param {*} req 
 * @param {*} res
 */
export const register = async (req, res) => {
    try {
        const foundDocument = await User.findOne({ email: req.body.email });
        if (foundDocument) res.status(400).json({ message: "Email Address is already taken." });
        else {
            delete req.body.confirm_password;
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user = new User(req.body);
            await user.save();
            res.status(201).json({ message: "Successfully Registered!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong on the server." });
    }


}

/**
 * Handles authentication of a user
 * @param {*} req
 * @param {*} res 
 */
export const authenticate = async (req, res) => {
    const { email, password } = req.body;
    try {
        const foundDocument = await User.findOne({ email: email });
        if (!foundDocument) res.status(404).json({ data: null, message: "Invalid Credentials!" });
        else {
            const isValid = await bcrypt.compare(password, foundDocument.password);
            if (!isValid) res.status(404).json({ data: null, message: "Invalid Credentials!" });

            //Valid so assign token and send back information
            else {
                const token = jwt.sign({ email: foundDocument.email, id: foundDocument._id }, process.env.TOKEN_KEY, { expiresIn: "2h" });
                res.status(200).json({ data: { user: foundDocument, token }, message: "Successfully logged in!" });
            }
        }

    } catch (error) {
        res.status(500).json({ data: null, message: "Something went wrong on the server." });
    }

}