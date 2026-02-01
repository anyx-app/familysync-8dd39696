import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        
        {/* Placeholders for future routes - keeping the structure ready */}
        <Route path="calendar" element={
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Family Calendar</h2>
                <p className="text-slate-400">Interactive calendar view coming soon.</p>
            </div>
        } />
        <Route path="lists" element={
             <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Shopping Lists</h2>
                <p className="text-slate-400">Collaborative lists coming soon.</p>
            </div>
        } />
        <Route path="todos" element={
             <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Tasks & To-Dos</h2>
                <p className="text-slate-400">Task management coming soon.</p>
            </div>
        } />
         <Route path="settings" element={
             <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Family Settings</h2>
                <p className="text-slate-400">Profile and preferences coming soon.</p>
            </div>
        } />
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
