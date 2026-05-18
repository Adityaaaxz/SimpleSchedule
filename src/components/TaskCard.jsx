import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle2, Circle, Clock } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="card"
      style={{
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '10px',
        opacity: task.completed ? 0.55 : 1,
      }}
    >
      {/* Check */}
      <button
        onClick={() => onToggle(task.id)}
        style={{ background: 'transparent', flexShrink: 0, padding: '2px', lineHeight: 0 }}
      >
        {task.completed
          ? <CheckCircle2 size={20} color="var(--success)" strokeWidth={2} />
          : <Circle       size={20} color="var(--text-3)"  strokeWidth={1.75} />
        }
      </button>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.9rem',
          fontWeight: 500,
          marginBottom: '4px',
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? 'var(--text-3)' : 'var(--text-1)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {task.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            color: 'var(--text-3)', fontSize: '0.775rem'
          }}>
            <Clock size={12} strokeWidth={1.75} />
            {task.time}
          </div>
          <span className={`badge badge-${task.category.toLowerCase()}`}>
            {task.category}
          </span>
        </div>
      </div>

      {/* Delete */}
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: 'transparent',
          color: 'var(--text-3)',
          padding: '6px',
          borderRadius: 'var(--r-sm)',
          lineHeight: 0,
          flexShrink: 0,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--danger-dim)'; e.currentTarget.style.color = 'var(--danger)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-3)'; }}
      >
        <Trash2 size={16} strokeWidth={1.75} />
      </button>
    </motion.div>
  );
};

export default TaskCard;
