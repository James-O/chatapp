import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import genTokenAndSetCokie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, email, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password does not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: `User with ${email} already exists` });
        }
        //Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`

        const newUser = new User({ fullname, username, email, password: hashedPassword, gender, profilePic: gender === 'female' ? girlProfilePic : boyProfilePic });
        if (newUser) {
            //generate jwt token here
            genTokenAndSetCokie(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message: "User created successfully",
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller", error.message );
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        //generate jwt token here
        genTokenAndSetCokie(user._id, res);
        return res.status(200).json({
            message: "User Logged in successfully",
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error.message );
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
}

export const logout = async(req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message );
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
}