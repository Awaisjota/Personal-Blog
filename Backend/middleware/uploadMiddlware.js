import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder = req.body.folder || "uploads"; // default folder
    const fullPath = path.join(process.cwd(), folder);
    fs.mkdirSync(fullPath, { recursive: true }); // folder create if not exists
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`; // unique filename
    cb(null, uniqueName);
  },
});

export default multer({ storage });
