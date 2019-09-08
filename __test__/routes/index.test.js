const request = require('supertest');
const app = require('../../app');

describe('Test the health-check path', () => {
  test('It should respond the GET method with OK', () => {
    return request(app)
      .get('/api/v1/health-check')
      .expect(200)
      .then(response => {
        expect(response.body.payload).toBe('OK');
      });
  });
});
