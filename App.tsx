
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { AIAssistant } from './components/AIAssistant';
import { CourseCard } from './components/CourseCard';
import { Course } from './types';

const featuredCourses: Course[] = [
  {
    title: 'Fundamentos del Diseño de Zapatillas',
    instructor: 'Jian DeLeon',
    duration: '8 Semanas',
    imageUrl: 'https://picsum.photos/seed/sneaker/600/400',
    syllabus: ['Introducción a la historia', 'Anatomía de la zapatilla', 'Materiales y construcción', 'Proyecto final de diseño'],
  },
  {
    title: 'Patronaje de Zapatillas',
    instructor: 'Maria Garcia',
    duration: '10 Semanas',
    imageUrl: 'https://picsum.photos/seed/pattern/600/400',
    syllabus: [
        'Módulo 1: Introducción al Patronaje',
        'Módulo 2: Anatomía del Pie y Hormas',
        'Módulo 3: Creación del Patrón Base',
        'Módulo 4: Desarrollo de Piezas (Pala, Talón)',
        'Módulo 5: Ajustes y Prototipado',
        'Módulo 6: Digitalización de Patrones',
        'Módulo 7: Proyecto Final'
    ]
  },
  {
    title: 'Marroquinería Avanzada para Calzado',
    instructor: 'Anya Taylor',
    duration: '12 Semanas',
    imageUrl: 'https://picsum.photos/seed/leather/600/400',
    syllabus: ['Tipos de cuero', 'Técnicas de corte', 'Costura a mano y a máquina', 'Acabados y mantenimiento'],
  },
  {
    title: 'Fabricación de Calzado Sostenible',
    instructor: 'Greta Verde',
    duration: '10 Semanas',
    imageUrl: 'https://picsum.photos/seed/sustainable/600/400',
    syllabus: ['Materiales ecológicos', 'Procesos de bajo impacto', 'Reciclaje y supra-reciclaje', 'Certificaciones y mercado'],
  },
];


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex text-slate-800 dark:text-slate-200 font-sans">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-900 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex space-x-3 sm:space-x-4">
                <span className="fade-in-1">Crea.</span>
                <span className="fade-in-2">Diseña.</span>
                <span className="fade-in-3">Innova.</span>
              </h1>
            </div>

            <div className="mb-12">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-6">Cursos Destacados</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredCourses.map((course) => (
                        <CourseCard key={course.title} course={course} />
                    ))}
                </div>
            </div>

            <div>
                 <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white mb-6">Asistente Zapatero IA</h2>
                 <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-3xl">¿Tienes alguna pregunta sobre un zapato? Sube una imagen y pregunta a nuestro asistente de IA para obtener información sobre materiales, construcción, combinaciones de estilo o consejos de reparación.</p>
                <AIAssistant />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}