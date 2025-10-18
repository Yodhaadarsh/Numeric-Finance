const express = require('express');
const router = express.Router();
const GroupModel = require('../models/groups.model');
const authMiddleware = require('../middlewares/auth.middleware');
const { groupController, inviteMembersController, getUserGroupsController } = require('../controllers/group.controller');


// Create a new group

router.post("/create" , authMiddleware , groupController);

// invite members to group

router.post("/invite/:groupId" , authMiddleware , inviteMembersController);

// get all groups of a user

router.get("/all-groups" , authMiddleware ,  getUserGroupsController);

module.exports = router;
