import React, { useState } from 'react';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  const handleTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        id: Date.now(),
        content: taskInput,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
      return !task.completed;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className='todo-container'>
      <h1>Todo List</h1>
      <input className='todo-input'
        type="text"
        value={taskInput}
        onChange={handleTaskInputChange}
        placeholder="Enter a task"
      />
      <button className='button' onClick={addTask}>Add Task</button>

      <div>
        <button className='button' onClick={() => setFilter('all')}>All</button>
        <button className='button' onClick={() => setFilter('active')}>Active</button>
        <button className='button' onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.content}
            <button className='button' onClick={() => toggleTaskCompletion(task.id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button className='button' onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
