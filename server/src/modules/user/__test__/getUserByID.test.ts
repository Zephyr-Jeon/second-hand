import { ERROR_CODES } from '../../../error/ErrorCodes';
import { aa, ae, ba, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';

beforeAll(ba);
afterAll(aa);

describe('Get user by ID', () => {
  afterEach(ae);

  it('Returns error when the user of given id does not exist ', async () => {
    const res = await testServer.request.send({
      query: QUERIES.GET_USER_BY_ID,
      variables: { input: { id: 1 } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.NOT_FOUND);
  });

  it('Returns the user of the given id', async () => {
    const email = 'test@test.com';
    const password = '12345678';

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    const res2 = await testServer.request.send({
      query: QUERIES.GET_USER_BY_ID,
      variables: { input: { id: res.body.data.signup.id } },
    });

    expect(res2.body.data.getUserByID).toMatchObject({ email });
  });
});
