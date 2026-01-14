import type { Metadata } from 'next';
import { Inter, Kanit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const kanit = Kanit({
    weight: ['300', '400', '500', '700'],
    subsets: ['thai', 'latin'],
    variable: '--font-kanit'
});

export const metadata: Metadata = {
    title: 'Project Progress Tracker',
    description: 'Track construction project progress',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="th">
            <body className={`${inter.variable} ${kanit.variable} font-sans`}>{children}</body>
        </html>
    );
}
