import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, CheckSquare } from 'lucide-react';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import AddTaskModal from './components/AddTaskModal';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design System Update', time: '09:00', category: 'Work',     completed: false },
    { id: 2, title: 'Morning Workout',       time: '06:30', category: 'Personal', completed: true  },
    { id: 3, title: 'Project Deadline',      time: '17:00', category: 'Urgent',   completed: false },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');
  const [isModalOpen,    setIsModalOpen]    = useState(false);
  const [searchQuery,    setSearchQuery]    = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchCat    = activeCategory === 'all' || task.category.toLowerCase() === activeCategory;
    const matchSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const addTask    = (t) => setTasks([t, ...tasks]);
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  const stats = {
    total:     tasks.length,
    completed: tasks.filter(t =>  t.completed).length,
    pending:   tasks.filter(t => !t.completed).length,
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="app-container">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAddTask={() => setIsModalOpen(true)}
      />

      <main className="main-content">
        {/* ── Header ── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '36px' }}>
          <div>
            <p style={{ color: 'var(--text-3)', fontSize: '0.8rem', marginBottom: '4px' }}>{today}</p>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>My Schedule</h1>
            <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', marginTop: '4px' }}>
              {stats.pending === 0
                ? 'All caught up! 🎉'
                : <><span style={{ color: 'var(--accent)', fontWeight: 600 }}>{stats.pending} task{stats.pending > 1 ? 's' : ''}</span> remaining today</>
              }
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              padding: '0 14px',
              height: '38px',
            }}>
              <Search size={15} color="var(--text-3)" />
              <input
                placeholder="Search…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: 'var(--text-1)', fontSize: '0.85rem', width: '160px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Bell */}
            <button style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)', width: '38px', height: '38px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-2)', lineHeight: 0,
            }}>
              <Bell size={16} strokeWidth={1.75} />
            </button>

            {/* Avatar */}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <User size={16} color="#fff" strokeWidth={2} />
            </div>
          </div>
        </header>

        {/* ── Stats ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total',     value: stats.total,     color: 'var(--text-1)',    sub: 'tasks' },
            { label: 'Completed', value: stats.completed, color: 'var(--success)',   sub: 'done' },
            { label: 'Pending',   value: stats.pending,   color: 'var(--warning)',   sub: 'remaining' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.25 }}
              className="stat-card"
            >
              <p style={{ fontSize: '0.775rem', color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                {s.label}
              </p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: s.color, letterSpacing: '-0.04em' }}>
                  {s.value}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{s.sub}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Task List Header ── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-1)' }}>
            {activeCategory === 'all'
              ? 'All Tasks'
              : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
            }
            <span style={{ marginLeft: '8px', color: 'var(--text-3)', fontSize: '0.875rem', fontWeight: 400 }}>
              {filteredTasks.length}
            </span>
          </h2>
        </div>

        {/* ── Tasks ── */}
        <AnimatePresence mode="popLayout">
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: '80px 0', gap: '12px',
              }}
            >
              <CheckSquare size={36} color="var(--text-3)" strokeWidth={1.25} />
              <p style={{ color: 'var(--text-3)', fontSize: '0.9rem' }}>No tasks here yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addTask} />
    </div>
  );
};

export default App;