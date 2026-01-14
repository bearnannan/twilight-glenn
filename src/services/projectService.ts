import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { Project } from '@/types/project';
import { PROJECTS } from '@/lib/data';

const COLLECTION_NAME = 'projects';

export const getProjects = async (): Promise<Project[]> => {
    try {
        const querySnapshot = await getDocs(query(collection(db, COLLECTION_NAME), orderBy('id', 'asc')));
        return querySnapshot.docs.map(doc => ({
            id: doc.id, // Ensure ID is from Firestore doc
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

export const updateProject = async (id: string | number, data: Partial<Project>) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, String(id));
        await setDoc(docRef, data, { merge: true }); // Merge checks for existing fields
        return true;
    } catch (error) {
        console.error("Error updating project: ", error);
        return false;
    }
};

export const addProject = async (data: Omit<Project, 'id'>) => {
    try {
        // Use addDoc to let Firestore auto-generate ID, or we can create a custom one.
        // For simplicity and uniqueness, let's use addDoc.
        const docRef = await addDoc(collection(db, COLLECTION_NAME), data);
        return docRef.id;
    } catch (error) {
        console.error("Error adding project: ", error);
        return null;
    }
};

export const deleteProject = async (id: string | number) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, String(id)));
        return true;
    } catch (error) {
        console.error("Error deleting project: ", error);
        return false;
    }
};
