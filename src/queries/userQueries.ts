import { gql } from "../__generated__";

export const GET_USER_QUERY = gql(`
  query User($id: ID!) {
    user(id: $id) {
      name,
      email,
      verified,
    }
  }
`);

export const GET_USERS_QUERY = gql(`
  query Users {
    users {
      id,
      name,
      email,
      verified,
    }
  }
`);

export const LOGIN_MUTATION = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name,
      email,
      verified
      jwt
    }
  }
`);

export const CREATE_USER_MUTATION = gql(`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      name,
      email,
      verified
      jwt
    }
  }
`);

export const UPDATE_USER_MUTATION = gql(`
  mutation UpdateUser($updateUserId: ID!, $edits: UpdateUserInput) {
    updateUser(id: $updateUserId, edits: $edits) {
      name,
      email,
      verified
    }
  }
`);
