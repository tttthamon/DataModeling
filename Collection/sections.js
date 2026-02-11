use("mju_grade_release");
db.sections.insertMany([
  {
    "_id": "SEC_CS101_2567_1_01", "courseId": "CS101", "courseName": "Intro to CS", "credit": 3, "year": 2567, "term": "1", "section": 1,
    "instructor": { "name": "อ.สมหมาย ใจเย็น", "email": "sommai_j@mju.ac.th" },
    "schedule": [{ "day": "Mon", "time": "09:00-12:00", "room": "COM101" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี", "email": "somchai_j@mju.ac.th" }]
  },
  {
    "_id": "SEC_MA101_2567_1_01", "courseId": "MA101", "courseName": "Calculus I", "credit": 3, "year": 2567, "term": "1", "section": 1,
    "instructor": { "name": "ดร.วิชาญ เลขา", "email": "wichan_l@mju.ac.th" },
    "schedule": [{ "day": "Tue", "time": "13:00-16:00", "room": "SCI201" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี" }]
  },
  {
    "_id": "SEC_CS102_2567_1_01", "courseId": "CS102", "courseName": "Programming I", "credit": 3, "year": 2567, "term": "1", "section": 1,
    "instructor": { "name": "อ.สมศรี เรียนดี", "email": "somsri_r@mju.ac.th" },
    "schedule": [{ "day": "Wed", "time": "09:00-12:00", "room": "LAB1" }],
    "enrolledStudents": [{ "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม" }]
  },
  {
    "_id": "SEC_GE101_2567_1_01", "courseId": "GE101", "courseName": "Thai Society", "credit": 2, "year": 2567, "term": "1", "section": 1,
    "instructor": { "name": "อ.มานะ ขยัน", "email": "mana@mju.ac.th" },
    "schedule": [{ "day": "Thu", "time": "10:00-12:00", "room": "LC1" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี" }, { "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม" }]
  },
  {
    "_id": "SEC_ENG101_2567_1_01", "courseId": "ENG101", "courseName": "English I", "credit": 3, "year": 2567, "term": "1", "section": 1,
    "instructor": { "name": "Mr. John Smith", "email": "john@mju.ac.th" },
    "schedule": [{ "day": "Fri", "time": "09:00-12:00", "room": "LC2" }],
    "enrolledStudents": [{ "studentId": "66010003", "name": "นายอนันต์ ตั้งใจ" }]
  }
]);
// 1. เพื่อค้นหาตารางเรียนรายบุคคล (Multi-key Index บนอาเรย์)
db.sections.createIndex({ "enrolledStudents.studentId": 1 });

// 2. เพื่อค้นหากลุ่มเรียนที่เปิดในแต่ละปีและเทอม
db.sections.createIndex({ "year": 1, "term": 1 });

//ดึงตารางเรียนของนักศึกษา (นายสมชาย)
db.sections.find({ "enrolledStudents.studentId": "66010001" }, { courseName: 1, schedule: 1, _id: 0 });
//ดึงรายชื่อนักศึกษาเฉพาะวิชาที่ "อ.สมหมาย" สอน
db.sections.find({ "instructor.name": "อ.สมหมาย ใจเย็น" }, { courseName: 1, "enrolledStudents.name": 1 });
//นับจำนวนนักศึกษาที่ลงทะเบียนในแต่ละวิชา (Aggregation)
db.sections.aggregate([
  { $project: { courseId: 1, studentCount: { $size: "$enrolledStudents" } } }
]);