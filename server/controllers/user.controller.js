import User from "../model/user.model.js";

export const getUserForSidebar = async (req, res) => {
   try {
      const loggedInUserId = req.user._id;
      //every user in db except loggedin user
      const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password"); 
      res.status(200).json(filteredUsers);  
   } catch (error) {
       console.log("Error in getUserForSidebar controller", error.message);
       return res.status(500).json({ error: "Internal Server Error" });
    
   } 
}