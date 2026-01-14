# Implementation Plan - Phase 3: Editable Data (แก้ไขข้อมูลหน้าเว็บ)

## Goal Description
เพิ่มฟีเจอร์ให้ผู้ใช้สามารถแก้ไขข้อมูลโครงการ (ชื่อ, ความคืบหน้า, รายละเอียด) ได้โดยตรงจากหน้าเว็บไซต์ และบันทึกข้อมูลลง Firebase Real-time

## User Review Required
> [!NOTE]
> **Authentication (ระบบล็อกอิน)**: ปกติการแก้ไขข้อมูลควรมีระบบล็อกอินแอดมิน แต่ใน Phase นี้เพื่อความรวดเร็ว ผมจะทำเป็น **"แก้ไขได้เลย (Public Edit)"** ไปก่อนนะครับ (หรือถ้าอยากให้ใส่รหัสผ่านง่ายๆ บอกได้ครับ)

## Proposed Changes

### 1. Data Service (ระบบหลังบ้าน)
- [MODIFY] `src/services/projectService.ts`: เพิ่มฟังก์ชัน `updateProject(id, data)` สำหรับส่งข้อมูลไปแก้ใน Firestore

### 2. UI Components (หน้าจอ)
- [NEW] `src/components/Dashboard/EditProjectModal.tsx`: สร้าง Dialog/Modal สำหรับกรอกข้อมูลแก้ไข
- [MODIFY] `src/components/Dashboard/ProjectCard.tsx`: เพิ่มปุ่ม "แก้ไข" (รูปดินสอ)
- [MODIFY] `src/components/Dashboard/DashboardClient.tsx`: เชื่อมต่อ Modal กับการทำงานจริง (State Management)

## Verification Plan
### Manual Verification
1.  กดปุ่มแก้ไขที่การ์ดโครงการ
2.  ลองเปลี่ยนชื่อหรือความคืบหน้า (Progress)
3.  กดบันทึก -> หน้าเว็บต้องเปลี่ยนทันที
4.  รีเฟรชหน้าเว็บ -> ค่าต้องยังอยู่ (ตรวจสอบว่าลง Database จริง)
