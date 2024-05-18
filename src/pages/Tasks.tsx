import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ListGroup, { ListItem } from "../components/ListGroup";
import identity from "lodash/identity";
import {
  ADD_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  GET_TASKS_QUERY,
  UPDATE_TASK_MUTATION,
} from "../queries/taskQueries";
import FullPageSpinner from "../components/FullPageSpinner";

export default function Tasks() {
  const { data, loading } = useQuery(GET_TASKS_QUERY);
  const [tasks, setTasks] = useState([] as ListItem[]);
  const [callDeleteTask, {loading: deleteLoading}] = useMutation(DELETE_TASK_MUTATION);
  const [callAddTask, {loading: addLoading}] = useMutation(ADD_TASK_MUTATION);
  const [callUpdateTask, {loading: updateLoading}] = useMutation(UPDATE_TASK_MUTATION);

  useEffect(() => {
    if (data && data.tasks) {
      setTasks(
        data.tasks.filter(identity).map((task) => ({
          key: task.id,
          display: task.title,
        }))
      );
    }
  }, [data]);

  async function deleteTask(item: ListItem) {
    await callDeleteTask({
      variables: {
        deleteTaskId: item.key,
      },
      // refetchQueries: [{ query: GET_TASKS_QUERY }],
      update(cache, { data: callDeleteTask }) {
        const data = cache.readQuery({ query: GET_TASKS_QUERY });
        cache.writeQuery({
          query: GET_TASKS_QUERY,
          data: {
            tasks: data!.tasks.filter(
              (task) => task.id !== callDeleteTask!.deleteTask!.id
            ),
          },
        });
      },
    });
  }

  async function addTask(taskTitle: string) {
    await callAddTask({
      variables: {
        task: {
          title: taskTitle,
        },
      },
      // refetchQueries: [{ query: GET_TASKS_QUERY }],
      update(cache, { data: callAddTask }) {
        const data = cache.readQuery({ query: GET_TASKS_QUERY });
        cache.writeQuery({
          query: GET_TASKS_QUERY,
          data: { tasks: [...data?.tasks!, callAddTask?.addTask!] },
        });
      },
    });
  }

  async function updateTask(task: ListItem) {
    await callUpdateTask({
      variables: {
        updateTaskId: task.key,
        edits: {
          title: task.display,
        },
      },
      // refetchQueries: [{ query: GET_TASKS_QUERY }],
      update(cache, { data: callUpdateTask }) {
        const data = cache.readQuery({ query: GET_TASKS_QUERY });
        const newTasks = [...data?.tasks!];
        const taskIndex = data?.tasks.findIndex(
          (task) => task.id === callUpdateTask?.updateTask?.id
        );
        newTasks.splice(taskIndex!, 1, callUpdateTask?.updateTask!);
        console.log(newTasks);

        cache.writeQuery({
          query: GET_TASKS_QUERY,
          data: { tasks: newTasks },
        });
      },
    });
  }

  function isLoading() {
    return deleteLoading || addLoading || updateLoading;
  }

  if (loading) return <div className="spinner-border m-8 text-primary" />;
  else
    return (
      <>
        <ListGroup
          heading="Tasks"
          items={tasks}
          onAddTask={addTask}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        ></ListGroup>
        {isLoading() && <FullPageSpinner></FullPageSpinner>}
      </>
    );
}
