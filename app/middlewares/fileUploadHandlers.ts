import { RequestHandler } from "express";
import multer from "multer";
import { extname } from "path";

const ALLOWED_IMAGE_FORMATS = ["png", "jpeg", "jpg"];
const pictureParserMiddleware = multer().single("picture");
const profilePictureValidatorMiddleware: RequestHandler = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      error: "Invalid picture. Content not fount",
    });
  }
  const extension = (extname(req.file.originalname) || "")
    .slice(1)
    .toLowerCase();
  if (!ALLOWED_IMAGE_FORMATS.includes(extension)) {
    return res.status(400).send({
      errors: [
        `Invalid picture. Only ${ALLOWED_IMAGE_FORMATS.join(
          ","
        )} are allowed for profile picture.`,
      ],
    });
  }
  next();
};

export default {
  pictureParserMiddleware,
  profilePictureValidatorMiddleware,
};
