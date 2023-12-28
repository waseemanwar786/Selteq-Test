import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim leading and trailing whitespaces
    const trimmedValue = value.trim();

    // Validate if the input is not empty or contains only whitespaces
    if (trimmedValue === '') {
      setError('Task cannot be empty');
      return;
    }

    // Clear the error if input is valid
    setError('');

    // Add the task
    addTodo(trimmedValue);

    // Clear the input field
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Enter your Tasks"
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};
