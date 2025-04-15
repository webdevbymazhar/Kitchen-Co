// middleware/multer.js
import multer from 'multer';

const storage = multer.memoryStorage(); // Temporarily store images in memory
const upload = multer({ storage });

export const uploadMiddleware = upload.array('images');
