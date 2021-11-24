import multer from 'multer';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'client/public/logo');
  },

  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${file.originalname}`.toLocaleLowerCase()
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }
    return cb(undefined, true);
  },
  limits: { fileSize: 2000000 },
}).single('Logo');

export default upload;
