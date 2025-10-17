// Webhook สำหรับรับข้อมูลตำแหน่ง
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// ไฟล์เก็บข้อมูล
const dataFile = path.join(__dirname, 'location-data.json');

// รับข้อมูลตำแหน่ง
app.post('/webhook/location', (req, res) => {
    try {
        const locationData = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            ...req.body
        };
        
        // อ่านข้อมูลเก่า
        let existingData = [];
        if (fs.existsSync(dataFile)) {
            const fileContent = fs.readFileSync(dataFile, 'utf8');
            existingData = JSON.parse(fileContent);
        }
        
        // เพิ่มข้อมูลใหม่
        existingData.push(locationData);
        
        // บันทึกข้อมูล
        fs.writeFileSync(dataFile, JSON.stringify(existingData, null, 2));
        
        console.log('📍 รับข้อมูลตำแหน่งใหม่:', locationData);
        
        res.json({
            success: true,
            message: 'รับข้อมูลตำแหน่งเรียบร้อย',
            data: locationData
        });
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
        });
    }
});

// ดึงข้อมูลทั้งหมด
app.get('/api/locations', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            const fileContent = fs.readFileSync(dataFile, 'utf8');
            const data = JSON.parse(fileContent);
            res.json({
                success: true,
                count: data.length,
                data: data
            });
        } else {
            res.json({
                success: true,
                count: 0,
                data: []
            });
        }
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอ่านข้อมูล'
        });
    }
});

// ดึงข้อมูลล่าสุด
app.get('/api/latest', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            const fileContent = fs.readFileSync(dataFile, 'utf8');
            const data = JSON.parse(fileContent);
            const latest = data[data.length - 1];
            res.json({
                success: true,
                data: latest
            });
        } else {
            res.json({
                success: true,
                data: null
            });
        }
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการอ่านข้อมูล'
        });
    }
});

// ลบข้อมูลทั้งหมด
app.delete('/api/locations', (req, res) => {
    try {
        if (fs.existsSync(dataFile)) {
            fs.unlinkSync(dataFile);
        }
        res.json({
            success: true,
            message: 'ลบข้อมูลทั้งหมดเรียบร้อย'
        });
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
        res.status(500).json({
            success: false,
            message: 'เกิดข้อผิดพลาดในการลบข้อมูล'
        });
    }
});

// หน้า Dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.listen(port, () => {
    console.log(`🚀 Webhook Server ทำงานที่ http://localhost:${port}`);
    console.log(`📍 รับข้อมูลตำแหน่ง: POST /webhook/location`);
    console.log(`📊 ดูข้อมูลทั้งหมด: GET /api/locations`);
    console.log(`🔄 ดูข้อมูลล่าสุด: GET /api/latest`);
    console.log(`📈 Dashboard: http://localhost:${port}/dashboard`);
});
