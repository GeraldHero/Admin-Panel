import request from 'supertest';
import app from '../app.js';
import Companies from '../model/Companies.js';

import { setupDB, dummyTest1, companyDummy1 } from './fixtures/db.js';

beforeEach(async () => {
  await setupDB();
});

describe('Company Testing', () => {
  it('Should get all company data', async () => {
    await request(app)
      .get('/api/companies')
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
  });
  it('Should failed - not login', async () => {
    await request(app)
      .get('/api/companies')
      .expect(401, { msg: 'Not authorized!' });
  });

  it('Should delete company data', async () => {
    await request(app)
      .delete(`/api/companies/${companyDummy1._id.toString()}`)
      .set({
        Authorization: `Bearer ${dummyTest1.tokens[0].token}`,
      })
      .expect(200);
  });
});
