import { ERROR_CODES } from '../../../error/ErrorCodes';
import { aa, ae, ba, testServer } from '../../../test/common';
import { QUERIES } from '../../../test/queries';

beforeAll(ba);
afterAll(aa);

describe('Update user info', () => {
  afterEach(ae);

  it('Update fails when email is duplicated ', async () => {
    const email = 'test@test.com';
    const password = '12345678';

    await testServer.request.send({
      query: QUERIES.USER_SIGN_UP,
      variables: { input: { email, password } },
    });

    const user = await testServer.createUser();

    const res = await user.request.send({
      query: QUERIES.UPDATE_USER,
      variables: { input: { id: user.data.id, email } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.EMAIL_IN_USE);
  });

  it('Success email update', async () => {
    const email = 'test@test.com';

    const user = await testServer.createUser();

    expect(user.data.email).not.toEqual(email);

    const res2 = await user.request.send({
      query: QUERIES.UPDATE_USER,
      variables: { input: { id: user.data.id, email } },
    });

    expect(res2.body.data.updateUser.email).toEqual(email);
  });

  it('Success password update', async () => {
    const newPassword = 'qwerty123';

    const user = await testServer.createUser();

    const email = user.data.email;

    const res2 = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email, password: newPassword } },
    });

    expect(testServer.getErrorCodes(res2)).toContain(ERROR_CODES.NOT_FOUND);

    await user.request.send({
      query: QUERIES.UPDATE_USER,
      variables: { input: { id: user.data.id, password: newPassword } },
    });

    const res3 = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email, password: newPassword } },
    });

    expect(res3.body.data.signin.email).toEqual(email);
  });

  it('Success email and password update', async () => {
    const newEmail = 'test@test.com';
    const newPassword = 'qwerty123';

    const user = await testServer.createUser();

    const res = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email: newEmail, password: newPassword } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.NOT_FOUND);

    await user.request.send({
      query: QUERIES.UPDATE_USER,
      variables: {
        input: { id: user.data.id, email: newEmail, password: newPassword },
      },
    });

    const res2 = await testServer.request.send({
      query: QUERIES.USER_SIGN_IN,
      variables: { input: { email: newEmail, password: newPassword } },
    });

    expect(res2.body.data.signin.email).toEqual(newEmail);
  });

  it('Fails when updating properties that dose not exist in user', async () => {
    const user = await testServer.createUser();

    const res = await user.request.send({
      query: QUERIES.UPDATE_USER,
      variables: { input: { random: 'random property' } },
    });

    expect(testServer.getErrorCodes(res)).toContain(ERROR_CODES.INVALID_INPUT);
  });
});
