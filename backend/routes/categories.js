const express = require('express')
const router = express.Router()

const { Category } = require('../models/Category.js')

router.get('/all', (req, res) => {
    Category.aggregate([
        {
            "$match": { "depth": 1 }
        },
        {
            "$lookup": {
                "from": "categories",
                "localField": "_id",
                "foreignField": "parentCategory",
                "as": "subCategories"
            }
        },
        {
            "$addFields": {
                "subCategories": {
                    "$map": {
                        "input": "$subCategories",
                        "as": "subCategory",
                        "in": {
                            "_id": "$$subCategory._id",
                            "name": "$$subCategory.name",
                            "depth": "$$subCategory.depth",
                            "parentCategory": "$$subCategory.parentCategory"
                        }
                    }
                }
            }
        }
    ])
    .then((data) => {
        return res.status(200).json({ success: true, data: data })
    })
    .catch((err) => {
        console.log(err)
        return res.status(500).json({ success: false, err })
    })
})

module.exports = router