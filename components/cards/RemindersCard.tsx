'use client'

import React, { useState } from 'react';
import { MoreHorizontal, Check, Plus, X } from 'lucide-react';

export const RemindersCard: React.FC = () => {
  const [reminders, setReminders] = useState([
    { id: '1', title: 'Beber Água', sub: '200ml a cada hora', checked: false },
    { id: '2', title: 'Alongamento', sub: 'Pausa de 5 min', checked: false },
    { id: '3', title: 'Vitamina D', sub: 'Tomar com almoço', checked: true },
    { id: '4', title: 'Caminhada', sub: '30 minutos leve', checked: false },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState('');

  const toggle = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, checked: !r.checked } : r));
  };

  const handleAddReminder = () => {
    if (!newTitle.trim()) return;
    
    const newReminder = {
      id: Date.now().toString(),
      title: newTitle,
      sub: newSub || 'Sem detalhes',
      checked: false
    };

    setReminders([newReminder, ...reminders]);
    setNewTitle('');
    setNewSub('');
    setIsAdding(false);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewTitle('');
    setNewSub('');
  };

  return (
    <div className="relative p-6 rounded-[24px] bg-white/55 dark:bg-[rgba(30,30,30,0.55)] liquid-glass-subtle border border-white/40 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.3)] h-full flex flex-col transition-colors overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-bold text-lg text-[rgba(0,0,0,0.85)] dark:text-white tracking-tight transition-colors">Lembretes</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="w-8 h-8 rounded-[14px] bg-[rgba(0,122,255,0.2)] hover:bg-[rgba(0,122,255,0.3)] flex items-center justify-center text-[#007AFF] transition-all hover:scale-105 active:scale-95"
            title="Adicionar Lembrete"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-[14px] bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 flex items-center justify-center text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)] hover:text-[rgba(0,0,0,0.7)] dark:hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* List */}
      <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-2">
        {reminders.map((reminder) => (
          <li
            key={reminder.id}
            className="flex items-center gap-4 cursor-pointer group p-3 rounded-[18px] hover:bg-white/40 dark:hover:bg-white/10 transition-all duration-300"
            onClick={() => toggle(reminder.id)}
          >
            <div className={`w-6 h-6 rounded-[10px] border flex items-center justify-center transition-all duration-300 shrink-0 ${reminder.checked ? 'bg-[rgba(0,122,255,0.25)] border-[rgba(0,122,255,0.4)] scale-110' : 'border-white/40 dark:border-white/20 bg-white/50 dark:bg-white/10 group-hover:border-[rgba(0,122,255,0.4)]'}`}>
              {reminder.checked && <Check className="w-3.5 h-3.5 text-[#007AFF] stroke-[3]" />}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold text-[15px] transition-all truncate ${reminder.checked ? 'text-[rgba(0,0,0,0.35)] dark:text-[rgba(255,255,255,0.35)] line-through' : 'text-[rgba(0,0,0,0.85)] dark:text-white'}`}>{reminder.title}</p>
              <p className="text-xs text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)] font-medium truncate">{reminder.sub}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Modal Overlay */}
      {isAdding && (
        <div className="absolute inset-0 z-20 bg-white/90 dark:bg-[rgba(30,30,30,0.95)] liquid-glass-subtle p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200 rounded-[24px]">
           <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-[rgba(0,0,0,0.85)] dark:text-white">Novo Lembrete</h4>
              <button onClick={handleCancel} className="p-1 rounded-[10px] hover:bg-white/40 dark:hover:bg-white/10 transition-colors text-[rgba(0,0,0,0.45)] dark:text-[rgba(255,255,255,0.5)]">
                <X className="w-5 h-5" />
              </button>
           </div>

           <div className="space-y-4 flex-1">
             <div>
               <label className="block text-xs font-semibold text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] uppercase tracking-wider mb-1.5 ml-1">Título</label>
               <input
                  autoFocus
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Tomar medicação"
                  className="w-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/20 rounded-[14px] px-4 py-3 text-[rgba(0,0,0,0.85)] dark:text-white placeholder:text-[rgba(0,0,0,0.35)] dark:placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,122,255,0.4)] transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
               />
             </div>

             <div>
               <label className="block text-xs font-semibold text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] uppercase tracking-wider mb-1.5 ml-1">Detalhes (Opcional)</label>
               <input
                  type="text"
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  placeholder="Ex: Após o almoço"
                  className="w-full bg-white/50 dark:bg-white/10 border border-white/40 dark:border-white/20 rounded-[14px] px-4 py-3 text-[rgba(0,0,0,0.85)] dark:text-white placeholder:text-[rgba(0,0,0,0.35)] dark:placeholder:text-[rgba(255,255,255,0.35)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,122,255,0.4)] transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
               />
             </div>
           </div>

           <div className="flex gap-3 mt-4">
             <button
               onClick={handleCancel}
               className="flex-1 py-3.5 rounded-[14px] bg-white/50 dark:bg-white/10 text-[rgba(0,0,0,0.5)] dark:text-[rgba(255,255,255,0.5)] font-semibold hover:bg-white/70 dark:hover:bg-white/20 transition-colors"
             >
               Cancelar
             </button>
             <button
               onClick={handleAddReminder}
               className="flex-1 py-3.5 rounded-[14px] bg-[rgba(0,122,255,0.2)] hover:bg-[rgba(0,122,255,0.3)] text-[#007AFF] font-semibold transition-all active:scale-[0.98]"
             >
               Salvar
             </button>
           </div>
        </div>
      )}
    </div>
  );
};