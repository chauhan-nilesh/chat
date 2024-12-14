import conversations from "../models/conversation.model.js";

const getData = async (req, res) => {
    const { sender, recipient } = req.body;

    let conversation = await conversations.findOne({
        participants: { $all: [sender, recipient] },
    });

    if (!conversation) {
        conversation = conversations.create({ participants: [sender, recipient], messages: [] });
    }

    return res.status(200).json({
        statusCode: 200,
        data: conversation.messages,
        message: "Messages retrieved successfully"
    })
}

export {
    getData
}