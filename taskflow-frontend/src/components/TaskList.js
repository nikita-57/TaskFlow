import React, { useEffect, useState } from 'react';
import apiClient from '../axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await apiClient.get('/tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.title}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>${task.price}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(task.due_date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
