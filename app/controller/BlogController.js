"use strict";
const blogService = require("../services/BlogService")
const response = require("../utils/responses")



exports.createBlog = async (req, res) => {
  const {
    error,
    data,
    statusCode

  } = await blogService.createBlog(req.body,req)

  if (error) return response.error(res, error, statusCode);

  return response.success(res, data, statusCode)
}
