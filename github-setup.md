# 🚀 วิธีอัปโหลดขึ้น GitHub (ทีละขั้นตอน)

## ขั้นตอนที่ 1: สร้าง Repository บน GitHub
1. ไปที่ [github.com](https://github.com)
2. กดปุ่ม **"New"** หรือ **"+"** มุมขวาบน
3. ตั้งชื่อ Repository: `location-share`
4. เลือก **"Public"** (สำคัญ!)
5. **ไม่ต้อง** เลือก "Add a README file"
6. กด **"Create repository"**

## ขั้นตอนที่ 2: เชื่อมต่อกับ Repository
หลังจากสร้าง repository แล้ว GitHub จะแสดงคำสั่ง ให้คัดลอกคำสั่งเหล่านี้:

```bash
git remote add origin https://github.com/[username]/location-share.git
git branch -M main
git push -u origin main
```

## ขั้นตอนที่ 3: อัปโหลดไฟล์
รันคำสั่งเหล่านี้ใน terminal:

```bash
git remote add origin https://github.com/[username]/location-share.git
git branch -M main
git push -u origin main
```

## ขั้นตอนที่ 4: เปิด GitHub Pages
1. ไปที่ **"Settings"** ใน repository
2. เลื่อนลงหา **"Pages"** ในเมนูซ้าย
3. Source: เลือก **"Deploy from a branch"**
4. Branch: เลือก **"main"**
5. Folder: เลือก **"/ (root)"**
6. กด **"Save"**

## ขั้นตอนที่ 5: รอลิงก์
1. รอ 1-2 นาที
2. กลับไปที่ **"Pages"** อีกครั้ง
3. จะเห็นลิงก์สีเขียว: `https://[username].github.io/location-share`
4. **คัดลอกลิงก์นี้** - นี่คือลิงก์จริง!

## 🎯 วิธีทดสอบ
1. เปิดลิงก์ในเบราว์เซอร์
2. อนุญาตการเข้าถึงตำแหน่ง
3. ควรเห็นหน้าแอปแสดงตำแหน่ง

## ⚠️ หากยังไม่ได้
- รอสักครู่ (GitHub Pages ใช้เวลาสร้าง)
- ตรวจสอบว่า repository เป็น Public
- ลองรีเฟรชหน้าเว็บ
