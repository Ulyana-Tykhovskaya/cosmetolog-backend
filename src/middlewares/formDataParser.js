import multer from "multer";

const upload = multer();

export const parseFormData = upload.none();