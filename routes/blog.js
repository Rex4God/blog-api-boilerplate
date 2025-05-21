"use strict";
const express = require("express")
const router = express.Router();
const controller = require("../app/controller/BlogController")
const {authenticateUser} = require("../app/middleware/authMiddleware")
const upload = require("../app/utils/imageUploader")


//EAMPLE ON HOW TO PASS THE AUTH MIDDLEWARE

router.post("/create-blog",authenticateUser,  upload.single("image"), controller.createBlog)



module.exports =router