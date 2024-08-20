const express = require('express')
const router = express.Router()
const { upload } = require('../middleware/upload.js')
const fs = require('fs')
const path = require('path')

router.post('/upload', upload.single('image'), async (req, res) => {
    const domain = process.env.MY_URL
    if (!req.file) {
        return res.json({ success: false })
    }
    return res.json({ 
        success: true, 
        src: domain + '/' + req.file.path, 
        filename: req.file.filename, 
        path: req.file.path,
        folder: req.file.folder
    })
})

router.delete('/delete/:filename', async (req, res) => {
    const { filename } = req.params
    const splitName = path.basename(filename, path.extname(filename)).split('_')
    const folder = splitName[splitName.length-1]
    const filepath = path.join('uploads', folder, filename)
    console.log('file delete >>>', filepath)
    try {
        fs.unlink(filepath, function(err){
            if(err) {
              console.log("Error : ", err)
            }
        })
    } catch (err) {
        return { success: false }
    }
    return { success: true }
})

module.exports = router