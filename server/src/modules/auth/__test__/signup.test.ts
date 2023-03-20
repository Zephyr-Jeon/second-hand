import { ERROR_CODES } from '../../../error/ErrorCodes';
import { aa, ae, ba, be, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';
import { IJWTPayload } from '../../../types/interfaces';

beforeAll(ba);
afterAll(aa);

describe('User signup test suite', () => {
  beforeEach(be);
  afterEach(ae);

  it('Returns invalid input error with missing email or password', async () => {
    const res1 = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test@test.com' } },
    });

    const res2 = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { password: '12345678' } },
    });

    const res3 = await testServer.request.send({ query: QUERIES.USER_SIGN_UP });

    expect(res1.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
    expect(res2.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
    expect(res3.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
  });

  it('Returns invalid input error with invalid email or password', async () => {
    const res1 = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test@test.com', password: '123456' } },
    });

    const res2 = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test', password: '12345678' } },
    });

    const res3 = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: {
        input: {
          email: 'test@test.com',
          password: '12345678910111213141516',
        },
      },
    });

    expect(res1.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
    expect(res2.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
    expect(res3.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.INVALID_INPUT
    );
  });

  it('Success user signup and response body has user object', async () => {
    const email = 'test@test.com';

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password: '12345678' } },
    });

    expect(res.body.data.signup.email).toEqual(email);
    expect(res.body.data.signup.password).toBeUndefined();
    expect(res.body.data.signup.id).toBeDefined();
  });

  it('Success user signup and response header has valid cookie', async () => {
    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test@test.com', password: '12345678' } },
    });

    const token = res.header['set-cookie'][0]
      .split('.')
      .slice(0, 3)
      .join('.')
      .split('TOKEN=s%3A')[1];

    const payload = (await testServer.di.utils.verifyJWT(
      token,
      testServer.di.serverConfigs.JWT_SECRET
    )) as IJWTPayload;

    expect(payload.userId).toEqual(res.body.data.signup.id);
  });

  it('Disallow duplicate emails', async () => {
    await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test@test.com', password: '12345678' } },
    });

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email: 'test@test.com', password: '12345678' } },
    });

    expect(res.body.errors[0].extensions.code).toEqual(
      ERROR_CODES.EMAIL_IN_USE
    );
  });
});
