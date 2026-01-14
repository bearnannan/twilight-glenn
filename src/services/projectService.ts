import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, setDoc } from 'firebase/firestore';
import { Project } from '@/types/project';
import { PROJECTS } from '@/lib/data';

const COLLECTION_NAME = 'projects';

export const getProjects = async (): Promise<Project[]> => {
    try {
        const querySnapshot = await getDocs(query(collection(db, COLLECTION_NAME), orderBy('id', 'asc')));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Project));
    } catch (error) {
        console.error("Error getting projects: ", error);
        return []; // Return empty if error
    }
};

export const seedProjects = async () => {
    try {
        const promises = PROJECTS.map(project => {
            // Use project.id as the document ID for easier reference
            return setDoc(doc(db, COLLECTION_NAME, String(project.id)), project);
        });
        await Promise.all(promises);
        console.log("Seeding complete!");
        return true;
    } catch (error) {
        console.error("Error seeding projects: ", error);
        return false;
    }
};
