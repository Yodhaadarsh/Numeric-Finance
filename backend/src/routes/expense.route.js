const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const { createExpenseEntry } = require('../controllers/expense.tracker.controller');
const router = express.Router();


router.post("/create" , authMiddleware , createExpenseEntry);





module.exports = router;