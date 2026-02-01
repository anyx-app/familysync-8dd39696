import React from 'react';
import { Calendar as CalendarIcon, CheckSquare, ShoppingCart, Clock, ArrowRight, Plus, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4E91F0] to-[#2563EB] p-8 md:p-12 text-white shadow-2xl shadow-[#4E91F0]/20">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-[#FFAD33]/20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-white/20 rounded-full backdrop-blur-md border border-white/10">
            {currentDate}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Good Morning, <span className="text-white/90">Smith Family!</span>
          </h1>
          <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-xl">
            You have <span className="font-bold text-white">3 events</span> today and <span className="font-bold text-white">5 pending tasks</span>. Stay synchronized!
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-white text-[#2563EB] font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Event
            </button>
            <button className="px-6 py-3 bg-[#0F172A]/20 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-[#0F172A]/30 transition-all flex items-center">
              View Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Schedule - Spans 2 columns */}
        <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Today's Schedule</h2>
            </div>
            <Link to="/calendar" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
             {/* Event Item */}
             <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
               <div className="flex-shrink-0 w-16 text-center">
                 <span className="block text-sm font-bold text-slate-400">10:00 AM</span>
                 <span className="block text-xs text-slate-500">11:00 AM</span>
               </div>
               <div className="w-1 bg-[#FFAD33] rounded-full h-10 mt-1"></div>
               <div className="flex-1">
                 <h3 className="text-white font-semibold">Soccer Practice</h3>
                 <p className="text-sm text-slate-400">City Sports Complex • Jake</p>
               </div>
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white">J</div>
               </div>
             </div>

             {/* Event Item */}
             <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
               <div className="flex-shrink-0 w-16 text-center">
                 <span className="block text-sm font-bold text-slate-400">06:00 PM</span>
                 <span className="block text-xs text-slate-500">08:00 PM</span>
               </div>
               <div className="w-1 bg-[#4E91F0] rounded-full h-10 mt-1"></div>
               <div className="flex-1">
                 <h3 className="text-white font-semibold">Family Dinner</h3>
                 <p className="text-sm text-slate-400">Home • All Members</p>
               </div>
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white">J</div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white">M</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-[#0F172A] flex items-center justify-center text-xs font-bold text-white">+2</div>
               </div>
             </div>
          </div>
        </div>

        {/* Quick Actions / Lists */}
        <div className="space-y-6">
            {/* Shopping List Preview */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                            <ShoppingCart className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-white">Groceries</h2>
                    </div>
                    <button className="text-slate-400 hover:text-white"><MoreHorizontal className="w-5 h-5"/></button>
                </div>
                <div className="space-y-3 flex-1">
                    {['Milk', 'Eggs', 'Bread', 'Vegetables'].map((item, i) => (
                        <div key={i} className="flex items-center space-x-3 group">
                            <div className="w-5 h-5 rounded-md border-2 border-slate-600 flex items-center justify-center cursor-pointer group-hover:border-[#4E91F0] transition-colors"></div>
                            <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-slate-300 transition-colors">
                    + Add Item
                </button>
            </div>

            {/* Pending Tasks */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center space-x-3">
                        <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                            <CheckSquare className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-white">To-Do</h2>
                    </div>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-sm text-slate-200">Pay Electricity Bill</span>
                        <span className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-md">Today</span>
                    </div>
                     <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-sm text-slate-200">Call Grandma</span>
                        <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">Tomorrow</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
