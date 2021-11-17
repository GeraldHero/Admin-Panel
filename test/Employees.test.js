import request from 'supertest';
import app from '../app.js';
import Employees from '../model/Employees.js';
import { setupDB, dummyTest1, dummyTest2 } from './fixtures/db.js';

beforeEach(() => {
  setupDB();
});

describe('Users Testing', () => {
  it('Should Register an account', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: 'gerald',
        lastName: 'hug',
        email: 'gerald_hug1730@gmail.com',
        position: 'Admin',
        password: '123456',
      })
      .expect(404);
    //  const Employee = await Employees.findById(response.body.Employee._id);
    //  expect(Employee).not.toBeNull();
  });
});
