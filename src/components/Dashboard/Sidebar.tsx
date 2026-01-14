'use client';

import { useRef, useEffect } from 'react';

import { Project } from '@/types/project';
import ProjectCard from './ProjectCard';
import { ClipboardList } from 'lucide-react';

interface SidebarProps {
    projects: Project[];
    selectedProjectId: string | number | null;
    onSelectProject: (id: string | number) => void;
    onSeedData?: () => void; // Optional for compatibility
}

export default function Sidebar({ projects, selectedProjectId, onSelectProject, onSeedData }: SidebarProps) {
    const itemRefs = useRef<{ [key: string | number]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (selectedProjectId && itemRefs.current[selectedProjectId]) {
            itemRefs.current[selectedProjectId]?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, [selectedProjectId]);

    return (
        <aside className="bg-gray-50 h-full flex flex-col border-l border-gray-200">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 text-[#1a233a]">
                    <ClipboardList className="w-5 h-5 text-orange-500" />
                    <h2 className="font-bold text-lg">รายงานความคืบหน้า</h2>
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                    {projects.length} รายการ
                </span>
            </div>

            {/* Contact List / Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        ref={(el) => { itemRefs.current[project.id] = el; }}
                        onClick={() => onSelectProject(project.id)}
                        className={`cursor-pointer transition-all duration-200 ${selectedProjectId === project.id
                            ? 'ring-2 ring-orange-500 rounded-lg shadow-md scale-[1.02]'
                            : 'hover:bg-gray-100/50'
                            }`}
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            {/* Footer with Seed Button */}
            {onSeedData && (
                <div className="p-4 border-t border-gray-200 bg-gray-100">
                    <button
                        onClick={onSeedData}
                        className="w-full py-2 text-xs text-gray-500 hover:text-gray-700 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                    >
                        (Debug) ดึงข้อมูล Mock เข้า Database
                    </button>
                </div>
            )}
        </aside>
    );
}
