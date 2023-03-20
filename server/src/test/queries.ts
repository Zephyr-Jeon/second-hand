import { SNAPSHOTS } from './snapshots';

const GQL_USER_SIGN_UP = `
mutation Mutation($input: SignupInput!) {
  signup(input: $input) {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

export const QUERIES = {
  USER_SIGN_UP: GQL_USER_SIGN_UP,
};
