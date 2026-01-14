export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Project {
    id: string | number;
    title: string;
    locationName: string;
    coordinates: Coordinates;
    progress: number; // 0-100
    startDate: string;
    imageUrl: string;
    actionItems: string[];
}
