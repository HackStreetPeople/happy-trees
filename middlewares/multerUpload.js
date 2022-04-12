const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '/uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage
});