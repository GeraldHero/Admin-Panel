import request from 'supertest';
import app from '../app.js';
import Employees from '../model/Employees.js';

import { setupDB, dummyTest1, dummyTest2 } from './fixtures/db.js';

beforeEach(async () => {
  await setupDB();
});

describe('Route Testing', () => {
  it('Should get employee - token is authorized', async () => {
    await request(app)
      .get('/api/employees')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
  });

  it('Should failed - no route', async () => {
    await request(app).get('/noRoute').expect(404, { msg: 'Page not Found' });
  });

  it('Should failed - no token/not login', async () => {
    await request(app)
      .get('/api/employees')
      .expect(401, { msg: 'Not authorized!' });
  });

  it('Should failed - token is unauthorized', async () => {
    await request(app)
      .get('/api/employees')
      .set({
        Authorization: `Bearer 21231231`,
      })
      .expect(401, { msg: 'Not authorized!' });
  });
});

describe('Users Testing', () => {
  it('Should Register an account', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gerald_hug1730@gmail.com',
        phone: parseInt('0941424123'),
        password: '123456gh',
      })
      .expect(201);

    const result = await Employees.findById(response.body.employee._id);

    expect(result).not.toBeNull();
    expect(result.password).not.toBe('123456gh');
  });

  it('email wrong format should failed', async () => {
    await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gerald_hug17.com',
        phone: '342342342',
        password: '123456gh',
      })
      .expect(422);
  });

  it('Should Check Error/Incomplete Registry and should Failed', async () => {
    await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: '',
        email: 'gerald_hug1730@gmail.com',
        phone: '342342342',
        password: '123456gh',
      })
      .expect(422);

    await request(app)
      .post('/api/employees')
      .send({
        firstName: 'Gerald',
        lastName: 'hug',
        email: 'gerald_hug1730@gmail.com',
        phone: ' ',
        password: '123456gh',
      })
      .expect(422);

    await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'Hug',
        email: 'gerald_hug1730@gmail.com',
        phone: '342342342',
        password: ' ',
      })
      .expect(422);
  });

  it('Should Update an account', async () => {
    await request(app)
      .patch(`/api/employees/${dummyTest1._id.toString()}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .send({
        firstName: 'John',
        lastName: 'Smith',
        email: 'gh@gmail.com',
        company: {
          cname: 'gerald',
          cemail: 'geral@gmail.com',
        },
        phone: 941424123,
        password: 'gh654321',
      })
      .expect(200);

    const result = await Employees.findById(dummyTest1._id.toString());
    expect(result.firstName).toBe('John');
    expect(result.lastName).toBe('Smith');
    expect(result.email).toBe('gh@gmail.com');
    expect(result.phone).toBe(941424123);
    expect(result.password).not.toBe('gh654321');
  });

  it('Should Check dupplicate register', async () => {
    await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gh@gmail.com',
        phone: parseInt('0941424123'),
        position: 'Admin',
        password: '123456gh',
      })
      .expect(401, { msg: 'Account is already registered!' });
  });

  it('Should Delete User', async () => {
    await request(app)
      .delete(`/api/employees/${dummyTest1._id.toString()}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200, { msg: 'Deleted Successfully!' });
  });

  it('Should failed - User not found!', async () => {
    await request(app)
      .delete('/api/employees/6198b2b0b961a9b4447e2496')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(404, { msg: 'User not found!' });
  });

  it('Should failed - Not admin deletion', async () => {
    await request(app)
      .delete(`/api/employees/${dummyTest1._id.toString()}`)
      .set({
        Authorization: `Bearer ${dummyTest2.tokens[0].token}`,
      })
      .expect(401, { msg: 'Not authorized!' });
  });
});

describe('Login Testing', () => {
  it('Should login', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        email: 'gh@gmail.com',
        password: '123456gh',
      })
      .expect(200);
  });

  it('Should failed to login - password needed', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        email: 'gh@gmail.com',
        password: '',
      })
      .expect(422);
  });

  it('Should failed login no user', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        email: 'gh34@gmail.com',
        password: '12345678',
      })
      .expect(400, { msg: 'Invalid Credential' });
  });

  it('Should failed to login - Wrong password', async () => {
    await request(app)
      .post('/api/auth')
      .send({
        email: 'gh@gmail.com',
        password: 'adsfdsfadfad',
      })
      .expect(400, { msg: 'Invalid Credential' });
  });
});
