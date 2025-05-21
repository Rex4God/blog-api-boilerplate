"use strict";
const Blog = require("../models/BlogModel")
const { StatusCodes } = require("http-status-codes")
const blogValidator = require("../validators/BlogValidator")


exports.createBlog = async (body, req) => {
   try {

      const validatorError = await blogValidator.createBlog(body)

      if (validatorError) {
         return {
            error: validatorError,
            statusCode: StatusCodes.BAD_REQUEST,
         }
      }
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

      const createBlog = await Blog.create({
         blogTitle: body.blogTitle,
         blogBody: body.blogBody,
         author: body.author,
         date: body.date,
         image: imageUrl
      })

      return {
         data: createBlog,
         statusCode: StatusCodes.CREATED,
      }

   } catch (e) {
      console.log("An unknown error has occurred", +e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}