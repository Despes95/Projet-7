const multer = require('multer');

const MINE_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png',
    'images/gif': 'gif',
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images")
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const exstention = MINE_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + exstention);
    }
});

module.exports = multer({ storage }).single('image');