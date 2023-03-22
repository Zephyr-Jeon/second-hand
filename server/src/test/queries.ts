import { SNAPSHOTS } from './snapshots';

const GQL_USER_SIGN_UP = `
mutation Mutation($input: SignupInput!) {
  signup(input: $input) {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

const GQL_USER_SIGN_IN = `
mutation Mutation($input: SigninInput!) {
  signin(input: $input) {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

const GQL_USER_SIGN_OUT = `
mutation Signout {
  signout {
    ok
  }
}
`;

export const QUERIES = {
  USER_SIGN_UP: GQL_USER_SIGN_UP,
  USER_SIGN_IN: GQL_USER_SIGN_IN,
  USER_SIGN_OUT: GQL_USER_SIGN_OUT,
};
