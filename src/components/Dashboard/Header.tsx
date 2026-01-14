import { MapPin, BarChart3 } from 'lucide-react';

export default function Header() {
    const today = new Date().toLocaleDateString('th-TH', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-[#1a233a] text-white z-50 px-4 flex items-center justify-between shadow-md">
            {/* Left Section: Logo & Title */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    {/* Logo Placeholder */}
                    <MapPin className="text-white w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-lg font-bold leading-tight">ระบบติดตามความก้าวหน้าโครงการ</h1>
                    <p className="text-xs text-gray-400">ศสส.ปค.เขต 11 (เพชรบุรี) | ประจำวันที่ {today}</p>
                </div>
            </div>

            {/* Right Section: Summary Stats */}
            <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                    <p className="text-gray-400 text-xs uppercase">โครงการทั้งหมด</p>
                    <p className="font-bold text-orange-400 text-lg">3 สถานี</p>
                </div>
                <div className="h-8 w-px bg-gray-700"></div>
                <div className="text-right">
                    <div className="flex items-center gap-1 justify-end">
                        <span className="text-gray-400 text-xs uppercase">สถานะเฉลี่ย</span>
                    </div>
                    <p className="font-bold text-green-400 text-lg">60%</p>
                </div>
            </div>
        </header>
    );
}
