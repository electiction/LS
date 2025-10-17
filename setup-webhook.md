# 🚀 วิธีตั้งค่า Webhook สำหรับรับข้อมูลตำแหน่ง

## 📋 วิธีที่ 1: ใช้ ngrok (แนะนำ - ง่ายที่สุด)

### ขั้นตอนที่ 1: ติดตั้ง ngrok
```bash
# ดาวน์โหลด ngrok จาก https://ngrok.com
# หรือใช้ npm
npm install -g ngrok
```

### ขั้นตอนที่ 2: รัน webhook server
```bash
# รัน webhook server
node webhook.js
```

### ขั้นตอนที่ 3: เปิด ngrok
```bash
# เปิด terminal ใหม่
ngrok http 3000
```

### ขั้นตอนที่ 4: ได้ URL
```
Forwarding    https://abc123.ngrok.io -> http://localhost:3000
```

### ขั้นตอนที่ 5: แก้ไข URL ใน index.html
```javascript
// ในไฟล์ index.html บรรทัด 438
const webhookUrl = 'https://abc123.ngrok.io/webhook/location';
```

## 📋 วิธีที่ 2: ใช้ Heroku (ฟรี)

### ขั้นตอนที่ 1: สร้าง Heroku App
```bash
# ติดตั้ง Heroku CLI
# สร้าง app
heroku create your-app-name
```

### ขั้นตอนที่ 2: แก้ไข package.json
```json
{
  "scripts": {
    "start": "node webhook.js"
  }
}
```

### ขั้นตอนที่ 3: Deploy
```bash
git add .
git commit -m "Add webhook server"
git push heroku main
```

### ขั้นตอนที่ 4: ได้ URL
```
https://your-app-name.herokuapp.com
```

### ขั้นตอนที่ 5: แก้ไข URL ใน index.html
```javascript
// ในไฟล์ index.html บรรทัด 438
const webhookUrl = 'https://your-app-name.herokuapp.com/webhook/location';
```

## 📋 วิธีที่ 3: ใช้ Vercel (ฟรี)

### ขั้นตอนที่ 1: สร้างไฟล์ vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "webhook.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "webhook.js"
    }
  ]
}
```

### ขั้นตอนที่ 2: Deploy
```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### ขั้นตอนที่ 3: ได้ URL
```
https://your-project.vercel.app
```

### ขั้นตอนที่ 4: แก้ไข URL ใน index.html
```javascript
// ในไฟล์ index.html บรรทัด 438
const webhookUrl = 'https://your-project.vercel.app/webhook/location';
```

## 🎯 วิธีใช้งาน:

### 1. ตั้งค่า webhook
```
1. เลือกวิธีที่ 1, 2, หรือ 3
2. ได้ URL ของ webhook
3. แก้ไข URL ใน index.html
4. อัปโหลดไฟล์ใหม่
```

### 2. ทดสอบระบบ
```
1. เปิดลิงก์: https://electiction.github.io/LS
2. อนุญาตการเข้าถึงตำแหน่ง
3. กดปุ่ม "ส่งตำแหน่งให้เรา"
4. ดูข้อมูลใน Dashboard
```

### 3. ดูข้อมูล
```
1. เปิด Dashboard: https://your-webhook-url.com/dashboard
2. ดูข้อมูลตำแหน่งแบบ real-time
3. Export ข้อมูลเป็น JSON file
```

## 📊 API Endpoints:

- `POST /webhook/location` - รับข้อมูลตำแหน่ง
- `GET /api/locations` - ดูข้อมูลทั้งหมด
- `GET /api/latest` - ดูข้อมูลล่าสุด
- `DELETE /api/locations` - ลบข้อมูลทั้งหมด
- `GET /dashboard` - หน้า Dashboard

## ⚠️ ข้อควรระวัง:

- ใช้ HTTPS เพื่อความปลอดภัย
- เก็บข้อมูลในฐานข้อมูลจริง (ไม่ใช่ไฟล์)
- ใส่ authentication สำหรับ Dashboard
- จำกัดการเข้าถึง API

## 🔧 วิธีปรับแต่ง:

### เปลี่ยนไฟล์เก็บข้อมูล
```javascript
// ในไฟล์ webhook.js
const dataFile = path.join(__dirname, 'your-data-file.json');
```

### เปลี่ยน port
```javascript
// ในไฟล์ webhook.js
const port = 3001; // เปลี่ยนเป็น port ที่ต้องการ
```

### เปลี่ยน Dashboard
```javascript
// ในไฟล์ webhook.js
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'your-dashboard.html'));
});
```
