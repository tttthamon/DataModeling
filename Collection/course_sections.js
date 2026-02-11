use("mju_grade_release");
db.course_sections.insertMany([
  {
    "_id": "SEC_CS301_2567_1_01", "courseId": "CS301", "courseName": "Data Modeling", "section": 1, "year": 2567, "term": 1,
    "instructor": { "name": "อ.สมหมาย ใจเย็น", "email": "sommai_j@mju.ac.th" },
    "schedule": [{ "day": "Mon", "time": "09:00-12:00", "room": "COM101" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี" }, { "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม" }]
  },
  {
    "_id": "SEC_CS301_2567_1_02", "courseId": "CS301", "courseName": "Data Modeling", "section": 2, "year": 2567, "term": 1,
    "instructor": { "name": "อ.วิชัย เรียนดี", "email": "wichai_r@mju.ac.th" },
    "schedule": [{ "day": "Tue", "time": "13:00-16:00", "room": "COM102" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี" }, { "studentId": "66010003", "name": "นายเก่ง กล้าหาญ" }]
  },
  {
    "_id": "SEC_CS201_2567_1_01", "courseId": "CS201", "courseName": "Web Programming", "section": 1, "year": 2567, "term": 1,
    "instructor": { "name": "อ.สมหมาย ใจเย็น", "email": "sommai_j@mju.ac.th" },
    "schedule": [{ "day": "Wed", "time": "09:00-12:00", "room": "LAB3" }],
    "enrolledStudents": [{ "studentId": "66010002", "name": "นางสาวสมหญิง ใจงาม" }]
  },
  {
    "_id": "SEC_GE101_2567_1_01", "courseId": "GE101", "courseName": "Thai Language", "section": 1, "year": 2567, "term": 1,
    "instructor": { "name": "อ.มณี นามดี", "email": "manee@mju.ac.th" },
    "schedule": [{ "day": "Thu", "time": "09:00-11:00", "room": "LC202" }],
    "enrolledStudents": [{ "studentId": "66010001", "name": "นายสมชาย ใจดี" }]
  },
  {
    "_id": "SEC_CS402_2567_1_01", "courseId": "CS402", "courseName": "Cloud Computing", "section": 1, "year": 2567, "term": 1,
    "instructor": { "name": "อ.วิชัย เรียนดี", "email": "wichai_r@mju.ac.th" },
    "schedule": [{ "day": "Fri", "time": "13:00-16:00", "room": "COM305" }],
    "enrolledStudents": [{ "studentId": "66010005", "name": "นายสายฟ้า ฟาด" }]
  }
]);
// ค้นหาตารางเรียนรายคนได้รวดเร็ว
db.course_sections.createIndex({ "enrolledStudents.studentId": 1 }); 
// ค้นหาวิชาที่เปิดสอนตามปี/เทอม
db.course_sections.createIndex({ "year": 1, "term": 1 });
// ค้นหารายวิชาที่อาจารย์แต่ละท่านรับผิดชอบ
db.course_sections.createIndex({ "instructor.email": 1 });


//ดึงตารางเรียนของนักศึกษา (ค้นหาจาก ID นักศึกษา)
db.course_sections.find({ "enrolledStudents.studentId": "66010001" }, { courseName: 1, schedule: 1 });
//ดึงรายชื่อนักศึกษาในวิชาที่อาจารย์สอน (ค้นหาจากชื่ออาจารย์)
db.course_sections.find({ "instructor.name": "อ.สมหมาย ใจเย็น" }, { enrolledStudents: 1 });
//สรุปจำนวนนักศึกษาแต่ละกลุ่ม (Aggregation)
db.course_sections.aggregate([{ $project: { _id: 1, total: { $size: "$enrolledStudents" } } }]);