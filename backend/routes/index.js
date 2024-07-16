var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

module.exports = router