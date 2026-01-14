import { Project } from '@/types/project';
import Image from 'next/image';
import { ChevronDown, Calendar, MapPin } from 'lucide-react';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const isHighProgress = project.progress >= 50;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Header Image */}
            <div className="relative h-32 w-full">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                {/* Progress Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${isHighProgress ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {/* Simple dot */}
                    <div className={`w-2 h-2 rounded-full ${isHighProgress ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                    {project.progress}%
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-2 left-3 right-3 text-white">
                    <div className="flex items-center gap-1 text-[10px] opacity-80 mb-0.5">
                        <Calendar className="w-3 h-3" />
                        <span>เริ่ม: {project.startDate}</span>
                    </div>
                    <h3 className="font-bold text-sm leading-tight line-clamp-2">{project.title}</h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <div className="flex items-start gap-2 mb-3 text-gray-500 text-xs">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{project.locationName}</span>
                </div>

                {/* Action Items Accordion */}
                <details className="group border-t border-gray-100 pt-2">
                    <summary className="flex items-center justify-between cursor-pointer list-none text-xs font-medium text-gray-600 hover:text-blue-600 transition-colors">
                        <span>รายการดำเนินงาน ({project.actionItems.length})</span>
                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <ul className="mt-2 space-y-1 pl-4 border-l-2 border-gray-100 ml-1">
                        {project.actionItems.map((item, idx) => (
                            <li key={idx} className="text-xs text-gray-500">{item}</li>
                        ))}
                    </ul>
                </details>
            </div>
        </div>
    );
}
