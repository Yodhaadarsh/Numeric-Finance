const express = require("express");
const router = express.Router();
const GroupModel = require("../models/groups.model");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  groupController,
  inviteMembersController,
  getUserGroupsController,
  getGroupMembersController,
} = require("../controllers/group.controller");
const {
  groupExpenseEntry,
} = require("../controllers/expense.tracker.controller");
const {
  sendMessageController,
  getGroupMessagesController,
  getGroupController,
} = require("../controllers/groupChat.controller");

// Create a new group
router.post("/create", authMiddleware, groupController);

// invite members to group
router.post("/invite/:groupId", authMiddleware, inviteMembersController);

// get all groups of a user
router.get("/all-groups", authMiddleware, getUserGroupsController);

// add group expense entry
router.post("/expense/:groupId", authMiddleware, groupExpenseEntry);

// to find the group members
router.get("/members/:groupId", authMiddleware, getGroupMembersController);

// for group chat messages
router.post("/chat/:groupId", authMiddleware, sendMessageController);

// get group chat messages

router.get("/chat/:groupId", authMiddleware, getGroupMessagesController);

// to get a group

router.get("/group/:id", authMiddleware, getGroupController);

module.exports = router;
