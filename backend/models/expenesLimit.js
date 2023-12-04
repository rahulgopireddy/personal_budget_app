const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseLimitSchema = new Schema({
  monthlybudget: { type: Number, required: true },
  user: { type: String, required: true },
  currentMonth: { type: Number, required: true },
  debtpayments: { type: Number, required: true },
  education: { type: Number, required: true },
  entertainment: { type: Number, required: true },
  groceries: { type: Number, required: true },
  insurance: { type: Number, required: true },
  miscellaneous: { type: Number, required: true },
  rent: { type: Number, required: true },
  savings: { type: Number, required: true },
  transportation: { type: Number, required: true },
  utilities: { type: Number, required: true },
});

const ExpenseLimit = mongoose.model("ExpenseLimit", expenseLimitSchema);
module.exports = ExpenseLimit;
