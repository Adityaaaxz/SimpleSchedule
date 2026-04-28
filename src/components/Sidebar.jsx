import React from 'react';
import { LayoutGrid, Calendar, Clock, Settings, Plus, Star, Briefcase, User, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeCategory, setActiveCategory, onAddTask }) => {
  const menuItems = [
    { id: 'all', label: 'All Schedule', icon: LayoutGrid },
    { id: 'today', label: 'Today', icon: Calendar },
    { id: 'upcoming', label: 'Upcoming', icon: Clock },
  ];

  const categories = [
    { id: 'work', label: 'Work', icon: Briefcase, color: '#6366f1' },
    { id: 'personal', label: 'Personal', icon: User, color: '#10b981' },
    { id: 'urgent', label: 'Urgent', icon: AlertCircle, color: '#ef4444' },
  ];

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel"
      style={{ 
        width: 'var(--sidebar-width)', 
        height: 'calc(100vh - 40px)', 
        margin: '20px',
        display: 'flex',
        flexDirection: 'column',
        padding: '30px 20px',
        gap: '40px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          background: 'var(--accent-gradient)', 
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
        }}>
          <Star color="white" size={20} />
        </div>
        <h2 style={{ fontSize: '1.5rem', letterSpacing: '-0.5px' }}>PlanIt.</h2>
      </div>

      <button 
        onClick={onAddTask}
        className="btn-primary" 
        style={{ width: '100%', justifyContent: 'center' }}
      >
        <Plus size={20} /> New Task
      </button>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px', marginLeft: '10px' }}>Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              width: '100%',
              textAlign: 'left',
              color: activeCategory === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: activeCategory === item.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            }}
          >
            <item.icon size={18} strokeWidth={activeCategory === item.id ? 2.5 : 2} />
            <span style={{ fontWeight: activeCategory === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '10px', marginLeft: '10px' }}>Categories</p>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCategory(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              width: '100%',
              textAlign: 'left',
              color: activeCategory === item.id ? 'var(--text-primary)' : 'var(--text-secondary)',
              background: activeCategory === item.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
            <span style={{ fontWeight: activeCategory === item.id ? 600 : 400 }}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto' }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '12px',
            width: '100%',
            textAlign: 'left',
            color: 'var(--text-secondary)',
            background: 'transparent',
          }}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
