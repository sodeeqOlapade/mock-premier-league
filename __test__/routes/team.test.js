const request = require('supertest');
const app = require('../../app');

describe('POST /api/v1/admin/signup', function() {
  let adminToken = null;
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
    adminToken = response.body.token;
    done();
  });

  it('responds with Unauthorized', async function(done) {
    const data = {
      name: 'Arsenal FC',
      manager: 'John Doe',
      homeGround: 'Gunners'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(401);
    expect(response.body.message).toMatch('Unauthorized');
    done();
  });

  it('responds with Invalid fields', async function(done) {
    const data = {
      //   name: 'Arsenal FC',
      manager: 'John Doe',
      homeGround: 'Gunners'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toMatch('Invalid fields');
    expect(response.body.errors).toHaveProperty('name', 'name is required');
    done();
  });

  it('responds with Team successfully created', async function(done) {
    const data = {
      name: 'Arsenal FC',
      manager: 'John Doe',
      homeGround: 'England'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Team successfully created');
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload).toHaveProperty('name', data.name);
    expect(response.body.payload).toHaveProperty('manager', data.manager);
    expect(response.body.payload).toHaveProperty('homeGround', data.homeGround);
    done();
  });

  it('responds with Team successfully created', async function(done) {
    const data = {
      name: 'Manchester FC',
      manager: 'Jane Doe',
      homeGround: 'Santiago'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Team successfully created');
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload).toHaveProperty('name', data.name);
    expect(response.body.payload).toHaveProperty('manager', data.manager);
    expect(response.body.payload).toHaveProperty('homeGround', data.homeGround);
    done();
  });

  it('responds with Team successfully created', async function(done) {
    const data = {
      name: 'Bercelona FC',
      manager: 'Lionel Messi',
      homeGround: 'Spain'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Team successfully created');
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload).toHaveProperty('name', data.name);
    expect(response.body.payload).toHaveProperty('manager', data.manager);
    expect(response.body.payload).toHaveProperty('homeGround', data.homeGround);
    done();
  });

  it('responds with Team successfully created', async function(done) {
    const data = {
      name: 'Super Eagles',
      manager: 'Geneth Rohr',
      homeGround: 'Abuja'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(200);
    expect(response.body.message).toMatch('Team successfully created');
    expect(response.body.payload).toHaveProperty('id');
    expect(response.body.payload).toHaveProperty('name', data.name);
    expect(response.body.payload).toHaveProperty('manager', data.manager);
    expect(response.body.payload).toHaveProperty('homeGround', data.homeGround);
    done();
  });

  it('responds with Team name or homeground already in use!', async function(done) {
    const data = {
      name: 'Arsenal FC',
      manager: 'John Doe',
      homeGround: 'Gunners'
    };
    const response = await request(app)
      .post('/api/v1/team')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(data)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toMatch('Bad Request');
    expect(response.body.error).toHaveProperty(
      'msg',
      'Team name or homeground already in use!'
    );
    done();
  });

  it('responds with Request for all teams sucessful ', async function(done) {
    const getResponse = await request(app)
      .get('/api/v1/team')
      .set('authorization', adminToken)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(getResponse.body.statusCode).toBe(200);
    expect(getResponse.body.message).toMatch('Request for all teams sucessful');
    expect(getResponse.body.payload.length).toBe(4);

    const id = getResponse.body.payload[0]._id;
    const getSingleTeamResponse = await request(app)
      .get(`/api/v1/team/${id}`)
      .set('authorization', adminToken)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(getSingleTeamResponse.body.statusCode).toBe(200);
    expect(getSingleTeamResponse.body.message).toMatch('Request sucessful');
    expect(getSingleTeamResponse.body.payload).toHaveProperty('id', id);
    expect(getSingleTeamResponse.body.payload).toHaveProperty('name');
    expect(getSingleTeamResponse.body.payload).toHaveProperty('manager');
    expect(getSingleTeamResponse.body.payload).toHaveProperty('homeGround');
    expect(getSingleTeamResponse.body.payload.isDeleted).toBe(false);

    const updateData = {
      manager: 'George Smith',
      homeGround: 'Paris'
    };
    const updateTeamResponse = await request(app)
      .put(`/api/v1/team/${id}`)
      .set('authorization', adminToken)
      .send(updateData)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(updateTeamResponse.body.statusCode).toBe(200);
    expect(updateTeamResponse.body.message).toMatch('update succesful');
    expect(updateTeamResponse.body.payload).toHaveProperty('id', id);
    expect(updateTeamResponse.body.payload).toHaveProperty('name');
    expect(updateTeamResponse.body.payload).toHaveProperty(
      'manager',
      updateData.manager
    );
    expect(updateTeamResponse.body.payload).toHaveProperty(
      'homeGround',
      updateData.homeGround
    );
    expect(updateTeamResponse.body.payload.isDeleted).toBe(false);

    const home = getResponse.body.payload[0]._id;
    const away = getResponse.body.payload[1]._id;
    const fixtureData = {
      home,
      away,
      venue: 'England',
      time: '12:00PM',
      date: '12/09/19',
      refree: 'John Doe'
    };
    const createFixtureResponse = await request(app)
      .post('/api/v1/fixture')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(fixtureData)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(createFixtureResponse.body.statusCode).toBe(200);
    expect(createFixtureResponse.body.message).toMatch(
      'Fixture successfully created'
    );
    expect(createFixtureResponse.body.payload).toHaveProperty('id');
    expect(createFixtureResponse.body.payload).toHaveProperty(
      'home',
      fixtureData.home
    );
    expect(createFixtureResponse.body.payload).toHaveProperty(
      'away',
      fixtureData.away
    );
    expect(createFixtureResponse.body.payload).toHaveProperty(
      'venue',
      fixtureData.venue
    );

    const home1 = getResponse.body.payload[2]._id;
    const away1 = getResponse.body.payload[3]._id;
    const fixtureData1 = {
      home: home1,
      away: away1,
      venue: 'Abuja',
      time: '12:00PM',
      date: '12/09/19',
      refree: 'Jane Doe'
    };
    const createFixtureResponse1 = await request(app)
      .post('/api/v1/fixture')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(fixtureData1)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(createFixtureResponse1.body.statusCode).toBe(200);
    expect(createFixtureResponse1.body.message).toMatch(
      'Fixture successfully created'
    );
    expect(createFixtureResponse1.body.payload).toHaveProperty('id');
    expect(createFixtureResponse1.body.payload).toHaveProperty(
      'home',
      fixtureData1.home
    );
    expect(createFixtureResponse1.body.payload).toHaveProperty(
      'away',
      fixtureData1.away
    );
    expect(createFixtureResponse1.body.payload).toHaveProperty(
      'venue',
      fixtureData1.venue
    );

    const home2 = getResponse.body.payload[2]._id;
    const away2 = getResponse.body.payload[3]._id;
    const fixtureData2 = {
      home: home2,
      away: away2,
      venue: 'Abuja',
      time: '12:00PM',
      date: '12/09/19',
      refree: 'Jane Doe'
    };
    const createFixtureResponse2 = await request(app)
      .post('/api/v1/fixture')
      .set('Accept', 'application/json')
      .set('authorization', adminToken)
      .send(fixtureData2)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(createFixtureResponse2.body.statusCode).toBe(400);
    expect(createFixtureResponse2.body.message).toMatch('Bad Request');
    expect(createFixtureResponse2.body.payload.error).toHaveProperty(
      'msg',
      'Same Fixture not allowed!'
    );

    const deleteTeamResponse = await request(app)
      .delete(`/api/v1/team/${id}`)
      .set('authorization', adminToken)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(deleteTeamResponse.body.statusCode).toBe(200);
    expect(deleteTeamResponse.body.message).toMatch('Delete sucessful');
    expect(deleteTeamResponse.body.payload).toHaveProperty('id', id);
    expect(deleteTeamResponse.body.payload.isDeleted).toBe(true);
    done();
  });
});
