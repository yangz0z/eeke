const multer = require('multer')
const path = require('path')
const moment = require('moment')
const fs = require('fs')
const datePath = moment().format('YYMMDD')

const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          const uploadPath = path.join('uploads', datePath)
          fs.mkdirSync(uploadPath, { recursive: true }) // 폴더가 존재하지 않으면 생성
          cb(null, uploadPath);
        },
      filename: function(req, file, done){
          const encodingName = Buffer.from(file.originalname, 'latin1').toString('utf8');
          const ext = path.extname(encodingName); // 확장자
          const baseName = path.basename(encodingName, ext) // 파일명
          const fileName = baseName + "_" + datePath + ext // 파일명_날짜.확장자
          done(null, fileName)
          req.file = file
      }
  }),
  limits: {fileSize: 5 * 1024 * 1024} // 5MB 제한
});

module.exports = { upload }