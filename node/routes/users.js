var express = require('express');
var router = express.Router();

const mongo = require('../database/connect/mongo-db');

router.post('/register', (req, res) => {
    const user = new User(req.body)
    
    // user.save((err, userInfo) => {
        
    // })
})
  
module.exports = router
