import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id:recieverId } = req.params;
    const senderId = req.user.id;

    console.log(`Sender ID: ${senderId}, Receiver ID: ${recieverId}, Message: ${message}`);

    let conversation = await prisma.conversation.findFirst({
        where:{
            participantIds:{
                hasEvery : [senderId,recieverId],
            }
        }
    });
    //beginning of new conversation 
    if(!conversation){
        conversation = await prisma.conversation.create({
            data:{
                participantIds:{
                    set:[senderId,recieverId]
                }
            }
        })
    }
    const newMessage = await prisma.message.create({
        data:{
            senderId,
            body : message,
            conversationId : conversation.id,   
        }
    })

    if(newMessage){
        conversation = await prisma.conversation.update({
            where:{
                id:conversation.id,
            },
            data:{
                messages:{
                    connect:{
                        id:newMessage.id,
                    }
                }
            }

        })
    }

    //socketio functionality
    const receiverSocketId = getReceiverSocketId(recieverId)

    if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage); 
    }

    res.status(201).json(newMessage)

  } catch (error) {
    console.error("error in sendMessage: ", error.message);
    res.status(500).json({ error: "internal server error" });
  }
}



export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user.id;

        const conversation = await prisma.conversation.findFirst({
            where:{
                participantIds : {
                    hasEvery:[senderId,userToChatId]
                }
            },
            include : {
                messages : {
                    orderBy : {
                        createdAt : "asc"
                    }
                }
            }
        })
        if(!conversation){
            return res.status(200).json([]);
        }
        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("error in getMessages: ", error.message);
    res.status(500).json({ error: "internal server error" });
    }
}

export const getUserForSideBar = async (req,res)=>{
try {
    const authUserId = req.user.id;
    
    const users = await prisma.user.findMany({
        where:{
            id:{
                not:authUserId
            }
        },
        select:{
            id:true,
            fullname:true,
            profilePic:true,
        }
    })
    res.status(200).json(users)
} catch (error) {
    console.error("error in getuserforsidebar: ", error.message);
    res.status(500).json({ error: "internal server error" });
}
}
