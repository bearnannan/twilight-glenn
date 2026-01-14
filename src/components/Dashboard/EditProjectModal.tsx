'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { X, Save, Plus, Trash2, Sparkles } from 'lucide-react';

interface EditProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<Project>, id?: string | number) => Promise<void>;
}

export default function EditProjectModal({ project, isOpen, onClose, onSave }: EditProjectModalProps) {
    // Default values for create mode
    const defaultForm: Partial<Project> = {
        title: '',
        progress: 0,
        locationName: '',
    };

    const [formData, setFormData] = useState<Partial<Project>>(defaultForm);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [actionItems, setActionItems] = useState<string[]>([]);

    // Reset form when opening/changing project
    useEffect(() => {
        if (isOpen) {
            if (project) {
                setFormData({
                    title: project.title,
                    progress: project.progress,
                    locationName: project.locationName,
                });
                setLat(String(project.coordinates.lat));
                setLng(String(project.coordinates.lng));
                setActionItems(project.actionItems);
            } else {
                // Create Mode
                setFormData(defaultForm);
                setLat('');
                setLng('');
                setActionItems([]);
            }
        }
    }, [isOpen, project]);

    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    if (!isOpen) return null;

    const handleActionItemChange = (index: number, value: string) => {
        const newItems = [...actionItems];
        newItems[index] = value;
        setActionItems(newItems);
    };

    const addActionItem = () => {
        setActionItems([...actionItems, '']);
    };

    const removeActionItem = (index: number) => {
        const newItems = actionItems.filter((_, i) => i !== index);
        setActionItems(newItems);
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        try {
            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: formData.title,
                    progress: formData.progress,
                    locationName: formData.locationName,
                    currentItems: actionItems
                })
            });
            const data = await res.json();

            if (data.suggestedItems && Array.isArray(data.suggestedItems)) {
                // Better UX: Append items
                const newItems = [...actionItems, ...data.suggestedItems].filter(item => item.trim() !== '');
                setActionItems(newItems);
            } else {
                alert('ไม่สามารถสร้างรายการได้: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error(error);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const updatedData: Partial<Project> = {
            ...formData,
            coordinates: {
                lat: parseFloat(lat) || 0,
                lng: parseFloat(lng) || 0,
            },
            actionItems: actionItems.filter(item => item.trim() !== ''),
            // Default image if missing (especially for new projects)
            imageUrl: project?.imageUrl || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop'
        };

        if (project) {
            await onSave(updatedData, project.id);
        } else {
            await onSave(updatedData);
        }

        setIsSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b bg-white z-10 shrink-0">
                    <h3 className="font-bold text-lg">{project ? 'แก้ไขโครงการ' : 'สร้างโครงการใหม่'}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto p-4 space-y-4">
                    <form id="edit-form" onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อโครงการ</label>
                            <input
                                type="text"
                                required
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="เช่น ก่อสร้างอาคาร A"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">ความคืบหน้า (%)</label>
                                <input
                                    type="number"
                                    min="0" max="100" required
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={formData.progress}
                                    onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">สถานที่ (ชื่อ)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={formData.locationName}
                                    onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                                    placeholder="เช่น กรุงเทพฯ"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={lat}
                                    onChange={(e) => setLat(e.target.value)}
                                    placeholder="13.7563"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                                    value={lng}
                                    onChange={(e) => setLng(e.target.value)}
                                    placeholder="100.5018"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    รายการดำเนินงาน ({actionItems.length})
                                </label>
                                <button
                                    type="button"
                                    onClick={handleGenerateAI}
                                    disabled={isGenerating}
                                    className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded-md hover:bg-purple-50 transition-colors disabled:opacity-50"
                                >
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {isGenerating ? 'Gemini กำลังคิด...' : 'ให้ Gemini ช่วยคิด'}
                                </button>
                            </div>
                            <div className="space-y-2">
                                {actionItems.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
                                            value={item}
                                            onChange={(e) => handleActionItemChange(index, e.target.value)}
                                            placeholder={`รายการที่ ${index + 1}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeActionItem(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="ลบรายการ"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addActionItem}
                                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    เพิ่มรายการ
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-4 border-t bg-white shrink-0 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                    >
                        ยกเลิก
                    </button>
                    <button
                        form="edit-form"
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSaving ? 'กำลังบันทึก...' : <><Save className="w-4 h-4" /> {project ? 'บันทึก' : 'สร้างโครงการ'}</>}
                    </button>
                </div>
            </div>
        </div>
    );
}
