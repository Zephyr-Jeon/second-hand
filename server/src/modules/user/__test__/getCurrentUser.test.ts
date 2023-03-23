import { ERROR_CODES } from '../../../error/ErrorCodes';
import { aa, ae, ba, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';

beforeAll(ba);
afterAll(aa);

describe('Get current user', () => {
  afterEach(ae);

  it('Returns error when not signed in', async () => {
    const res = await testServer.request.send({
      query: QUERIES.GET_CURRENT_USER,
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.NOT_PERMITTED);
  });

  it('Returns the current user when signed in', async () => {
    const email = 'test@test.com';
    const password = '12345678';

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    const res2 = await testServer.request
      .set('Cookie', [...res.header['set-cookie']])
      .send({
        query: QUERIES.GET_CURRENT_USER,
      });

    expect(res2.body.data.getCurrentUser).toMatchObject({ email });
  });
});
