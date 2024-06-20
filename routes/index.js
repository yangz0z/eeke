var express = require('express');
var router = express.Router();

// const maria = require('../database/connect/maria-db');
const mongo = require('../database/connect/mongo-db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});
  
module.exports = router