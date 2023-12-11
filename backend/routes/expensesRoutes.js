// routes/expenses.js
const express = require("express");
const router = express.Router();
const Expense = require("../models/expense");
const ExpenseLimit = require("../models/expenesLimit");
const authMiddleware = require("../middleware/authMiddleware");
const { authenticateUser } = require("../middleware/authMiddleware");
// Read all expenses
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    console.error("Error retrieving expenses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/expenselimit/", async (req, res) => {
  const { user, currentMonth } = req.query;
  try {
    const expenseData = await ExpenseLimit.findOne({ user, currentMonth });
    res.json(expenseData || {});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
router.post("/expenselimit", async (req, res) => {
  const expenseData = req.body;
  try {
    await ExpenseLimit.findOneAndUpdate(
      { user: expenseData.user, currentMonth: expenseData.currentMonth },
      expenseData,
      { upsert: true }
    );
    res.status(200).send({ message: "Expense data saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// router.get("/protected", authMiddleware.authenticate, (req, res) => {
//   res.send("Protected route");
// });

// Create a new expense
router.post("/", authMiddleware.authenticate, async (req, res) => {
  const { name, category, amount, user, date, month } = req.body;
  try {
    const newExpense = await Expense.create({
      name,
      category,
      amount,
      user,
      date,
      month,
    });
    res.status(201).json({ message: "add expense recived" });
    // res.status(201).json(newExpense);
  } catch (error) {
    console.error("Error creating expense:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Read a single expense
router.get("/:id", async (req, res) => {
  const expenseId = req.params.id;

  try {
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    console.error("Error retrieving expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update an expense
router.put("/:id", async (req, res) => {
  const expenseId = req.params.id;
  const { name, category, amount } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { name, category, amount },
      { new: true, runValidators: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({
        message: "Validation Error",
        errors: Object.values(error.errors).map((e) => e.message),
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  const expenseId = req.params.id;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(201).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
