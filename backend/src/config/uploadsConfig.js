import multer from 'multer';
import path from 'path';

// Cấu hình lưu trữ cho multer
const storageAvarta = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/avatar'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});


const storageProduct = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/product'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Bộ lọc file để chỉ chấp nhận các file ảnh
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload an image.'), false);
  }
};

const uploadAvatarImg = multer({
  storage: storageAvarta,
  fileFilter
});

const uploadProductImg = multer({
  storage: storageProduct,
  fileFilter
});

export {
  uploadAvatarImg,
  uploadProductImg,
}