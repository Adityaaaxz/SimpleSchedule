import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design System Update', time: '09:00', category: 'Work', completed: false },
    { id: 2, title: 'Morning Workout', time: '06:30', category: 'Personal', completed: true },
    { id: 3, title: 'Project Deadline', time: '17:00', category: 'Urgent', completed: false },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesCategory = activeCategory === 'all' || task.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        onAddTask={() => setIsModalOpen(true)}
      />

      <main className="main-content">
        {/* Header */}
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px' 
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>My Schedule</h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              You have <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{stats.pending} tasks</span> pending for today
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <Search 
                size={18} 
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} 
              />
              <input 
                placeholder="Search tasks..." 
                className="input-field"
                style={{ paddingLeft: '40px', width: '240px', borderRadius: '12px' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="glass-card" style={{ padding: '12px', borderRadius: '12px' }}>
              <Bell size={20} color="var(--text-secondary)" />
            </button>
            <div className="glass-card" style={{ padding: '4px 12px 4px 4px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <User size={16} color="white" />
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Ditto</span>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '24px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Tasks', value: stats.total, color: 'var(--accent-primary)' },
            { label: 'Completed', value: stats.completed, color: 'var(--success)' },
            { label: 'Pending', value: stats.pending, color: 'var(--warning)' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel"
              style={{ padding: '24px' }}
            >
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{stat.label}</p>
              <h3 style={{ fontSize: '2rem', color: stat.color }}>{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Task List */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.5rem' }}>
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Schedule
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode='popLayout'>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask} 
                  onDelete={deleteTask} 
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}
              >
                <p>No tasks found in this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addTask}
      />
    </div>
  );
};

export default App;