async function getStudents() {
  const res = await fetch("http://localhost:3000/students");
  const students = await res.json();
  return students;
}

export default async function StudentList() {
  const students = await getStudents();

  return (
    <div className="p-8 md:w-2/3 w-max">
      <h2 className="text-2xl font-bold mb-6 text-center">Students</h2>
      {!students ? (
        <p>No students found within database.</p>
      ) : (
        <ul className="gap-10 grid grid-cols-2">
          {students.map((student, index) => (
            <li
              key={index}
              className="p-4 dark:shadow-slate-700 border rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-slate-900 transition-all duration-300 hover:scale-105"
            >
              <p className="text-lg font-semibold">
                {student.studentData.firstName} {student.studentData.lastName}
              </p>
              <p className="text-gray-600">
                Date of Birth: {student.studentData.dateOfBirth}
              </p>
              <p className="text-gray-600">
                Current Grade: {student.studentData.currentGrade}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
