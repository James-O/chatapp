import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

export const sendMessage = async (req, res) => {
    //console.log('message sent',req.params.id);
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO FUNCTIONALITY GOES HERE
        // await newMessage.save();
        // await conversation.save();

        //this will run parallel
        await Promise.all([conversation.save(),newMessage.save()]);
        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user.id;
        const conversation = await Conversation.findOne({
            participants:{ $all: [senderId,userToChatId]},
        }).populate("messages");
        if(!conversation){
            return res.status(200).json({messages:[]});
        }
        return res.status(200).json({messages:conversation.messages});
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
}