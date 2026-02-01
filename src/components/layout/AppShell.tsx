import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingCart, 
  CheckSquare, 
  Settings, 
  Menu, 
  X, 
  Users, 
  Bell,
  LogOut
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function AppShell() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Shopping Lists', href: '/lists', icon: ShoppingCart },
    { name: 'To-Do', href: '/todos', icon: CheckSquare },
  ];

  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  // Professional, minimalist Sidebar
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-[#4E91F0] selection:text-white">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4E91F0] to-[#FFAD33] flex items-center justify-center shadow-lg shadow-[#4E91F0]/20">
            <Users className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">FamilySync</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 w-72 transform bg-[#0B1120] border-r border-white/5 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Logo Area */}
          <div className="hidden lg:flex items-center space-x-3 p-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4E91F0] to-[#FFAD33] flex items-center justify-center shadow-lg shadow-[#4E91F0]/20">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">FamilySync</span>
          </div>

          {/* Main Nav */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">Overview</div>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                      isActive
                        ? "bg-[#4E91F0]/10 text-[#4E91F0]"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    )
                  }
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4E91F0] rounded-r-full" />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      isActive ? "text-[#4E91F0]" : "group-hover:scale-110"
                    )}
                  />
                  <span className={cn("font-medium", isActive && "font-semibold")}>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-4">System</div>
            {secondaryNavigation.map((item) => (
               <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                    )
                  }
                >
                  <item.icon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
            ))}
          </nav>

          {/* User Profile / Footer */}
          <div className="p-4 border-t border-white/5 bg-[#0F172A]/50 backdrop-blur-sm">
            <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white ring-2 ring-[#0B1120]">
                JS
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white group-hover:text-[#4E91F0] transition-colors truncate">
                  John Smith
                </p>
                <p className="text-xs text-slate-500 truncate">The Smith Family</p>
              </div>
              <LogOut className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-y-auto bg-slate-900 focus:outline-none scroll-smooth">
            {/* Top Bar (Desktop) */}
            <header className="hidden lg:flex items-center justify-between px-8 py-5 sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {navigation.find(n => n.href === location.pathname)?.name || 'Dashboard'}
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#FFAD33] rounded-full ring-2 ring-slate-900 animate-pulse"></span>
                    </button>
                    <button className="px-4 py-2 bg-[#4E91F0] hover:bg-[#3b7acb] text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-[#4E91F0]/25 active:scale-95">
                        New Event
                    </button>
                </div>
            </header>

            <div className="p-4 lg:p-8 max-w-7xl mx-auto pb-20">
                <Outlet />
            </div>
        </main>
      </div>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
