const request = require('supertest');
const app = require('../../app');

describe('POST /api/v1/admin/signup', function() {
  it('responds Invalid fields', function(done) {
    const data = {
      // name: 'Moses Tyav',
      email: 'moses@gmail.com',
      password: 'password'
    };
    request(app)
      .post('/api/v1/admin/signup')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid fields');
        expect(response.body.errors).toHaveProperty('name');
      });
    done();
  });
});

describe('POST /api/v1/admin/signup', function() {
  it('responds with Admin successfully created', async function(done) {
    const data = {
      name: 'Moses Tyav',
      email: 'moses@gmail.com',
      password: 'password'
    };
    const response = await request(app)
      .post('/api/v1/admin/signup')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Admin successfully created');
    done();
  });
});

describe('POST /api/v1/admin/signup', function() {
  it('responds with Email already in use!', async function(done) {
    const data = {
      name: 'Moses Tyav',
      email: 'moses@gmail.com',
      password: 'password'
    };
    const response = await request(app)
      .post('/api/v1/admin/signup')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error.msg).toMatch('Email already in use!');
    done();
  });
});

describe('POST /api/v1/admin/login', function() {
  it('responds with Successfully logged in', async function(done) {
    const data = {
      email: 'moses@gmail.com',
      password: 'password'
    };
    const response = await request(app)
      .post('/api/v1/admin/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Successfully logged in');
    expect(response.body.payload.isAdmin).toBe(true);
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload).toHaveProperty('name');
    expect(response.body.payload).toHaveProperty('profilePic');
    done();
  });
});
