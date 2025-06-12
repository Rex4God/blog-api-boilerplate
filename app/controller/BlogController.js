"use strict";
const blogService = require("../services/BlogService")
const response = require("../utils/responses")



exports.createBlog = async (req, res) => {
  const {
    error,
    data,
    statusCode

  } = await blogService.createBlog(req.body, req)

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode)
}

exports.getAllBlogs = async (req, res) => {
  const {
    error,
    data,
    statusCode
  } = await blogService.getAllBlogs(req.query)

  if (error) return response.error(res, error, statusCode);

  return response.paginated(res, data, statusCode)
}


exports.getBlog = async (req, res) => {
  const {
    error,
    data,
    statusCode
  } = await blogService.getBlog(req.params.blogId)

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode)
}

// COMPLETE THE UPDATE AND DELETE ENDPOINTS