import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

//Import routes
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

//Import db connection
import connectToMongoDB from './db/mongodbconnect.js';

dotenv.config();
//initialize express app
const app = express();
const PORT = process.env.PORT || 8080;

//middle wares
app.use(express.json());
app.use(cookieParser());


//Importing routes
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

//start the server
app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server is listening on port ${PORT}`);
});


// app.get('/',(req,res)=>{
//     //root route = http://localhost:8082/
//     res.send('Hello World');
// });