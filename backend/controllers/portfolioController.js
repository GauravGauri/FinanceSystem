const Asset = require('../models/Asset');
const Liability = require('../models/Liability');

// @desc    Get portfolio (assets and liabilities)
// @route   GET /api/portfolio
// @access  Private
const getPortfolio = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user.id });
    const liabilities = await Liability.find({ user: req.user.id });
    res.status(200).json({ assets, liabilities });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add asset
// @route   POST /api/portfolio/asset
// @access  Private
const addAsset = async (req, res) => {
  try {
    const { name, value, description } = req.body;
    const asset = await Asset.create({
      name,
      value,
      description,
      user: req.user.id,
    });
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete asset
// @route   DELETE /api/portfolio/asset/:id
// @access  Private
const deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    if (asset.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await asset.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add liability
// @route   POST /api/portfolio/liability
// @access  Private
const addLiability = async (req, res) => {
  try {
    const { name, value, interestRate, description } = req.body;
    const liability = await Liability.create({
      name,
      value,
      interestRate,
      description,
      user: req.user.id,
    });
    res.status(201).json(liability);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete liability
// @route   DELETE /api/portfolio/liability/:id
// @access  Private
const deleteLiability = async (req, res) => {
  try {
    const liability = await Liability.findById(req.params.id);
    if (!liability) return res.status(404).json({ message: 'Liability not found' });
    if (liability.user.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

    await liability.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPortfolio,
  addAsset,
  deleteAsset,
  addLiability,
  deleteLiability,
};
