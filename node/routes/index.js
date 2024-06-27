var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index.html');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

router.get('/api/test', (req, res) => {
    res.send({success: true})
})

module.exports = router