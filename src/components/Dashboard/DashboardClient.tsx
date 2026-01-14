'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import MapSection from './MapSection';
import Sidebar from './Sidebar';
import { getProjects, seedProjects } from '@/services/projectService';

interface DashboardClientProps {
    initialProjects: Project[];
}

export default function DashboardClient({ initialProjects }: DashboardClientProps) {
    const [selectedProjectId, setSelectedProjectId] = useState<string | number | null>(null);
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    // Fetch data from Firestore on mount
    const refreshData = async () => {
        const data = await getProjects();
        if (data.length > 0) {
            setProjects(data);
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    const handleSelectProject = (id: string | number) => {
        setSelectedProjectId(id);
    };

    const handleSeedData = async () => {
        if (confirm('ยืนยันการนำข้อมูล Mock ลง Database?')) {
            const success = await seedProjects();
            if (success) {
                alert('นำข้อมูลเข้าเรียบร้อย! กำลังรีเฟรช...');
                refreshData();
            } else {
                alert('เกิดข้อผิดพลาดในการนำเข้าข้อมูล');
            }
        }
    };

    return (
        <div className="flex-1 pt-16 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
            {/* Map Section (70% on Desktop) */}
            <div className="md:col-span-8 h-1/2 md:h-full relative">
                <MapSection
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={handleSelectProject}
                />
            </div>

            {/* Sidebar (30% on Desktop) */}
            <div className="md:col-span-4 h-1/2 md:h-full bg-white z-20 shadow-xl overflow-hidden">
                <Sidebar
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onSelectProject={handleSelectProject}
                    onSeedData={handleSeedData}
                />
            </div>
        </div>
    );
}
