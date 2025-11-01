
import React from 'react';
import { MenuIcon, SunIcon, MoonIcon } from './icons/Icons';

interface HeaderProps {
    setSidebarOpen: (open: boolean) => void;
}

const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};

// Apply theme on initial load
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}


export const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/75 dark:bg-slate-900/75 backdrop-blur-sm">
            <button
                type="button"
                className="border-r border-slate-200 dark:border-slate-800 px-4 text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                onClick={() => setSidebarOpen(true)}
            >
                <span className="sr-only">Abrir menú</span>
                <MenuIcon className="h-6 w-6" />
            </button>
            <div className="flex flex-1 justify-end px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 focus:ring-blue-500">
                         <SunIcon className="h-6 w-6 hidden dark:block" />
                         <MoonIcon className="h-6 w-6 block dark:hidden" />
                         <span className="sr-only">Cambiar tema</span>
                    </button>
                    <div className="flex-shrink-0">
                        <img
                            className="h-9 w-9 rounded-full"
                            src="https://picsum.photos/seed/user/100/100"
                            alt="Perfil de usuario"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};