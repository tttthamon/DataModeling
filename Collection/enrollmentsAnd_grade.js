use("mju_grade_release");
db.enrollmentsAndGrade.insertMany([
  {
    "studentId": "66010001", "name": "นายสมชาย ใจดี", "majorName": "วิทยาการคอมพิวเตอร์",
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [
      { "courseId": "CS301", "courseName": "Data Modeling", "credit": 3, "grade": "A", "gradePoint": 4.0 },
      { "courseId": "CS201", "courseName": "Database Systems", "credit": 3, "grade": "B+", "gradePoint": 3.5 }
    ]
  },
  {
    "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม", "majorName": "วิทยาการคอมพิวเตอร์",
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [{ "courseId": "CS301", "courseName": "Data Modeling", "credit": 3, "grade": "B", "gradePoint": 3.0 }]
  },
  {
    "studentId": "66010003", "name": "นายอนันต์ ตั้งใจ", "majorName": "เทคโนโลยีสารสนเทศ",
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [{ "courseId": "CS301", "courseName": "Data Modeling", "credit": 3, "status": "W", "grade": "W", "gradePoint": 0 }]
  },
  {
    "studentId": "66010004", "name": "นางสาวอรทัย ขยันดี", "majorName": "วิทยาการข้อมูล",
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [{ "courseId": "GE101", "courseName": "Thai Society", "credit": 2, "grade": "A", "gradePoint": 4.0 }]
  },
  {
    "studentId": "66010005", "name": "นายปกรณ์ มุ่งมั่น", "majorName": "วิทยาการคอมพิวเตอร์",
    "term": { "academicYear": 2567, "semester": 1 },
    "enrollments": [{ "courseId": "CS201", "courseName": "Database Systems", "credit": 3, "status": "I", "grade": "I", "gradePoint": 0 }]
  }
]);
db.enrollmentsAndGrade.createIndex({ studentId: 1 }); // สำหรับนักศึกษาเรียกดูเกรดตัวเอง
db.enrollmentsAndGrade.createIndex({ "term.academicYear": 1, "term.semester": 1 }); // สำหรับทำรายงานสรุปรายเทอม
db.enrollmentsAndGrade.createIndex({ "enrollments.courseId": 1 }); // สำหรับอาจารย์ดึงรายชื่อเกรดตามวิชา
//นักศึกษาตรวจสอบผลการเรียนรายคน
db.enrollmentsAndGrade.find(
  { studentId: "66010001", "term.academicYear": 2567 },
  { enrollments: 1, _id: 0 }
);
//อาจารย์ตรวจสอบเกรดทั้งหมดในวิชาที่สอน (Filter by Array)
db.enrollmentsAndGrade.find(
  { "enrollments.courseId": "CS301" },
  { name: 1, majorName: 1, "enrollments.$": 1 } // ใช้ $ เพื่อดึงเฉพาะวิชาที่ตรงเงื่อนไขออกมาแสดง
);
//การคำนวณเกรดเฉลี่ย (GPA) เบื้องต้น (Aggregation)
db.enrollmentsAndGrade.aggregate([
  { $match: { studentId: "66010001" } },
  { $unwind: "$enrollments" },
  { $group: { _id: "$studentId", GPA: { $avg: "$enrollments.gradePoint" } } }
]);