import { gql } from "../__generated__";

export const GET_TASKS_QUERY = gql(`
  query Tasks {
    tasks {
      id
      title
    }
  }
`);

export const ADD_TASK_MUTATION = gql(`
  mutation AddTask($task: AddTaskInput) {
    addTask(task: $task) {
      id,
      title
    }
  }
`);

export const DELETE_TASK_MUTATION = gql(`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      id
      title
    }
  }
`);

export const UPDATE_TASK_MUTATION = gql(`
  mutation UpdateTask($updateTaskId: ID!, $edits: UpdateTaskInput) {
    updateTask(id: $updateTaskId, edits: $edits) {
      id
      title
    }
  }
`);

