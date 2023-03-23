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

const GQL_GET_CURRENT_USER = `
query GetCurrentUser {
  getCurrentUser {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

const GQL_GET_USER_BY_ID = `
query GetUserByID($input: SingleIDInput!) {
  getUserByID(input: $input) {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

const GQL_GET_USERS = `
query GetUsers {
  getUsers {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

const GQL_UPDATE_USER = `
mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ${SNAPSHOTS.USER_FULL_SNAPSHOT}
  }
}
`;

export const QUERIES = {
  USER_SIGN_UP: GQL_USER_SIGN_UP,
  USER_SIGN_IN: GQL_USER_SIGN_IN,
  USER_SIGN_OUT: GQL_USER_SIGN_OUT,
  GET_CURRENT_USER: GQL_GET_CURRENT_USER,
  GET_USER_BY_ID: GQL_GET_USER_BY_ID,
  GET_USERS: GQL_GET_USERS,
  UPDATE_USER: GQL_UPDATE_USER,
};
