// enrollmentsandgrade.js
use("mju_grade_release");

db.enrollmentsAndGrade.insertMany([
  {
    "studentId": "66010001",
    "name": "นายสมชาย ใจดี",
    "email": "somchai_j@mju.ac.th",
    "phone": "081-234-5678",
    "facultyCode": "AG",
    "facultyName": "ผลิตกรรมการเกษตร",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "studentYearLevel": 2,
    "term": {
      "academicYear": 2567,
      "semester": 1
    },
    "enrollments": [
      {
        "courseId": "CS301",
        "courseName": "Data Modeling",
        "credit": 3,
        "status": "ปกติ",
        "grade": "A",
        "gradePoint": 4.0
      },
      {
        "courseId": "CS201",
        "courseName": "Database Systems",
        "credit": 3,
        "status": "ปกติ",
        "grade": "B+",
        "gradePoint": 3.5
      }
    ]
  },
  {
    "studentId": "66010002",
    "name": "นางสาวสมหญิง ใจงาม",
    "email": "somying_j@mju.ac.th",
    "phone": "082-345-6789",
    "facultyCode": "AG",
    "facultyName": "ผลิตกรรมการเกษตร",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "studentYearLevel": 2,
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [
      { "courseId": "CS301", "courseName": "Data Modeling", "credit": 3, "status": "ปกติ", "grade": "B", "gradePoint": 3.0 }
    ]
  },
  {
    "studentId": "66010003",
    "name": "นายอนันต์ ตั้งใจ",
    "email": "anan_t@mju.ac.th",
    "phone": "083-456-7890",
    "facultyCode": "ENG",
    "facultyName": "วิศวกรรมศาสตร์",
    "majorCode": "IT",
    "majorName": "เทคโนโลยีสารสนเทศ",
    "studentYearLevel": 3,
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [
      { "courseId": "CS301", "courseName": "Data Modeling", "credit": 3, "status": "W", "grade": "W", "gradePoint": 0 }
    ]
  },
  {
    "studentId": "66010004",
    "name": "นางสาวอรทัย ขยันดี",
    "email": "orathai_k@mju.ac.th",
    "phone": "084-567-8901",
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "DS",
    "majorName": "วิทยาการข้อมูล",
    "studentYearLevel": 1,
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [
      { "courseId": "GE101", "courseName": "Thai Society", "credit": 2, "status": "ปกติ", "grade": "A", "gradePoint": 4.0 }
    ]
  },
  {
    "studentId": "66010005",
    "name": "นายปกรณ์ มุ่งมั่น",
    "email": "pakorn_m@mju.ac.th",
    "phone": "085-678-9012",
    "facultyCode": "SCI",
    "facultyName": "วิทยาศาสตร์",
    "majorCode": "CS",
    "majorName": "วิทยาการคอมพิวเตอร์",
    "studentYearLevel": 4,
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [
      { "courseId": "CS201", "courseName": "Database Systems", "credit": 3, "status": "I", "grade": "I", "gradePoint": 0 }
    ]
  }
]);

// ==============================
// Indexes (เพิ่มประสิทธิภาพการ Query)
// ==============================
db.enrollmentsAndGrade.createIndex({ studentId: 1 });
db.enrollmentsAndGrade.createIndex({ "term.academicYear": 1, "term.semester": 1 });
db.enrollmentsAndGrade.createIndex({ facultyCode: 1, majorCode: 1 }); // สำหรับดูเกรดแยกสาขา/คณะ

// ==============================
// Example Queries
// ==============================

// 1. นักศึกษาดูผลการเรียนเทอมล่าสุด (ได้ข้อมูลครบทั้งชื่อ คณะ สาขา และเกรด)
db.enrollmentsAndGrade.find(
  {
    studentId: "66010001",
    "term.academicYear": 2567,
    "term.semester": 1
  }
);

// 2. อาจารย์ดูรายชื่อนักศึกษาและเกรดในวิชา Data Modeling (CS301)
// จะเห็นชื่อ อีเมล และสาขาของนักศึกษาทุกคนที่ลงวิชานี้ทันที
db.enrollmentsAndGrade.find(
  { "enrollments.courseId": "CS301" },
  { name: 1, email: 1, majorName: 1, enrollments: 1, _id: 0 }
);