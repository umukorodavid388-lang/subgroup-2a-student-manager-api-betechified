


//CREATE Student record -----------By <Crown Aluka>
app.post("/api/students", (req, res) => {
    const { name, email, age, course } = req.body ?? {};
    const cleanEmail = email.trim().toLowerCase()

    if (!name?.trim() || !email?.trim() || !age || !course?.trim()) {
        return res.status(400).json({ success: false, err: "Some fields are missing!" });
    }

    if (!Number.isInteger(age)) {
        return res.status(400).json({ success: false, err: "Age must be number" });
        
    }
    
    if(students.some(stud => stud.email === cleanEmail)){
        return res.status(400).json({ success: false, err: "Email taken" });
        
    }

        const newStudent = { id: students.length + 1, name, email:cleanEmail, age, course };

        students.push(newStudent);

        return res.status(201).json({ success: true, data: newStudent, message: `Student (${newStudent.id}) created successfully` });
})
