import { ERROR_CODES } from '../../../error/ErrorCodes';
import { aa, ae, ba, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';
import { IJWTPayload } from '../../../types/interfaces';

beforeAll(ba);
afterAll(aa);

describe('User signin test suite', () => {
  afterEach(ae);

  it('Fails when an email that does not exist is supplied', async () => {
    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email: 'test@test.com', password: '12345678' } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.NOT_FOUND);
  });

  it('Fails when an incorrect password is supplied', async () => {
    const email = 'test@test.com';

    await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password: '12345678' } },
    });

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email, password: '12345679' } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.NOT_FOUND);
  });

  it('Response with a cookie when given vaild credentials', async () => {
    const email = 'test@test.com';
    const password = '12345678';

    await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email, password } },
    });

    // res.header['set-cookie'][0] => 'TOKEN=s%3AeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoxfSwiaWF0IjoxNjc5Mjc1NDM4LCJleHAiOjE2NzkzNjE4Mzh9.6NT9iK0ashKNf0nAmgWFNQrDfTC_ujN3uP4xY0g2bxY.%2BevPEXvMcfMqdliSEZXhl5748KzEkHaDRDr13otA9Pc; Path=/; HttpOnly; Secure',
    // Actual JWT => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOnsidXNlcklkIjoxfSwiaWF0IjoxNjc5Mjc1NDM4LCJleHAiOjE2NzkzNjE4Mzh9.6NT9iK0ashKNf0nAmgWFNQrDfTC_ujN3uP4xY0g2bxY
    const token = res.header['set-cookie'][0]
      .split('.')
      .slice(0, 3)
      .join('.')
      .split('TOKEN=s%3A')[1];

    const payload = (await testServer.di.utils.verifyJWT(
      token,
      testServer.di.serverConfigs.JWT_SECRET
    )) as IJWTPayload;

    expect(payload.userId).toEqual(res.body.data.signin.id);
  });
});
