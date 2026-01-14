# Implementation Plan - Phase 2: Real Data & Deployment

## Goal Description
พัฒนาต่อยอดจาก Phase 1 โดยการเชื่อมต่อระบบฐานข้อมูลจริง (Firebase Cloud Firestore) เพื่อแทนที่ข้อมูลจำลอง (Mock Data) และนำเว็บไซต์ขึ้นออนไลน์เพื่อให้คนอื่นเข้าชมได้ผ่าน Netlify

## User Review Required
> [!IMPORTANT]
> **Prerequisites (สิ่งที่ต้องเตรียม)**:
> 1. **Firebase Project**: คุณต้องสร้างโปรเจกต์ใน [Firebase Console](https://console.firebase.google.com/)
> 2. **Netlify Account**: คุณต้องมีบัญชี [Netlify](https://www.netlify.com/)
>
> *ไม่ต้องห่วงครับ ผมจะพาทำทีละขั้นตอน*

## Proposed Changes

### 1. Firebase Integration (ระบบฐานข้อมูล)
- [NEW] `src/lib/firebase.ts`: ไฟล์ตั้งค่าเริ่มต้นสำหรับการเชื่อมต่อ Firebase
- [NEW] `src/services/projectService.ts`: สร้าง Data Service สำหรับดึงข้อมูล (Fetch) และอัปเดตข้อมูลจาก Firestore
- [MODIFY] `src/types/project.ts`: ปรับปรุง Type Definition ให้รองรับข้อมูลจาก Firestore (เช่น Timestamp)
- [MODIFY] `src/components/Dashboard/DashboardClient.tsx`: เปลี่ยนการรับข้อมูลให้รองรับ Real-time หรือ Data Fetching แบบใหม่

### 2. Netlify Deployment (การนำขึ้นออนไลน์)
- [NEW] `netlify.toml`: ไฟล์ตั้งค่า Configuration สำหรับสั่งให้ Netlify สร้างเว็บไซต์ Next.js ได้อย่างถูกต้อง
- [Guide] **Environment Variables**: ต้องนำค่าจาก `.env.local` ไปใส่ใน Netlify Dashboard

## Verification Plan
### Automated Tests
- `npm run build`: ต้อง Build ผ่านโดยไม่มี Error ก่อนขึ้น Netlify

### Manual Verification
1. **Data Connection**: ลองแก้ไขข้อมูลใน Firebase Console แล้วหน้าเว็บต้องเปลี่ยนตาม
2. **Live URL**: เว็บไซต์ต้องเข้าได้จากลิงก์ Netlify (เช่น `twilight-glenn.netlify.app`) และใช้งาน Google Maps ได้จริง
