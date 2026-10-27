require("dotenv").config();
const express = require("express");
const { valid } = require("semver");
const app = express();



app.use(express.json());

let students = [];
let nextId = 1;





//CREATE Student record -----------By <Crown Aluka>
app.post("/api/students", (req, res) => {
    const { name, email, age, course } = req.body ?? {};

    const cleanedName = name?.trim();
    const cleanedEmail = email?.trim().toLowerCase();
    const cleanedCourse = course?.trim();

    if (!cleanedName || !cleanedEmail || !age || !cleanedCourse) {
        return res
            .status(400)
            .json({ success: false, err: "Some fields are missing!" });
    }

    console.log(cleanedName)

    if (!Number.isInteger(age)) {
        return res.status(400).json({ success: false, err: "Age must be a number" });
    }

    if (students.some((stud) => stud.email === cleanedEmail)) {
        return res.status(400).json({ success: false, err: "Email taken" });
    }

    const newStudent = {
        id: nextId++,
        name: cleanedName,
        email: cleanedEmail,
        age: age,
        course: cleanedCourse
    };

    students.push(newStudent);

    return res.status(201).json({
        success: true,
        data: newStudent,
        message: `Student (${newStudent.id}) created successfully`,
    });
});




//LISTING --- By Eirene.
app.get("/api/students", (req, res) => {
    return res.status(200).json({
        success: true,
        count: students.length,
        data: students,
    });
});


// -----GET student by ID---------
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);

    if (!student) {
        return res.status(404).json({ success: false, err: "Student not found" });
    }

    return res.status(200).json({ sucess: true, data: student });
});




// UPDATING(PUT) - By Jaiyeoba Michael.
app.put("/api/students/:id", (req, res) => {
    const studentid = Number(req.params.id);
    const { name, email, age, course } = req.body ?? {};

    const cleanedName = name?.trim();
    const cleanedEmail = email?.trim().toLowerCase();
    const cleanedCourse = course?.trim();

    const index = students.findIndex((s) => s.id === studentid);

    if (index === -1) {
        return res.status(404).json({ success: false, err: "Student not found" });
    }

    if (cleanedName !== undefined) {
        students[index].name = cleanedName
    }

    if (cleanedEmail !== undefined) {
        if (students.some((s) => s.email === cleanedEmail && s.id !== studentid)) {
            return res.status(400).json({ success: false, err: "Email taken" });
        }
        students[index].email = cleanedEmail

    }

    if (age !== undefined) {
        if(!Number.isInteger(age)){
            return res.status(400).json({ success: false, err: "Age must be a number" });

        }
        students[index].age = age
    }

    if (cleanedCourse !== undefined) {
        students[index].course = cleanedCourse
    }

    return res.status(200).json({ success: true, data: students[index], message: "Student updated" });
});




app.delete("/api/students/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const student = students.find(stud => stud.id === studentId);
    if (!student) {

        return res.status(404).json({ success: false, err: "Student not found" });
    }

    students = students.filter(stud => stud.id !== studentId);
    return res.status(200).json({ success: true, message: `Student with (${studentId}) deleted successfully` });
})







// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n Server runing on http://localhost:${PORT}`);
});