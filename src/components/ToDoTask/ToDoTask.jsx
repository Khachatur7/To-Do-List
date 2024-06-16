import { useRef, useState } from "react";
import Button from "../Buttons";
import "../ToDoTask/ToDoTask.css";
export default function ToDoTask({ setShowTasks }) {
  let date = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // I use "useRef" because I need to update the data without re-rendering.
  let allData = useRef(JSON.parse(localStorage.getItem("List_data")) ?? []);
  let title = useRef("");
  let description = useRef("");
  let time = useRef("");
  let type_of_time = useRef("hour");
  let [checkbox, setCheckbox] = useState(false);

  function Cancel() {
    // Сhange all field values to default
    title.current.value = "";
    description.current.value = "";
    time.current.value = "";
    type_of_time.current.value = "hour";
    setCheckbox(false);
  }

  function CheckInputField() {
    // Check the field values of the title and description (the rest is optional)
    if (title.current.value != "" && description.current.value != "") {
      return createData();
    }
    return alert("it is not possible to create a task with an empty value");
  }

  function createData() {
    // First I create an object and pass all the required values
    let data = {
      id: allData.current.length,
      title: title.current.value,
      description: description.current.value,
      time: time.current.value,
      type_of_time: type_of_time.current.value,
      checked: checkbox,
      created: `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()} on ${date.getHours()}:${
        date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
      }`,
      done: false,
    };
    // Then I update the array
    if (allData.current == undefined) {
      allData.current = [data];
    } else {
      allData.current = [data, ...allData.current];
    }
    // And send the update array to the LocalStorage
    localStorage.setItem("List_data", JSON.stringify(allData.current));
    // Then I update the state of the parent element so that there are no errors when multiple components change at the same time.
    title.current.value = "";
    description.current.value = "";
    time.current.value = "";
    type_of_time.current.value = "hour";
    setCheckbox(false);
    return setShowTasks(JSON.parse(localStorage.getItem("List_data")));
  }

  return (
    <div className="all">
      {" "}
      <div className="creater">
        <div className="text">
          <input
            className="title_inpt"
            type="text"
            placeholder="Title"
            ref={title}
          />
          <input
            className="desc_inpt"
            type="text"
            placeholder="description"
            ref={description}
          />
        </div>
        <div className="other">
          <div className="time">
            <input
              className="time_inpt"
              type="number"
              placeholder="time"
              ref={time}
              min={1}
              max={999}
            />
            <select className="type" ref={type_of_time}>
              <option value="hour">hours</option>
              <option value="day">days</option>
              <option value="week">weeks</option>
              <option value="month">months</option>
              <option value="year">years</option>
            </select>
          </div>
          <div className="important">
            <input
              type="checkbox"
              name=""
              id="imp"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
            <label htmlFor="imp" id="label_imp">
              important
            </label>
          </div>
        </div>
      </div>{" "}
      <div className="task_buttons">
        <Button className={"task_bttn"} onClick={Cancel}>
          Cancel
        </Button>
        <Button className={"task_bttn"} onClick={CheckInputField}>
          Create
        </Button>
      </div>
    </div>
  );
}
