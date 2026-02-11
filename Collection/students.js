// students.js
use("mju_grade_release");

db.students.insertMany([
  {
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
    "academicHistory": [
      {
        "year": 2567,
        "term": "1",
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
    "academicHistory": []
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

// ค้นหาตามสังกัด เพื่อทำรายงานสถิตินักศึกษาแยกตามคณะ/สาขา
db.students.createIndex({ "facultyCode": 1, "majorCode": 1 });

//ค้นหาประวัตินักศึกษาจากรหัส (Simple Query) ใช้สำหรับหน้า Profile
db.students.findOne({ "_id": "66010001" });
//ค้นหานักศึกษาที่มีผลการเรียนดี (Filter Query) ใช้สำหรับดึงรายชื่อนักศึกษาเกียรตินิยม หรือผู้ที่ได้ GPAX 3.50 ขึ้นไป
db.students.find({ "gpax": { $gte: 3.50 } }, { name: 1, gpax: 1 });
//ค้นหานักศึกษาแยกตามคณะ (Grouping) ใช้ตรวจสอบจำนวนนักศึกษาในคณะวิทยาศาสตร์ (SCI)
db.students.find({ "facultyCode": "SCI" }).count();