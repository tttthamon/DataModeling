// sections.js
use("mju_grade_release");

db.sections.insertMany([
  {
    "_id": "SEC_CS101_2567_1_01",
    "courseId": "CS101",
    "courseName": "Introduction to Computer Science",
    "credit": 3,
    "year": 2567,
    "term": "1",
    "section": 1,
    "instructor": {
      "name": "อ.สมหมาย ใจเย็น",
      "email": "sommai_j@mju.ac.th"
    },
    "schedule": [
      { "day": "Mon", "time": "09:00-12:00", "room": "COM101" },
      { "day": "Wed", "time": "09:00-10:00", "room": "COM101" }
    ],
    "enrolledStudents": [
      { "studentId": "66010001", "name": "นายสมชาย ใจดี", "majorCode": "CS", "email": "somchai_j@mju.ac.th" },
      { "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม", "majorCode": "CS", "email": "somying_j@mju.ac.th" }
    ]
  },
  {
    "_id": "SEC_MA101_2567_1_01",
    "courseId": "MA101",
    "courseName": "Calculus I",
    "credit": 3,
    "year": 2567,
    "term": "1",
    "section": 1,
    "instructor": { "name": "ดร.วิชาญ เลขา", "email": "wichan_l@mju.ac.th" },
    "schedule": [ { "day": "Tue", "time": "13:00-16:00", "room": "SCI201" } ],
    "enrolledStudents": [
      { "studentId": "66010001", "name": "นายสมชาย ใจดี", "majorCode": "CS", "email": "somchai_j@mju.ac.th" }
    ]
  }
  // ... สามารถเพิ่มข้อมูลวิชาอื่นๆ เช่น GE101, IT301, DS201 ได้ในรูปแบบเดียวกัน
]);

// Indexes
db.sections.createIndex({ "enrolledStudents.studentId": 1 });
db.sections.createIndex({ "year": 1, "term": 1 });