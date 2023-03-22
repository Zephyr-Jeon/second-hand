import { aa, ae, ba, be, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';

beforeAll(ba);
afterAll(aa);

describe('User signout test suite', () => {
  beforeEach(be);
  afterEach(ae);

  it('Clears the cookie after signing out', async () => {
    const email = 'test@test.com';
    const password = '12345678';

    await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    const res = await testServer.request.send({ query: QUERIES.USER_SIGN_OUT });

    const token = res.header['set-cookie'][0].split(';')[0];

    expect(token).toEqual('TOKEN=');
  });
});
