const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: String, required: true },
  user: { type: String, required: true },
});

// Middleware for pre-save validation and modification
expenseSchema.pre("save", function (next) {
  // Example: Convert category to uppercase
  this.category = this.category.toUpperCase();

  // Continue with the save operation
  next();
});

// Middleware for post-save actions
expenseSchema.post("save", function (doc, next) {
  // Example: Perform post-save actions
  console.log("Expense saved:", doc);

  // Continue with the middleware chain
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
