
const express = require('express');
const { getTopData, getData } = require('../controller/controller');
const router = express.Router();


router.get('/get-results',getTopData)
router.get('/get-data',getData)


module.exports = router;
