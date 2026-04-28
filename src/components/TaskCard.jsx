import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, Circle, Clock } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-card"
      style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '16px',
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      <button 
        onClick={() => onToggle(task.id)}
        style={{ background: 'transparent', color: task.completed ? 'var(--success)' : 'var(--text-muted)' }}
      >
        {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
      </button>

      <div style={{ flex: 1 }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          marginBottom: '4px',
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)'
        }}>
          {task.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Clock size={14} />
            <span>{task.time}</span>
          </div>
          <span className={`badge badge-${task.category.toLowerCase()}`}>
            {task.category}
          </span>
        </div>
      </div>

      <button 
        onClick={() => onDelete(task.id)}
        style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: 'var(--danger)', 
          padding: '8px', 
          borderRadius: '10px' 
        }}
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};

export default TaskCard;
