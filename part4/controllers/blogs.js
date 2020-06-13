const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title || blog.url) {
    if (blog.likes === undefined) {
      blog.likes = 0
    }
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter