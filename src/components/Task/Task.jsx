import Button from "../Buttons";
import "../Task/Task.css";
import Important from "../SvgImages/Important";
import CheckedImportant from "../SvgImages/CheckedImportant";
import Delete from "../SvgImages/Delete";
import Done from "../SvgImages/Done";
import { useState } from "react";

export default function Task({ task, setDoneId, setTaskDelete }) {
  // these states are needed to highlight what task has been done
  let [TaskDone, setTaskDone] = useState(task.done);
  // or to delete it
  let [remove, setRemove] = useState(false);

  function DeleteTaskFunction() {
    // first I pass the value of the id we need to the parent to remove task from localStorage
    setTaskDelete(task.id);
    // then we change state for component
    return setRemove(!remove);
  }

  function TaskDoneFunction() {
    // first I pass the value of the id we need to the parent to update task in localStorage
    setDoneId(task.id);
    // then we change state for css part
    return setTaskDone(!TaskDone);
  }

  return (
    <>
      {" "}
      {remove !== true && (
        <>
          <div
            className={task.checked && !TaskDone ? "task imp" : "task"}
            id={TaskDone ? "taskDone" : ""}
          >
            <div className="task_info">
              <div className="title_description">
                <span className="title">{task.title}</span>
                <span className="description">{task.description}</span>
              </div>
              <div className="buttons">
                <Button className={"bttn done"} onClick={TaskDoneFunction}>
                  <Done />
                </Button>
                <Button className={"bttn delete"} onClick={DeleteTaskFunction}>
                  <Delete />
                </Button>
                {task.checked ? (
                  <>
                    <CheckedImportant />
                  </>
                ) : (
                  <Important />
                )}
              </div>
            </div>
            <div className="time_info">
              <span>Created:{task.created}</span>
              <span>
                {task.time &&
                  "time to complete:" + task.time + "/" + task.type_of_time}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
