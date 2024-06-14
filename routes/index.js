var express = require('express');
var router = express.Router();

const maria = require('../database/connect/maria');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.get('/select', function(req, res, next) {
  maria.query('select now() from dual', function(err, rows, fields) {
    if(!err){
      res.send(rows);
    }
    else {
      console.log("err : ", err)
    }
  });
});
  
module.exports = router