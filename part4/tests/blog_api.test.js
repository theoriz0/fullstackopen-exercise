const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

jest.setTimeout(20000)

test('correct amount of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(1)
})

test('the unique identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(b => expect(b.id).toBeDefined())
})

afterAll(() => {
  mongoose.connection.close()
})