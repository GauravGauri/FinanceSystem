const Goal = require('../models/Goal');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res) => {
  if (!req.body.name || !req.body.targetAmount) {
    res.status(400);
    throw new Error('Please add name and target amount fields');
  }

  try {
    const goal = await Goal.create({
      user: req.user.id,
      name: req.body.name,
      targetAmount: req.body.targetAmount,
      currentAmount: req.body.currentAmount || 0,
      deadline: req.body.deadline,
      color: req.body.color,
      icon: req.body.icon
    });
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      res.status(404);
      throw new Error('Goal not found');
    }

    if (goal.user.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
