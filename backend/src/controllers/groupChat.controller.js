const GroupModel = require("../models/groups.model");
const GroupChatModel = require("../models/group.chat.model");
const userModel = require("../models/user.model");

const sendMessageController = async (userid, groupId, message, io) => {
  try {
    if (!message || message.trim() === "") {
      return; // just ignore empty messages
    }

    const group = await GroupModel.findById(groupId).populate("members.userId", "name email");
    if (!group) return;

    // check if sender is a member of the group
    const member = group.members.find(
      (m) => m.userId._id.toString() === userid.toString()
    );
    if (!member) return;

    // create and save new message
    const newMessage = await GroupChatModel.create({
      groupId,
      sender: userid,
      message,
    });

    // emit message to all users in the group room
    io.to(groupId).emit("receiveMessage", {
      _id: newMessage._id,
      sender: {
        _id: userid,
        name: member.userId.name, // name from populated user
      },
      message,
      timestamp: newMessage.createdAt,
    });

  } catch (err) {
    console.error("Socket send message error:", err);
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
    if (!member) {
      return res
        .status(403)
        .json({ message: "You are not a member of this group" });
    }

    const messages = await GroupChatModel.find({ groupId })
      .sort({ createdAt: 1 })
      .populate("sender", "name email");

    res.status(200).json({ messages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getGroupController = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await GroupModel.findById(id).populate(
      "members.userId",
      "name email"
    );

    // console.log(group);
    return res.status(200).json({
      group,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendMessageController,
  getGroupMessagesController,
  getGroupController,
};
