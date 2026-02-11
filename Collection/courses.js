use("mju_grade_release");
db.courses.insertMany([
{
  "_id": "",                // รหัสวิชา
  "courseName": "",         // ชื่อวิชา
  "credit": 0,              // หน่วยกิต
  "facultyCode": "",        // รหัสคณะ
  "yearLevelAllowed": 0,    // ชั้นปีที่อนุญาตให้ลงทะเบียน
  "instructor": {           // ข้อมูลอาจารย์ผู้สอน (Object)
    "name": "",             // ชื่ออาจารย์
    "email": ""             // อีเมลอาจารย์
  },
  "students": [             // รายชื่อนักศึกษา (Array of Objects)
    {
      "studentId": "",      // รหัสนักศึกษา
      "name": "",           // ชื่อ-นามสกุลนักศึกษา
      "email": "",          // อีเมลนักศึกษา
      "majorCode": ""       // รหัสสาขาวิชา
    }
  ]
}])
// กำหนดฐานข้อมูลเป้าหมาย
use("mju_grade_release");

// เพิ่มข้อมูลรายวิชา (Courses) ทั้งหมด 5 รายการ
db.courses.insertMany([
  {
    // ใช้รหัสวิชาเป็น Primary Key เพื่อความสะดวกในการค้นหา
    "_id": "CS301", 
    "courseName": "Data Modeling", 
    "credit": 3, 
    "facultyCode": "SCI", 
    "yearLevelAllowed": 3, 
    // ข้อมูลผู้สอนหลักของรายวิชา
    "instructor": { "name": "อ.สมหมาย ใจเย็น", "email": "sommai_j@mju.ac.th" },
    // รายชื่อนักศึกษาที่สังกัดในวิชานี้ (ใช้สำหรับดึงข้อมูลภาพรวมของวิชา)
    "students": [
      { "studentId": "66010001", "name": "นายสมชาย ใจดี", "email": "somchai_j@mju.ac.th", "majorCode": "CS" },
      { "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม", "email": "somying_j@mju.ac.th", "majorCode": "CS" }
    ]
  },
  {
    "_id": "CS201", 
    "courseName": "Database Systems", 
    "credit": 3, 
    "facultyCode": "SCI", 
    "yearLevelAllowed": 2, 
    "instructor": { "name": "อ.มานะ ขยันสอน", "email": "mana_k@mju.ac.th" },
    "students": [{ "studentId": "66010004", "name": "นางสาวอรทัย ขยันดี", "majorCode": "DS" }]
  },
  {
    "_id": "IT301", 
    "courseName": "Information Systems", 
    "credit": 3, 
    "facultyCode": "ENG", 
    "yearLevelAllowed": 3, 
    "instructor": { "name": "อ.วิทย์ ไอที", "email": "wit_it@mju.ac.th" },
    "students": [] // กรณีที่ยังไม่มีนักศึกษาลงทะเบียน
  },
  {
    "_id": "GE101", 
    "courseName": "Thai Society", 
    "credit": 2, 
    "facultyCode": "GEN", 
    "yearLevelAllowed": 1, 
    "instructor": { "name": "อ.สังคม รักษ์ไทย", "email": "sangkom@mju.ac.th" },
    "students": []
  },
  {
    "_id": "MA101", 
    "courseName": "Calculus I", 
    "credit": 3, 
    "facultyCode": "SCI", 
    "yearLevelAllowed": 1, 
    "instructor": { "name": "ดร.เลข คำนวณ", "email": "lek_k@mju.ac.th" },
    "students": []
  }
]);
db.courses.createIndex({ _id: 1 });             // ค้นหาด้วยรหัสวิชา (ความเร็วสูงสุด)
db.courses.createIndex({ facultyCode: 1 });      // ค้นหาตามคณะเพื่อทำรายงาน
db.courses.createIndex({ "students.studentId": 1 }); // ค้นหาว่านักศึกษาคนนี้ลงเรียนวิชาหลักตัวไหนบ้าง
//ดึงรายชื่อและอีเมลนักศึกษาในวิชา Data Modeling เพื่อส่งข่าวสาร
db.courses.find({ _id: "CS301" }, { courseName: 1, "students.name": 1, "students.email": 1 });

 //ค้นหาวิชาเลือกในคณะวิทยาศาสตร์ที่เด็กปี 3 สามารถลงเรียน
 db.courses.find({ facultyCode: "SCI", yearLevelAllowed: 3 });

 //เพิ่มนักศึกษาใหม่เข้าไปในรายวิชา (Update Array)
 db.courses.updateOne(
  { _id: "MA101" },
  { $push: { students: { studentId: "66019999", name: "เด็กใหม่ เรียนดี", majorCode: "CS" } } }
);