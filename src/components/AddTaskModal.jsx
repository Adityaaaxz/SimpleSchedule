import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

const AddTaskModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('Work');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !time) return;
    onAdd({ title: title.trim(), time, category, completed: false, id: Date.now() });
    setTitle('');
    setTime('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(6px)',
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 10 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              width: '440px',
              background: 'var(--bg-sidebar)',
              border: '1px solid var(--border-hover)',
              borderRadius: 'var(--r-xl)',
              padding: '32px',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2px' }}>Add New Task</h2>
                <p style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>Fill in the details below</p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-sm)',
                  padding: '6px',
                  color: 'var(--text-2)',
                  lineHeight: 0,
                }}
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Title */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '8px' }}>
                  Task Title
                </label>
                <input
                  autoFocus
                  className="input-field"
                  placeholder="e.g. Design Review"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              {/* Time + Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '8px' }}>
                    Time
                  </label>
                  <input
                    type="time"
                    className="input-field"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-2)', marginBottom: '8px' }}>
                    Category
                  </label>
                  <select
                    className="input-field"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    style={{ appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Divider */}
              <div className="divider" />

              {/* Actions */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: 'var(--r-md)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-2)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, padding: '11px' }}
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTaskModal;
