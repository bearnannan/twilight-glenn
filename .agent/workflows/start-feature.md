---
description: สั่งให้ AI วางแผนการทำงานเป็นภาษาไทยแบบละเอียด ก่อนเริ่มเขียนโค้ด
---

Context: The user (beginner) wants to start a new feature.
Task: Create a step-by-step **Implementation Plan in Thai**.

Output Structure:
1. **เตรียมของ (Setup):**
   - ต้องสมัคร API อะไรบ้าง (แปะลิงก์ Google Console/Firebase Console)
   - ต้องเพิ่มค่าอะไรใน `.env.local` (แยก Public/Private ให้ชัดเจน)
2. **หลังบ้าน (Server-Side / API Proxy):**
   - ออกแบบไฟล์ `src/app/api/[name]/route.ts`
   - อธิบายเหตุผลว่าทำไมต้องสร้างไฟล์นี้ (เพื่อความปลอดภัย)
3. **หน้าบ้าน (Client-Side / UI):**
   - ออกแบบ Component และ State (Loading/Error)
   - แนวทางการใช้ `fetch` เรียก API ของเราเอง
4. **สิ่งที่ต้องรู้ (Tips):**
   - ข้อควรระวังสำหรับมือใหม่