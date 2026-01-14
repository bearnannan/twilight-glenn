'use client';

import { useState } from 'react';
import { Project } from '@/types/project';
import { X, Save } from 'lucide-react';

interface EditProjectModalProps {
    project: Project;
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string | number, data: Partial<Project>) => Promise<void>;
}

export default function EditProjectModal({ project, isOpen, onClose, onSave }: EditProjectModalProps) {
    const [formData, setFormData] = useState<Partial<Project>>({
        title: project.title,
        progress: project.progress,
        locationName: project.locationName,
    });

    // Separate state for complex fields to handle parsing
    const [lat, setLat] = useState(String(project.coordinates.lat));
    const [lng, setLng] = useState(String(project.coordinates.lng));
    const [actionItemsText, setActionItemsText] = useState(project.actionItems.join('\n'));

    const [isSaving, setIsSaving] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const updatedData: Partial<Project> = {
            ...formData,
            coordinates: {
                lat: parseFloat(lat) || project.coordinates.lat,
                lng: parseFloat(lng) || project.coordinates.lng,
            },
            actionItems: actionItemsText.split('\n').filter(item => item.trim() !== ''),
        };

        await onSave(project.id, updatedData);
        setIsSaving(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                    <h3 className="font-bold text-lg">แก้ไขโครงการ</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อโครงการ</label>
                        <input
                            type="text"
                            required
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            รายการดำเนินงาน (Action Items) <span className="text-gray-400 font-normal text-xs">(บรรทัดละ 1 รายการ)</span>
                        </label>
                        <textarea
                            rows={5}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                            value={actionItemsText}
                            onChange={(e) => setActionItemsText(e.target.value)}
                            placeholder="- ติดตั้งเสา&#10;- เดินสายไฟ"
                        />
                    </div>

                    <div className="pt-2 flex justify-end gap-2 border-t mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSaving ? 'กำลังบันทึก...' : <><Save className="w-4 h-4" /> บันทึก</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
