
import React, { Fragment } from 'react';
import { HomeIcon, BookOpenIcon, UsersIcon, SparklesIcon, XIcon, ShoeIcon } from './icons/Icons';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navigation = [
  { name: 'Inicio', href: '#', icon: HomeIcon, current: true },
  { name: 'Mis Cursos', href: '#', icon: BookOpenIcon, current: false },
  { name: 'Comunidad', href: '#', icon: UsersIcon, current: false },
  { name: 'Asistente IA', href: '#', icon: SparklesIcon, current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Off-canvas menu for mobile */}
      <div className={`fixed inset-0 flex z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-slate-900">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <ShoeIcon className="h-8 w-auto text-blue-600" />
              <span className="ml-3 text-xl font-bold text-slate-900 dark:text-white">SoleCraft</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white',
                    'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500',
                      'mr-4 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex-shrink-0 w-14"></div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                 <ShoeIcon className="h-8 w-auto text-blue-600" />
                 <span className="ml-3 text-xl font-bold text-slate-900 dark:text-white">SoleCraft</span>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white dark:bg-slate-900 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current ? 'text-slate-500' : 'text-slate-400 group-hover:text-slate-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};