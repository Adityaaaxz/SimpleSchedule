import React from 'react';
import { LayoutGrid, Calendar, Clock, Settings, Plus, Zap, Briefcase, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeCategory, setActiveCategory, onAddTask }) => {
  const menuItems = [
    { id: 'all',      label: 'All Tasks',  icon: LayoutGrid },
    { id: 'today',    label: 'Today',      icon: Calendar },
    { id: 'upcoming', label: 'Upcoming',   icon: Clock },
  ];

  const categories = [
    { id: 'work',     label: 'Work',     icon: Briefcase,   color: '#a5a0f5' },
    { id: 'personal', label: 'Personal', icon: User,        color: '#34d399' },
    { id: 'urgent',   label: 'Urgent',   icon: AlertCircle, color: '#f87171' },
  ];

  return (
    <motion.aside
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0,   opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      style={{
        width: 'var(--sidebar-w)',
        minWidth: 'var(--sidebar-w)',
        height: '100vh',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '28px 16px',
        gap: '28px',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingLeft: '4px' }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'var(--accent)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Zap size={16} color="#fff" fill="#fff" />
        </div>
        <span style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.03em', fontFamily: 'Geist, Inter, sans-serif' }}>
          PlanIt
        </span>
      </div>

      {/* Add Task */}
      <button onClick={onAddTask} className="btn-primary" style={{ width: '100%' }}>
        <Plus size={16} />
        New Task
      </button>

      {/* Menu */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{
          color: 'var(--text-3)', fontSize: '0.68rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          paddingLeft: '12px', marginBottom: '8px'
        }}>Menu</p>
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`nav-item${activeCategory === item.id ? ' active' : ''}`}
          >
            <item.icon size={16} strokeWidth={1.75} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Categories */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <p style={{
          color: 'var(--text-3)', fontSize: '0.68rem', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.08em',
          paddingLeft: '12px', marginBottom: '8px'
        }}>Categories</p>
        {categories.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            className={`nav-item${activeCategory === item.id ? ' active' : ''}`}
          >
            <span style={{
              width: 7, height: 7, borderRadius: '50%',
              background: item.color, flexShrink: 0,
              boxShadow: activeCategory === item.id ? `0 0 6px ${item.color}` : 'none'
            }} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ marginTop: 'auto' }}>
        <div className="divider" style={{ marginBottom: '12px' }} />
        <button className="nav-item" style={{ width: '100%' }}>
          <Settings size={16} strokeWidth={1.75} />
          Settings
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
