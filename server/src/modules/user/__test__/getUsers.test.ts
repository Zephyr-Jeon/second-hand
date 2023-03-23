import { aa, ae, ba, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';

beforeAll(ba);
afterAll(aa);

describe('Get user list', () => {
  afterEach(ae);

  it('Returns the user of the given id', async () => {
    const admin = await testServer.createUser();

    for (let i = 0; i < 10; i++) {
      await testServer.createUser();
    }

    const res = await admin.request.send({
      query: QUERIES.GET_USERS,
    });

    expect(res.body.data.getUsers).toHaveLength(11);
  });
});
