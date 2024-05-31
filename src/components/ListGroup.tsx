import { FocusEvent, Fragment, useState } from "react";
import { isFunction } from "lodash";

interface Props {
  items: ListItem[];
  heading: string;
  onAddTask?: (taskTitle: string) => void;
  onDeleteTask?: (task: ListItem) => void;
  onUpdateTask?: (task: ListItem) => void;
}

export type ListItem = {
  key: string;
  display: string;
};

export default function ListGroup({
  items,
  heading,
  onAddTask,
  onDeleteTask,
  onUpdateTask,
}: Props) {
  let [isAdd, setIsAdd] = useState(false);
  let [taskTitle, setTaskTitle] = useState("");
  let [editingIndex, setEditingIndex] = useState(-1);
  let [editingTitle, setEditingTitle] = useState("");

  function addTaskSubmitted() {
    taskTitle && isFunction(onAddTask) && onAddTask(taskTitle);
    setTaskTitle("");
  }

  async function updateClicked() {
    if (editingIndex !== -1 && isFunction(onUpdateTask)) {
      await onUpdateTask({
        display: editingTitle,
        key: items[editingIndex].key,
      });
      editClicked();
    }
  }

  function deleteClicked(item: ListItem) {
    typeof isFunction(onDeleteTask) && onDeleteTask(item);
  }

  function editClicked(index: number = -1, item: ListItem | null = null) {
    setEditingIndex(index);
    setEditingTitle(item?.display ?? "");
  }

  function wholeElementBlur(e: FocusEvent, onBlur: Function) {
    const currentTarget = e.currentTarget;

    // Check the newly focused element in the next tick of the event loop
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        onBlur();
      }
    }, 0);
  }

  return (
    <div className="tw-flex tw-flex-col tw-w-80">
      <div className="tw-flex tw-w-full tw-justify-between m-2">
        <h1 className="tw-text-green-600 tw-text-3xl tw-font-bold tw-underline">
          {heading}
        </h1>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => setIsAdd((is) => !is)}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      {isAdd && (
        <div
          className="input-group m-2"
          onBlur={(e) => wholeElementBlur(e, () => setIsAdd(false))}
        >
          <input
            autoFocus
            type="text"
            className="form-control"
            placeholder="title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && addTaskSubmitted()}
          />
          <button
            type="submit"
            className="btn btn-outline-secondary"
            onClick={addTaskSubmitted}
          >
            <i className="bi bi-box-arrow-in-down"></i>
          </button>
        </div>
      )}
      {items.length === 0 && <p className="m-2">No item found</p>}
      <ul className="list-group m-2">
        {items.map((item, index) => (
          <Fragment key={item.key}>
            {editingIndex === index ? (
              <li className="list-group-item p-0">
                <div className="input-group w-full">
                  <input
                    autoFocus
                    type="text"
                    className="tw-grow px-3"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onBlur={() => editClicked()}
                    onKeyUp={(e) => e.key === "Enter" && updateClicked()}
                  ></input>
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    onClick={updateClicked}
                  >
                    <i className="bi bi-box-arrow-in-down"></i>
                  </button>
                </div>
              </li>
            ) : (
              <li className="list-group-item tw-flex tw-justify-between hover:tw-bg-blue-50">
                <span>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    name=""
                    id=""
                  />
                  <label>{item.display}</label>
                </span>
                <span>
                  <i
                    className="bi bi-pencil tw-mr-2 hover:tw-cursor-pointer hover:tw-text-blue-600"
                    onClick={() => editClicked(index, item)}
                  ></i>
                  <i
                    className="bi bi-trash3 hover:tw-cursor-pointer hover:tw-text-red-600"
                    onClick={() => deleteClicked(item)}
                  ></i>
                </span>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
