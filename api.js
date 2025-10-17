// API สำหรับรับข้อมูลตำแหน่ง
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// เก็บข้อมูลตำแหน่ง
let locationData = [];

// Middleware
app.use(cors());
app.use(express.json());

// รับข้อมูลตำแหน่ง
app.post('/api/location', (req, res) => {
    const location = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        accuracy: req.body.accuracy,
        userAgent: req.body.userAgent,
        url: req.body.url,
        ip: req.ip || req.connection.remoteAddress
    };
    
    locationData.push(location);
    
    console.log('📍 รับข้อมูลตำแหน่งใหม่:', location);
    
    res.json({
        success: true,
        message: 'รับข้อมูลตำแหน่งเรียบร้อย',
        data: location
    });
});

// ดึงข้อมูลตำแหน่งทั้งหมด
app.get('/api/locations', (req, res) => {
    res.json({
        success: true,
        count: locationData.length,
        data: locationData
    });
});

// ดึงข้อมูลตำแหน่งล่าสุด
app.get('/api/latest', (req, res) => {
    const latest = locationData[locationData.length - 1];
    res.json({
        success: true,
        data: latest
    });
});

// ลบข้อมูลตำแหน่ง
app.delete('/api/locations', (req, res) => {
    locationData = [];
    res.json({
        success: true,
        message: 'ลบข้อมูลทั้งหมดเรียบร้อย'
    });
});

app.listen(port, () => {
    console.log(`🚀 API Server ทำงานที่ http://localhost:${port}`);
    console.log(`📍 รับข้อมูลตำแหน่ง: POST /api/location`);
    console.log(`📊 ดูข้อมูลทั้งหมด: GET /api/locations`);
    console.log(`🔄 ดูข้อมูลล่าสุด: GET /api/latest`);
});
