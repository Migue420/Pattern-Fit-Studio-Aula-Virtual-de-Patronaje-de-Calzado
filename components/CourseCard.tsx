
import React, { useState } from 'react';
import { Course } from '../types';
import { ClockIcon, UserIcon } from './icons/Icons';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Use a single handler for touch toggling on mobile
    const handleInteraction = () => {
        // This check prevents touch events from toggling state on devices that also support hover
        if ('ontouchstart' in window) {
            setIsHovered(prev => !prev);
        }
    };

    return (
        <div 
            className="relative bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleInteraction}
        >
            <img className="w-full h-40 object-cover" src={course.imageUrl} alt={course.title} />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 truncate">{course.title}</h3>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>{course.instructor}</span>
                </div>
                 <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{course.duration}</span>
                </div>
                <div className="mt-auto pt-4">
                  <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800 transition-colors">
                      Ver Curso
                  </button>
                </div>
            </div>

            {course.syllabus && course.syllabus.length > 0 && (
                <div 
                    className={`absolute inset-0 bg-slate-900/80 backdrop-blur-sm p-4 text-white transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    aria-hidden={!isHovered}
                >
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <h4 className="text-lg font-bold mb-3 border-b-2 border-blue-400 pb-1">Temario del Curso</h4>
                        <ul className="text-sm space-y-1 overflow-y-auto max-h-40">
                            {course.syllabus.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};