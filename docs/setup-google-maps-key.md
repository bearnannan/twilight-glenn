# วิธีขอ Google Maps API Key (สำหรับมือใหม่)

จากรูปภาพที่คุณส่งมา คุณอยู่ในหน้า **Google Cloud Console** แล้ว ให้ทำตามขั้นตอนดังนี้ครับ:

![Referenced Screenshot](file:///C:/Users/WATCHARA%20MANADEE/.gemini/antigravity/brain/1d76aa8e-b90c-48df-a100-c525af1f7fe7/uploaded_image_1768324206662.png)

## ขั้นตอนที่ 1: เข้าสู่ Google Maps Platform
1. แนะนำให้คลิกการ์ด **"Embed maps"** (Google Maps Platform) ที่มุมขวาล่าง หรือ
2. พิมพ์ในช่องค้นหาด้านบนว่า **"Google Maps Platform"** แล้วกดเลือก

## ขั้นตอนที่ 2: สร้าง Key
1. ที่เมนูด้านซ้าย เลือก **Credentials** (หรือ "ข้อมูลรับรอง")
2. คลิกปุ่ม **+ CREATE CREDENTIALS** ด้านบน
3. เลือก **API key**
4. ระบบจะแสดงรหัสยาวๆ มาให้ นั่นคือ **API Key** ของคุณ!

## ขั้นตอนแทรก: การจำกัดสิทธิ์ (Restrict Key) - ตามรูปที่คุณส่งมา
หากเจอหน้าต่าง **"Protect your API key"**:
1. ตรง **Select restriction type** ให้เลือก **Websites**
2. ตรงช่อง **Referrer** ให้ใส่:
   ```
   http://localhost:3000/*
   ```
   (อันนี้เพื่อให้เราทดสอบบนเครื่องตัวเองได้)
3. กดปุ่ม **Restrict key** ปุ่มสีน้ำเงินด้านล่าง

> หมายเหตุ: หากภายหลังนำขึ้นเว็บจริง (Netlify) ต้องกลับมาเพิ่มโดเมนใหม่ด้วยนะครับ
*สำคัญมาก* ถ้าไม่เปิด API ตัวนี้ แผนที่จะไม่ขึ้น
1. ไปที่เมนูด้านซ้าย เลือก **APIs & Services** > **Library**
2. ค้นหาคำว่า **"Maps JavaScript API"**
3. คลิกเข้าไปแล้วกดปุ่ม **ENABLE** (เปิดใช้งาน)

## ขั้นตอนที่ 4: นำ Key มาใส่ในโปรเจกต์
กลับไปที่โปรแกรม VS Code:
1. เปิดไฟล์ `.env.local`
2. วาง Key ที่ได้ด่อท้าย `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=`

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD..........................
```
(ตัวอย่าง Key จะขึ้นต้นด้วย `AIza`)
