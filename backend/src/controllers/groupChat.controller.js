const GroupModel = require("../models/groups.model");
const GroupChatModel = require("../models/group.chat.model");
const userModel = require("../models/user.model");

const sendMessageController = async (req, res) => {
  const { groupId } = req.params;
  const { message } = req.body;

  try {
    const group = await GroupModel.findById(groupId);

    // check if sender is a member of the group
    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }


    // check if group exists
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // check if sender is a member of the group
    const member = group.members.find(
      (m) => m.userId.toString() === req.user._id.toString()
    );

    if(!member) {
      return res.status(403).json({ message: "You are not a member of this group" });
    }

    const newmessage = await GroupChatModel.create({
        groupId,
        sender: req.user._id,
        message,
    })


    return res
      .status(201)
      .json({ message: "Message sent successfully", chat: newmessage });



  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};


// get messages of a group chat


const getGroupMessagesController = async (req, res) => {
    const { groupId } = req.params;

    try {
        const group = await GroupModel.findById(groupId);

        // check if group exists
        if (!group) {
          return res.status(404).json({ message: "Group not found" });
        }

        // check if sender is a member of the group
        const member = group.members.find(
          (m) => m.userId.toString() === req.user._id.toString()
        );
        if(!member) {
          return res.status(403).json({ message: "You are not a member of this group" });
        }

        const messages = await GroupChatModel.find({groupId}).sort({createdAt: 1}).populate('sender', 'name email');

        res.status(200).json({ messages });
        
    } catch (error) {
        return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
    }
}

module.exports = { sendMessageController , getGroupMessagesController };
