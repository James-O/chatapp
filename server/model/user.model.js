import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{type:String, required:true},
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true, minlength:6},
    email: { type: String, required: true, unique:true },
    gender:{ type: String, required: true, enum:["male", "female"] },
    profilePic: { type: String, default: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/1d52d65a-d57f-4b68-b9fe-d7741ff6656c/4c4421c7-822a-46b9-8016-7c057f326af3.png" },
},
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;