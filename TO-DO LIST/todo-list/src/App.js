import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedCompletedTasks = localStorage.getItem("completedTasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      created: new Date().toLocaleString(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;
    });

    setCompletedTasks((prevCompletedTasks) => {
      const updatedCompletedTasks = tasks
        .map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
        .filter((task) => task.completed);
      return updatedCompletedTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      return updatedTasks;
    });

    setCompletedTasks((prevCompletedTasks) =>
      prevCompletedTasks.filter((task) => task.id !== taskId)
    );
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TodoForm addTask={addTask} />
      <h2>Tasks</h2>
      <ul>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <li key={task.id}>
              <div className="task-content">
                <span className="task-name">{task.text}</span>
                <span className="task-info">Created: {task.created}</span>
              </div>
              <div className="button-container">
                <button
                  className="toggle-button"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  Mark Complete
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
      </ul>
      <h2>Completed Tasks</h2>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id} className="completed">
            <div className="task-content">
              <span className="task-name">{task.text}</span>
              <span className="task-info">
                Completed:{" "}
                {task.completed ? new Date().toLocaleString() : "N/A"}
              </span>
            </div>
            <div className="button-container">
              <button
                className="toggle-button"
                onClick={() => toggleTaskCompletion(task.id)}
              >
                Mark Incomplete
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
