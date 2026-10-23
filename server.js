require("dotenv").config();
const express = require("express");
const app = express();



app.use(express.json());

let students = [];

//CREATE Student record -----------By <Crown Aluka>
app.post("/api/students", (req, res) => {
  const { name, email, age, course } = req.body ?? {};
  const cleanEmail = email.trim().toLowerCase();

  if (!name?.trim() || !email?.trim() || !age || !course?.trim()) {
    return res
      .status(400)
      .json({ success: false, err: "Some fields are missing!" });
  }

  if (!Number.isInteger(age)) {
    return res.status(400).json({ success: false, err: "Age must be number" });
  }

  if (students.some((stud) => stud.email === cleanEmail)) {
    return res.status(400).json({ success: false, err: "Email taken" });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    email: cleanEmail,
    age,
    course,
  };

  students.push(newStudent);

  return res.status(201).json({
    success: true,
    data: newStudent,
    message: `Student (${newStudent.id}) created successfully`,
  });
});

//LISTING - By Eirene.
app.get("/api/students", (req, res) => {
  return res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ success: false, err: "Student not found" });
  }

  return res.status(200).json({ sucess: true, data: student });
});








// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runing on PORT ${PORT}`);  
});
