const Budget = require('../models/Budget');

// @desc    Get budgets
// @route   GET /api/budgets
// @access  Private
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set budget
// @route   POST /api/budgets
// @access  Private
const setBudget = async (req, res) => {
  if (!req.body.category || !req.body.amount) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    const budget = await Budget.create({
      user: req.user.id,
      category: req.body.category,
      amount: req.body.amount,
      period: req.body.period,
      color: req.body.color
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      res.status(404);
      throw new Error('Budget not found');
    }

    if (budget.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      res.status(404);
      throw new Error('Budget not found');
    }

    if (budget.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await budget.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBudgets,
  setBudget,
  updateBudget,
  deleteBudget,
};
