import Header from '@/components/Dashboard/Header';
import DashboardClient from '@/components/Dashboard/DashboardClient';
import { fetchProjects } from '@/lib/data';

export default async function Home() {
    const projects = await fetchProjects();

    return (
        <main className="h-screen w-full flex flex-col bg-gray-100 overflow-hidden">
            <Header />
            <DashboardClient initialProjects={projects} />
        </main>
    );
}
