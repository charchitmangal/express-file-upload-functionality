const express=require('express');
const router=express.Router();

const {localFileUpload, imageUpload, videoUlpoad, imageSizeReducer}=require("../controllers/fileUpload");

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUlpoad", videoUlpoad);
router.post("/imageSizeReducer", imageSizeReducer);
module.exports = router;