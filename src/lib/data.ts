import { Project } from '@/types/project';

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "ติดตั้งเสาสัญญาณ 60 เมตร (Repeater)",
        locationName: "ที่ว่าการอำเภอห้วยกระเจา จ.กาญจนบุรี",
        coordinates: { lat: 14.334, lng: 99.6 }, // Approximate location for Huai Krachao
        progress: 80,
        startDate: "6 ม.ค. 2569",
        imageUrl: "/images/tower1.jpg", // Placeholder, will need real or placeholder images
        actionItems: [
            "ตรวจสอบพื้นที่หน้างาน",
            "ติดตั้งฐานราก",
            "ประกอบโครงเสา",
            "ติดตั้งอุปกรณ์ Repeater",
            "ทดสอบสัญญาณ"
        ]
    },
    {
        id: 2,
        title: "ติดตั้งเสาสัญญาณ 60 เมตร (Base Station)",
        locationName: "อบต.หนองนกแก้ว จ.กาญจนบุรี",
        coordinates: { lat: 14.2, lng: 99.5 }, // Approximate location
        progress: 80,
        startDate: "7 ม.ค. 2569",
        imageUrl: "/images/tower2.jpg",
        actionItems: [
            "สำรวจ Soil Test",
            "งานเทคอนกรีตฐานราก",
            "ติดตั้งระบบ Grounding",
            "Erection Tower",
            "Commissioning"
        ]
    },
    {
        id: 3,
        title: "Construction of Foundation",
        locationName: "Site No. 3, Kanchanaburi",
        coordinates: { lat: 14.1, lng: 99.4 },
        progress: 20,
        startDate: "12 ม.ค. 2569",
        imageUrl: "/images/foundation.jpg",
        actionItems: [
            "Excavation",
            "Rebar installation",
            "Formwork",
            "Pouring concrete",
            "Curing"
        ]
    }
];

export const fetchProjects = async (): Promise<Project[]> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return PROJECTS;
};
