import jwt from 'jsonwebtoken';

const genTokenAndSetCokie = (userId, res)=>{
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
         expiresIn: '15d' 
        });
        //set cookie
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,//MiliSec 
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        samesSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== 'development', // only set cookie on HTTPS
    });
    return token;
}

export default genTokenAndSetCokie;