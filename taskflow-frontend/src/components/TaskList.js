import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../axios';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Проверяем авторизацию пользователя при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login'); // Перенаправляем на страницу входа, если токен отсутствует
      return;
    }
    fetchTasks(); // Загружаем задачи
  }, [navigate]);

  // Функция для получения задач
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('access');
      const response = await apiClient.get('/tasks/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data); // Обновляем список задач
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
    }
  };

  // Функция для добавления новой задачи
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Функция для выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('access'); // Удаляем токен доступа
    localStorage.removeItem('refresh'); // Удаляем refresh-токен
    navigate('/login'); // Перенаправляем на страницу входа
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task List</h1>
        <button onClick={handleLogout} style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
          Logout
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <AddTask onTaskAdded={handleTaskAdded} />
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
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
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>₽{task.price}</td>
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
