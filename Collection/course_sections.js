// course_sections.js
use("mju_grade_release");

db.course_sections.insertMany([
  {
    "_id": "SEC_CS301_2567_1_01", // รหัสกลุ่มเรียน (วิชา_ปี_เทอม_กลุ่ม)
    "courseId": "CS301",
    "courseName": "Data Modeling",
    "section": 1,
    "year": 2567,
    "term": 1,
    "credit": 3,
    "instructor": {
      "name": "อ.สมหมาย ใจเย็น",
      "email": "sommai_j@mju.ac.th"
    },
    // ข้อมูลตารางเรียน (ใช้แสดง "ตารางเรียนของฉัน")
    "schedule": [
      { "day": "Mon", "time": "09:00-12:00", "room": "COM101" }
    ],
    // รายชื่อนักศึกษา (ใช้แสดง "รายชื่อนักศึกษาของอาจารย์")
    "enrolledStudents": [
      { 
        "studentId": "66010001", 
        "name": "นายสมชาย ใจดี", 
        "email": "somchai_j@mju.ac.th",
        "majorCode": "CS"
      },
      { 
        "studentId": "66010002", 
        "name": "นางสาวสมหญิง ใจงาม", 
        "email": "somying_j@mju.ac.th",
        "majorCode": "CS"
      }
    ]
  }
  // สามารถเพิ่มข้อมูลกลุ่มเรียนอื่นๆ (SEC_CS201, SEC_GE101) ได้ในรูปแบบนี้
]);

// Indexes
db.course_sections.createIndex({ "enrolledStudents.studentId": 1 }); // เพื่อดึงตารางเรียนรายคน
db.course_sections.createIndex({ "year": 1, "term": 1 });