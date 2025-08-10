// webapp/components/ClientTasks.jsx
"use client";
import { useState } from 'react';

export function ClientTasks({ tasks, onTasksChange }) {
    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim() === '') return;
        const newTasks = [...tasks, { id: Date.now(), text: newTask, done: false }];
        onTasksChange(newTasks);
        setNewTask('');
    };

    const handleToggleTask = (taskId) => {
        const newTasks = tasks.map(task => 
            task.id === taskId ? { ...task, done: !task.done } : task
        );
        onTasksChange(newTasks);
    };

    const handleDeleteTask = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId);
        onTasksChange(newTasks);
    };

    return (
        <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Liste de Tâches</h3>
            <div className="flex gap-2 mb-4">
                <input 
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Nouvelle tâche..."
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                />
                <button onClick={handleAddTask} className="px-3 bg-gray-700 text-white rounded-md text-sm font-semibold hover:bg-gray-800 flex-shrink-0">Ajouter</button>
            </div>
            <div className="space-y-2">
                {tasks.map(task => (
                    <div key={task.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <div className="flex items-center">
                            <input 
                                type="checkbox"
                                checked={task.done}
                                onChange={() => handleToggleTask(task.id)}
                                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <span className={`ml-3 text-sm ${task.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{task.text}</span>
                        </div>
                        <button onClick={() => handleDeleteTask(task.id)} className="text-xs text-red-500 hover:text-red-700">X</button>
                    </div>
                ))}
            </div>
        </div>
    );
}