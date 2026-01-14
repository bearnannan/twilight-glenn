'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Project } from '@/types/project';
import { useState, useRef, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 14.0,
    lng: 99.5
};

interface MapSectionProps {
    projects: Project[];
    selectedProjectId: string | number | null;
    onSelectProject: (id: string | number) => void;
}

export default function MapSection({ projects, selectedProjectId, onSelectProject }: MapSectionProps) {
    const mapRef = useRef<google.maps.Map | null>(null);

    // Pan to selected project
    useEffect(() => {
        if (selectedProjectId && mapRef.current) {
            const project = projects.find(p => p.id === selectedProjectId);
            if (project?.coordinates) {
                mapRef.current.panTo(project.coordinates);
                mapRef.current.setZoom(12);
            }
        }
    }, [selectedProjectId, projects]);

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map;
    };

    const getMarkerIcon = (progress: number, isSelected: boolean) => {
        // Base URL for markers
        const baseUrl = "http://maps.google.com/mapfiles/ms/icons";
        if (isSelected) return `${baseUrl}/blue-dot.png`; // Highlight color
        return progress >= 50
            ? `${baseUrl}/green-dot.png`
            : `${baseUrl}/orange-dot.png`;
    };

    return (
        <div className="w-full h-full relative bg-gray-200">
            <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={defaultCenter}
                    zoom={9}
                    onLoad={onLoad}
                    options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: false,
                    }}
                >
                    {projects.map((project) => (
                        <Marker
                            key={project.id}
                            position={project.coordinates}
                            title={project.title}
                            onClick={() => onSelectProject(project.id)}
                            icon={getMarkerIcon(project.progress, selectedProjectId === project.id)}
                            animation={selectedProjectId === project.id ? google.maps.Animation.BOUNCE : undefined}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-white p-3 rounded-lg shadow-lg z-10 text-xs space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>ที่เลือก (Selected)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>ก้าวหน้า {'>'} 50%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span>ก้าวหน้า {'<'} 50%</span>
                </div>
            </div>


        </div>
    );
}
