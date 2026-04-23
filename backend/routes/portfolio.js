const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  addAsset,
  deleteAsset,
  addLiability,
  deleteLiability,
} = require('../controllers/portfolioController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPortfolio);
router.route('/asset').post(protect, addAsset);
router.route('/asset/:id').delete(protect, deleteAsset);
router.route('/liability').post(protect, addLiability);
router.route('/liability/:id').delete(protect, deleteLiability);

module.exports = router;
