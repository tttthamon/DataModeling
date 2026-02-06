// courses.js
use("mju_grade_release");

db.courses.insertMany([
  {
    "_id": "CS301",
    "courseName": "Data Modeling",
    "credit": 3,
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "yearLevelAllowed": 3,
    // เพิ่มข้อมูลผู้สอนเพื่อให้ข้อมูลสมบูรณ์
    "instructor": {
      "name": "อ.สมหมาย ใจเย็น",
      "email": "sommai_j@mju.ac.th"
    },
    // ปรับปรุงรายชื่อนักศึกษาให้มีอีเมลและรหัสสาขาเพื่อให้อาจารย์ติดต่อได้ง่าย
    "students": [
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
      },
      { 
        "studentId": "66010003", 
        "name": "นายอนันต์ ตั้งใจ", 
        "email": "anan_t@mju.ac.th", 
        "majorCode": "IT" 
      }
    ]
  },
  {
    "_id": "CS201",
    "courseName": "Database Systems",
    "credit": 3,
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "yearLevelAllowed": 2,
    "instructor": {
      "name": "อ.มานะ ขยันสอน",
      "email": "mana_k@mju.ac.th"
    },
    "students": [
      { 
        "studentId": "66010004", 
        "name": "นางสาวอรทัย ขยันดี", 
        "email": "orathai_k@mju.ac.th", 
        "majorCode": "DS" 
      },
      { 
        "studentId": "66010005", 
        "name": "นายปกรณ์ มุ่งมั่น", 
        "email": "pakorn_m@mju.ac.th", 
        "majorCode": "CS" 
      }
    ]
  },
  {
    "_id": "IT301",
    "courseName": "Information Systems",
    "credit": 3,
    "facultyCode": "ENG",
    "facultyName": "วิศวกรรมศาสตร์",
    "majorCode": "IT",
    "majorName": "เทคโนโลยีสารสนเทศ",
    "yearLevelAllowed": 3,
    "instructor": { "name": "อ.วิทย์ ไอที", "email": "wit_it@mju.ac.th" },
    "students": []
  },
  {
    "_id": "GE101",
    "courseName": "Thai Society",
    "credit": 2,
    "facultyCode": "GEN",
    "facultyName": "ศึกษาทั่วไป",
    "majorCode": "ALL",
    "majorName": "ทุกสาขา",
    "yearLevelAllowed": 1,
    "instructor": { "name": "อ.สังคม รักษ์ไทย", "email": "sangkom@mju.ac.th" },
    "students": []
  },
  {
    "_id": "MA101",
    "courseName": "Calculus I",
    "credit": 3,
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "yearLevelAllowed": 1,
    "instructor": { "name": "ดร.เลข คำนวณ", "email": "lek_k@mju.ac.th" },
    "students": []
  }
]);

// ==============================
// Indexes
// ==============================
db.courses.createIndex({ _id: 1 });
db.courses.createIndex({ facultyCode: 1 });
db.courses.createIndex({ majorCode: 1 });
db.courses.createIndex({ "students.studentId": 1 }); // เพิ่ม Index เพื่อให้ค้นหาได้ว่านักศึกษาลงวิชาอะไรบ้างจากฝั่งคอร์ส

// ==============================
// Example Queries (Scenario: อาจารย์ใช้)
// ==============================

// 1. อาจารย์ดูรายชื่อนักศึกษาและอีเมลของรายวิชา Data Modeling
// แสดงข้อมูลครบถ้วนสำหรับทำใบเช็คชื่อหรือส่งเมลหานักศึกษา
db.courses.find(
  { _id: "CS301" },
  { courseName: 1, instructor: 1, students: 1, _id: 0 }
);

// 2. ดูรายวิชาที่เปิดให้ชั้นปี 3 ลงเรียน ในคณะวิทยาศาสตร์ (SCI)
db.courses.find(
  { 
    yearLevelAllowed: 3,
    facultyCode: "SCI" 
  },
  { courseName: 1, yearLevelAllowed: 1, majorName: 1 }
);