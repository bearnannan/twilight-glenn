'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import MapSection from './MapSection';
import Sidebar from './Sidebar';
import EditProjectModal from './EditProjectModal';
import { getProjects, seedProjects, updateProject, addProject, deleteProject } from '@/services/projectService';

interface DashboardClientProps {
    initialProjects: Project[];
}

export default function DashboardClient({ initialProjects }: DashboardClientProps) {
    const [selectedProjectId, setSelectedProjectId] = useState<string | number | null>(null);
    const [projects, setProjects] = useState<Project[]>(initialProjects);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    // Fetch data from Firestore on mount
    const refreshData = async () => {
        const data = await getProjects();
        setProjects(data); // Always update, empty or not
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

    const handleEditProject = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleAddProject = () => {
        setEditingProject(null); // Clear editing project -> Create Mode
        setIsModalOpen(true);
    };

    const handleDeleteProject = async (id: string | number) => {
        const success = await deleteProject(id);
        if (success) {
            refreshData();
            if (selectedProjectId === id) setSelectedProjectId(null);
        } else {
            alert('ลบโครงการไม่สำเร็จ');
        }
    };

    const handleUpdateProject = async (data: Partial<Project>, id?: string | number) => {
        let success = false;
        if (id) {
            // Update existing
            success = await updateProject(id, data);
        } else {
            // Create new
            const newId = await addProject(data as Omit<Project, 'id'>);
            success = !!newId;
        }

        if (success) {
            refreshData();
            setIsModalOpen(false);
            setEditingProject(null);
        } else {
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
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
                    onEditProject={handleEditProject}
                    onAddProject={handleAddProject}
                    onDeleteProject={handleDeleteProject}
                />
            </div>

            {/* Edit Modal */}
            {isModalOpen && (
                <EditProjectModal
                    project={editingProject}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingProject(null);
                    }}
                    onSave={handleUpdateProject}
                />
            )}
        </div>
    );
}
