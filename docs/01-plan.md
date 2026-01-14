# Implementation Plan - Project Tracking Dashboard

## Goal Description
สร้าง Dashboard ติดตามความคืบหน้าโครงการก่อสร้าง โดยแสดงข้อมูลโครงการบนแผนที่ (Google Maps) และรายการโครงการด้านข้าง (Sidebar)

## Current Status (สถานะปัจจุบัน)
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS, Font (Inter + Kanit)
- **Components**:
  - `Sidebar`: แสดงรายการโครงการ (Mock Data)
  - `MapSection`: แสดง Google Map พร้อม Marker
- **Data**: Mock data ใน `src/lib/data.ts`

## User Review Required (สิ่งที่ต้องพิจารณา)
> [!IMPORTANT]
> **API Key Safety**: ปัจจุบันมีการใช้ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` ใน `MapSection.tsx` ซึ่งเป็น Client Component
> ตามกฎ API Security:
> 1. หากใช้แค่แสดง Map (Maps JavaScript API) -> `NEXT_PUBLIC_` ยอมรับได้ (ควรจำกัด HTTP Referrer ใน Google Cloud Console)
> 2. หากมีการใช้ Places service หรือ Geocoding -> ต้องทำ Proxy ผ่าน API Route

## Proposed Changes (แผนการทำงาน)

### 1. Documentation & Setup
- [NEW] `docs/01-plan.md`: สร้างไฟล์แผนงานฉบับนี้
- [NEW] `.env.local`: ตรวจสอบการตั้งค่า Environment Variables

### 2. Feature Refinement
- **Interactive Map**:
  - คลิกที่ Card ใน Sidebar -> Map เลื่อนไปที่ตำแหน่งโครงการ (PanTo)
  - คลิกที่ Marker บน Map -> Highlight Card ใน Sidebar
- **UI/UX**:
  - ปรับแต่ง Marker Icon ตามสถานะ (Progress)
  - ตรวจสอบการแสดงผลภาษาไทย (Font Kanit)

### 3. Cleanup & Optimization
- Refactor `MapSection` ให้รับ `selectedProject` state
- Move logic ไปที่ `DashboardPage` (Parent Component) เพื่อจัดการ State ระหว่าง Sidebar และ Map

## Verification Plan
### Automated Tests
- `npm run build`: ตรวจสอบว่า Build ผ่านโดยไม่มี Error
- `npm run lint`: ตรวจสอบ Code Quality

### Manual Verification
- เปิดหน้าเว็บและทดสอบคลิกที่รายการโครงการ ตรวจสอบว่าแผนที่เลื่อนไปตำแหน่งที่ถูกต้อง
- ตรวจสอบการแสดงผล Marker บนแผนที่
