const express = require('express')
const router = express.Router()
const { upload } = require('../middleware/upload.js')

router.post('/upload', upload.single('image'), async (req, res) => {
    const domain = process.env.MY_URL
    if (!req.file) {
        return res.json({ success: false })
    }
    return res.json({ 
        success: true, 
        src: domain + '/' + req.file.path, 
        filename: req.file.filename, 
        path: req.file.path 
    })
})

module.exports = router