const express = require('express');
const {getHome, getArchives, getPost} = require('../controllers');
const router = express.Router();

/* GET home page. */
router.get('/', getHome);
router.get('/archives', getArchives);
router.get('/post', getPost);

module.exports = router;
