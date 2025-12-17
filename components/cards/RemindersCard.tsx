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
    <div className="relative p-6 rounded-[32px] bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl backdrop-saturate-[180%] border border-white/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col transition-colors overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 tracking-tight transition-colors">Lembretes</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAdding(true)}
            className="w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-all shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95"
            title="Adicionar Lembrete"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/40 dark:bg-slate-700/40 hover:bg-white dark:hover:bg-slate-600 flex items-center justify-center text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* List */}
      <ul className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-2">
        {reminders.map((reminder) => (
          <li 
            key={reminder.id} 
            className="flex items-center gap-4 cursor-pointer group p-3 rounded-2xl hover:bg-white/40 dark:hover:bg-slate-700/40 transition-all duration-300"
            onClick={() => toggle(reminder.id)}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-sm shrink-0 ${reminder.checked ? 'bg-blue-500 border-blue-500 scale-110' : 'border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800/80 group-hover:border-blue-400'}`}>
              {reminder.checked && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
            </div>
            <div className="min-w-0">
              <p className={`font-semibold text-[15px] transition-all truncate ${reminder.checked ? 'text-slate-400/80 dark:text-slate-500/80 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{reminder.title}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium truncate">{reminder.sub}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Add Modal Overlay */}
      {isAdding && (
        <div className="absolute inset-0 z-20 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl p-6 flex flex-col animate-in fade-in zoom-in-95 duration-200">
           <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white">Novo Lembrete</h4>
              <button onClick={handleCancel} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500">
                <X className="w-5 h-5" />
              </button>
           </div>
           
           <div className="space-y-4 flex-1">
             <div>
               <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Título</label>
               <input 
                  autoFocus
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Tomar medicação"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
               />
             </div>
             
             <div>
               <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Detalhes (Opcional)</label>
               <input 
                  type="text"
                  value={newSub}
                  onChange={(e) => setNewSub(e.target.value)}
                  placeholder="Ex: Após o almoço"
                  className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddReminder()}
               />
             </div>
           </div>

           <div className="flex gap-3 mt-4">
             <button 
               onClick={handleCancel}
               className="flex-1 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
             >
               Cancelar
             </button>
             <button 
               onClick={handleAddReminder}
               className="flex-1 py-3.5 rounded-xl bg-blue-500 text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all active:scale-[0.98]"
             >
               Salvar
             </button>
           </div>
        </div>
      )}
    </div>
  );
};