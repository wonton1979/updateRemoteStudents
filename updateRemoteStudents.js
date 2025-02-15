function updateRemoteStudents(students){
    const copyStudents = [];
    if (students.length !== 0){
        for(const student of students){
            let copyStudent = {...student};
            if(!copyStudent.location){
                copyStudent.location = "remote";
                copyStudents.push(copyStudent);
            }
            else {
                copyStudents.push(copyStudent);
            }
        }
    }

    return copyStudents;
}

module.exports = updateRemoteStudents;