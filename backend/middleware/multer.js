const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 📁 asegurar carpeta uploads
const uploadPath = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// 🎯 Tipos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "video/mp4",
    "video/webm"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Tipo de archivo no permitido"), false);
  }
};

// 🧠 Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// 🚫 Límite de tamaño (10MB)
const limits = {
  fileSize: 10 * 1024 * 1024
};

// 🚀 Export final
const upload = multer({
  storage,
  fileFilter,
  limits
});

module.exports = upload;