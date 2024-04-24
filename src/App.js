import { useEffect, useRef, useState } from 'react';
import './App.css';
import Task from './components/Task/Task';
import ToDoTask from './components/ToDoTask/ToDoTask';

export default function App() {
  let [showTasks, setShowTasks] = useState(JSON.parse(localStorage.getItem("List_data")) ?? [])
  let [doneId, setDoneId] = useState()
  let [deleteId, setDeleteId] = useState()
  let upDate = useRef();
  upDate.current = showTasks

  // useEffect to delete "task"
  useEffect(() => {
    upDate.current = upDate.current.filter(el => el.id != deleteId)
    localStorage.setItem("List_data", JSON.stringify(upDate.current));
    setShowTasks(upDate.current)

  }, [deleteId])
  // useEffect to indicate that the task has completed or not
  useEffect(() => {
    upDate.current.map(el => {
      if (el.id == doneId) {
        el.done = !el.done

      }
    });
    localStorage.setItem("List_data", JSON.stringify(upDate.current));
  }, [doneId]);

  return (
    <>
      <ToDoTask showTasks={showTasks} setShowTasks={setShowTasks} />
      {showTasks.length > 0 &&
        showTasks.map((el) => {
          return <Task key={el.id} task={el} setDoneId={setDoneId} setTaskDelete={setDeleteId} />
        })}
    </>
  );
}
