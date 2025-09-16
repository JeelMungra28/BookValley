const express = require('express');
const router = express.Router();
const searchController = require('../Controller/searchController');

// Global search endpoint
router.get('/', searchController.globalSearch);

module.exports = router; 