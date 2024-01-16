const request = require('supertest')
const app = require('../app')

test.skip('GET / should return This is homepage messsage', async () => {

    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe("This is homepage")

})