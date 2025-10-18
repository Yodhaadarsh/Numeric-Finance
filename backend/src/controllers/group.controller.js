const GroupModel = require("../models/groups.model");
const userModel = require("../models/user.model");


const groupController = async (req, res) => {
  const { name } = req.body;

  try {
    const newgroup = new GroupModel({
      name,
      members: [{ userId: req.user._id, role: "admin" }],
    });

    await newgroup.save();

    // update user's groups

    await userModel.findByIdAndUpdate(req.user._id, {
      $push: { groups: newgroup._id },
    });

    await newgroup.save();
    return res
      .status(201)
      .json({ message: "Group created successfully", group: newgroup });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

// invite members to group

const inviteMembersController = async (req, res) => {
  const { email } = req.body;
  const { groupId } = req.params;

  try {
    const group = await GroupModel.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // only admin can invite members

    const member = await group.members.find(
      (m) => m.userId.toString() === req.user._id.toString()
    );

    if (!member || member.role !== "admin") {
      return res.status(403).json({ message: "Only admin can invite members" });
    }

    const userToInvite = await userModel.findOne({ email });

    if (!userToInvite) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if user is already a member
    const isAlreadyMember = await group.members.find(
      (m) => m.userId.toString() === userToInvite._id.toString()
    );

    if (isAlreadyMember) {
      return res.status(400).json({ message: "User is already a member" });
    }

    // add member to group

    group.members.push({ userId: userToInvite._id, role: "member" });
    await group.save();

    userToInvite.groups.push(group._id);
    await userToInvite.save();

    res.json({ message: `${userToInvite.fullname} added to group ${group.name}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const getUserGroupsController = async (req, res) => {
  try {
    const groups = await GroupModel.find({ "members.userId": req.user._id });
    console.log(groups.length);
    return res.status(200).json({ groups });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  groupController,
  inviteMembersController,
  getUserGroupsController,
};
