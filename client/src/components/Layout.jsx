import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Info, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 flex text-slate-100 font-sans">
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-lg font-bold tracking-tight">EduManager</h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavItem to="/" icon={LayoutDashboard} label="Dashboard" end />
                    <NavItem to="/students" icon={Users} label="Students" />
                    <NavItem to="/project-info" icon={Info} label="Project Info" />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 md:ml-64 p-6 md:p-8 pt-20 md:pt-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/10 blur-[100px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

const NavItem = ({ icon: Icon, label, to, end }) => (
    <NavLink
        to={to}
        end={end}
        className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 w-full text-sm font-medium rounded-lg transition-all",
            isActive ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" : "text-slate-400 hover:text-white hover:bg-slate-800"
        )}
    >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
    </NavLink>
);

export default Layout;
