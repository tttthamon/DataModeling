use("mju_grade_release");

db.students.insertMany([
{
  "_id": "",                // รหัสนักศึกษา (Primary Key)
  "name": "",               // ชื่อ-นามสกุลนักศึกษา
  "email": "",              // อีเมลมหาวิทยาลัย
  "phone": "",              // เบอร์โทรศัพท์ติดต่อ
  "facultyCode": "",        // รหัสคณะ
  "facultyName": "",        // ชื่อคณะ
  "majorCode": "",          // รหัสสาขาวิชา
  "majorName": "",          // ชื่อสาขาวิชา
  "gpax": 0.0,              // เกรดเฉลี่ยสะสม (GPAX)
  "status": "",             // สถานะนักศึกษา (เช่น ปกติ)
  "academicHistory": [      // ประวัติการเรียนแยกตามเทอม (Array of Objects)
    {
      "year": 0,            // ปีการศึกษา
      "term": "",           // ภาคเรียน
      "courses": [          // รายการวิชาที่เรียนในเทอมนั้น (Nested Array)
        {
          "courseId": "",   // รหัสวิชา
          "courseName": "", // ชื่อวิชา
          "credit": 0,      // หน่วยกิต
          "grade": "",      // เกรดที่ได้
          "point": 0.0,     // แต้มคะแนน
          "status": ""      // สถานะรายวิชา
        }
      ]
    }
  ]
}])
// students.js
// เลือกใช้งานฐานข้อมูลที่กำหนด
use("mju_grade_release");

// เพิ่มข้อมูลโปรไฟล์นักศึกษา (Students) ทั้งหมด 5 รายการ
db.students.insertMany([
  {
    // กำหนดรหัสนักศึกษาเป็น ID หลัก
    "_id": "66010001",
    "name": "นายสมชาย ใจดี",
    "email": "somchai_j@mju.ac.th",
    "phone": "081-234-5678",
    "facultyCode": "AG",
    "facultyName": "ผลิตกรรมการเกษตร",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "gpax": 3.42,
    "status": "ปกติ",
    // ประวัติการศึกษา (Embedded Documents) เก็บเป็นรายปีและเทอม
    "academicHistory": [
      {
        "year": 2567,
        "term": "1",
        // รายการวิชาที่เรียนในเทอมนั้นๆ เพื่อใช้แสดงผล Transcript รายบุคคล
        "courses": [
          { "courseId": "CS101", "courseName": "Intro to CS", "credit": 3, "grade": "A", "point": 4.0, "status": "ปกติ" },
          { "courseId": "MA101", "courseName": "Calculus I", "credit": 3, "grade": "C+", "point": 2.5, "status": "ปกติ" },
          { "courseId": "GE101", "courseName": "Thai Society", "credit": 2, "grade": "B", "point": 3.0, "status": "ปกติ" }
        ]
      }
    ]
  },
  {
    "_id": "66010002",
    "name": "นางสาวสมหญิง ใจงาม",
    "email": "somying_j@mju.ac.th",
    "phone": "082-345-6789",
    "facultyCode": "AG",
    "facultyName": "ผลิตกรรมการเกษตร",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "gpax": 3.10,
    "status": "ปกติ",
    "academicHistory": [] // กรณีนักศึกษาใหม่ที่ยังไม่มีประวัติการเรียนสะสม
  },
  {
    "_id": "66010003",
    "name": "นายอนันต์ ตั้งใจ",
    "email": "anan_t@mju.ac.th",
    "phone": "083-456-7890",
    "facultyCode": "ENG",
    "facultyName": "วิศวกรรมศาสตร์",
    "majorCode": "IT",
    "majorName": "เทคโนโลยีสารสนเทศ",
    "gpax": 2.95,
    "status": "ปกติ",
    "academicHistory": []
  },
  {
    "_id": "66010004",
    "name": "นางสาวอรทัย ขยันดี",
    "email": "orathai_k@mju.ac.th",
    "phone": "084-567-8901",
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "DS",
    "majorName": "วิทยาการข้อมูล",
    "gpax": 3.60,
    "status": "ปกติ",
    "academicHistory": []
  },
  {
    "_id": "66010005",
    "name": "นายปกรณ์ มุ่งมั่น",
    "email": "pakorn_m@mju.ac.th",
    "phone": "085-678-9012",
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "gpax": 3.80,
    "status": "ปกติ",
    "academicHistory": []
  }
]);
// ค้นหาจากรหัสนักศึกษา (Primary Key)
db.students.createIndex({ "_id": 1 });

// ค้นหาตามสังกัด เพื่อทำรายงานสถิตินักศึกษาแยกตามคณะและสาขา
db.students.createIndex({ "facultyCode": 1, "majorCode": 1 });

//ค้นหาประวัตินักศึกษาจากรหัส (Simple Query) ใช้สำหรับหน้า Profile
db.students.findOne({ "_id": "66010001" });
//ค้นหานักศึกษาที่มีผลการเรียนดี (Filter Query) ใช้สำหรับดึงรายชื่อนักศึกษาเกียรตินิยม หรือผู้ที่ได้ GPAX 3.50 ขึ้นไป
db.students.find({ "gpax": { $gte: 3.50 } }, { name: 1, gpax: 1 });
//ค้นหานักศึกษาแยกตามคณะ (Grouping) ใช้ตรวจสอบจำนวนนักศึกษาในคณะวิทยาศาสตร์ (SCI)
db.students.find({ "facultyCode": "SCI" }).count();