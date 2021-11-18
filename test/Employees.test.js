import request from 'supertest';
import app from '../app.js';
import Employees from '../model/Employees.js';
import { setupDB, dummyTest1, dummyTest2 } from './fixtures/db.js';

beforeEach(async () => {
  await setupDB();
});

describe('Users Testing', () => {
  it('Should Register an account', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gerald_hug1730@gmail.com',
        position: 'Admin',
        phone: parseInt('0941424123'),
        password: '123456gh',
      })
      .expect(201);

    const result = await Employees.findById(response.body.employee._id);
    console.log(result);
    expect(result).not.toBeNull();
    expect(result.password).not.toBe('123456gh');
  });
  it('Should Check Error/Incomplete Registry and should Failed', async () => {
    await request(app)
      .post('/api/employees')
      .send({
        email: 'gerald_hug1730@gmail.com',
        position: 'Admin',
        password: '123456',
      })
      .expect(422);
  });
  it('Should Check dupplicate register', async () => {
    const response = await request(app)
      .post('/api/employees')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gh@gmail.com',
        phone: parseInt('0941424123'),
        position: 'Admin',
        password: '123456gh',
      })
      .expect(401);
  });
});
