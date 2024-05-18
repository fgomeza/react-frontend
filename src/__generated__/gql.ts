/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Tasks {\n    tasks {\n      id\n      title\n    }\n  }\n": types.TasksDocument,
    "\n  mutation AddTask($task: AddTaskInput) {\n    addTask(task: $task) {\n      id,\n      title\n    }\n  }\n": types.AddTaskDocument,
    "\n  mutation DeleteTask($deleteTaskId: ID!) {\n    deleteTask(id: $deleteTaskId) {\n      id\n      title\n    }\n  }\n": types.DeleteTaskDocument,
    "\n  mutation UpdateTask($updateTaskId: ID!, $edits: UpdateTaskInput) {\n    updateTask(id: $updateTaskId, edits: $edits) {\n      id\n      title\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  query User($id: ID!) {\n    user(id: $id) {\n      name,\n      email,\n      verified,\n    }\n  }\n": types.UserDocument,
    "\n  query Users {\n    users {\n      id,\n      name,\n      email,\n      verified,\n    }\n  }\n": types.UsersDocument,
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n": types.LoginDocument,
    "\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($updateUserId: ID!, $edits: UpdateUserInput) {\n    updateUser(id: $updateUserId, edits: $edits) {\n      name,\n      email,\n      verified\n    }\n  }\n": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tasks {\n    tasks {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  query Tasks {\n    tasks {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddTask($task: AddTaskInput) {\n    addTask(task: $task) {\n      id,\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation AddTask($task: AddTaskInput) {\n    addTask(task: $task) {\n      id,\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteTask($deleteTaskId: ID!) {\n    deleteTask(id: $deleteTaskId) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteTask($deleteTaskId: ID!) {\n    deleteTask(id: $deleteTaskId) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateTask($updateTaskId: ID!, $edits: UpdateTaskInput) {\n    updateTask(id: $updateTaskId, edits: $edits) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateTask($updateTaskId: ID!, $edits: UpdateTaskInput) {\n    updateTask(id: $updateTaskId, edits: $edits) {\n      id\n      title\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query User($id: ID!) {\n    user(id: $id) {\n      name,\n      email,\n      verified,\n    }\n  }\n"): (typeof documents)["\n  query User($id: ID!) {\n    user(id: $id) {\n      name,\n      email,\n      verified,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Users {\n    users {\n      id,\n      name,\n      email,\n      verified,\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id,\n      name,\n      email,\n      verified,\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($user: CreateUserInput) {\n    createUser(user: $user) {\n      name,\n      email,\n      verified\n      jwt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($updateUserId: ID!, $edits: UpdateUserInput) {\n    updateUser(id: $updateUserId, edits: $edits) {\n      name,\n      email,\n      verified\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($updateUserId: ID!, $edits: UpdateUserInput) {\n    updateUser(id: $updateUserId, edits: $edits) {\n      name,\n      email,\n      verified\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;