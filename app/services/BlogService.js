"use strict";
const Blog = require("../models/BlogModel")
const { StatusCodes } = require("http-status-codes")
const blogValidator = require("../validators/BlogValidator")
const { resolveRequestQueryToMongoDBQuery } = require("../utils/helpers")


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
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

exports.getAllBlogs = async (requestParams) => {
   try {
      const mongodbQuery = resolveRequestQueryToMongoDBQuery(requestParams);

      const blogs = await Blog
         .find(mongodbQuery.filter)
         .skip(mongodbQuery.page)
         .sort(mongodbQuery.sort)
         .limit(mongodbQuery.limit);


      return {
         data: blogs,
         statusCode: StatusCodes.OK,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

exports.getBlog = async (blogId) => {
   try {
      const blog = await Blog.findById(blogId)

      if (!blog) {
         return {
            error: "Oops! This blog detail is not found on this platform",
            statusCode: StatusCodes.NOT_FOUND,
         }
      }

      return {
         data: blog,
         statusCode: StatusCodes.OK,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

  exports.updateBlog = async (blogId, body, req) => {
   try {
      const validatorError = await blogValidator.updateBlog(body)

      if (validatorError) {
         return {
            error: validatorError,
            statusCode: StatusCodes.BAD_REQUEST,
         }
      }

      const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : undefined;

      const updateData = {
         blogTitle: body.blogTitle,
         blogBody: body.blogBody,
         author: body.author,
         date: body.date,
         image: imageUrl
      }

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })

      if (!updatedBlog) {
         return {
            error: "Oops! This blog detail is not found on this platform",
            statusCode: StatusCodes.NOT_FOUND,
         }
      }

      return {
         data: updatedBlog,
         statusCode: StatusCodes.OK,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}

exports.deleteBlog = async (blogId) => {
   try {
      const blog = await Blog.findByIdAndDelete(blogId)

      if (!blog) {
         return {
            error: "Oops! This blog detail is not found on this platform",
            statusCode: StatusCodes.NOT_FOUND,
         }
      }

      return {
         data: "Blog deleted successfully",
         statusCode: StatusCodes.OK,
      }

   } catch (e) {
      console.log("An unknown error has occurred. Please try again later." + e)
      return {
         error: e.message,
         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      }
   }
}
