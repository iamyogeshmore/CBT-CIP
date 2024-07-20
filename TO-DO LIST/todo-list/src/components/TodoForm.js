import React, { useState } from "react";

function TodoForm({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Enter new task"
      />
      <button className="submit-btn" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
