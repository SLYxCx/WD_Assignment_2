"use client";
import React, { useState, useEffect } from "react";

export default function FindModifyStudent() {
  const [students, setStudents] = useState([]); // State to hold all students
  const [studentsId, setStudentsId] = useState([]);
  const [studentName, setStudentName] = useState(""); // State for the input name
  const [filteredStudents, setFilteredStudents] = useState([]); // State to hold filtered students
  const [error, setError] = useState(null); // State for error handling
  const [selectedStudent, setSelectedStudent] = useState(null); // State for the student to be modified
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  // Fetch the student data when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:3000/students`);
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        const studentData = data.map((s) => s.studentData);

        // Log the fetched student data
        console.log("Fetched students:", studentData);

        // Store students in state
        setStudents(studentData);
        setStudentsId(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array means this runs once on mount

  // Filter students based on the input name
  useEffect(() => {
    const results = students.filter((student) =>
      student.firstName.toLowerCase().includes(studentName.toLowerCase())
    );
    setFilteredStudents(results); // Update the filtered students state

    // Log the filtered results
    console.log("Filtered students:", results);
  }, [studentName]); // Run this effect when studentName or students changes

  const handleModify = (student) => {
    setSelectedStudent(student); // Set the selected student for modification
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async (updatedStudent) => {
    try {
      const response = await fetch(
        `http://localhost:3000/students/${updatedStudent.firstName}`,
        {
          method: "PUT", // Use PUT to update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudent), // Send updated student data
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update student");
      }

      // Fetch updated students
      const data = await response.json();
      setStudents(students.map((s) => (s.id === data.id ? data : s))); // Update local state
      setIsModalOpen(false); // Close modal
    } catch (err) {
      setError(err.message); // Set error if there's an issue
    }
  };

  return (
    <div className="p-8 w-3/5">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Find/Modify Student
      </h2>
      <form className="space-y-4 flex justify-center items-start flex-col">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student first name"
          className="p-2 border w-full rounded bg-green-600 bg-opacity-20"
          required
        />
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {filteredStudents.length > 0 && (
        <div className="mt-6 space-y-4">
          {filteredStudents.map((student) => (
            <div
              key={student.firstName + student.lastName}
              className="border p-4 rounded"
            >
              <p>
                <strong>Name:</strong> {student.firstName} {student.lastName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {student.dateOfBirth}
              </p>
              <p>
                <strong>Current Grade:</strong> {student.currentGrade}
              </p>
              <button
                onClick={() => handleModify(student)}
                className="mt-2 p-2 bg-green-600 text-white rounded"
              >
                Modify Student
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for modifying student */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-100">
          <div className=" p-6 rounded shadow-md">
            <h3 className="text-xl font-bold mb-4">Modify Student</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate({
                  ...selectedStudent,
                  firstName: e.target.firstName.value,
                  lastName: e.target.lastName.value,
                  dateOfBirth: e.target.dateOfBirth.value,
                  currentGrade: e.target.currentGrade.value,
                });
              }}
            >
              <div className="flex gap-3 flex-col">
                <input
                  type="text"
                  name="firstName"
                  defaultValue={selectedStudent.firstName}
                  required
                  placeholder="First Name"
                  className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
                />
                <input
                  type="text"
                  name="lastName"
                  defaultValue={selectedStudent.lastName}
                  required
                  placeholder="Last Name"
                  className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  defaultValue={selectedStudent.dateOfBirth}
                  required
                  className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
                />
                <input
                  type="text"
                  name="currentGrade"
                  defaultValue={selectedStudent.currentGrade}
                  required
                  placeholder="Current Grade"
                  className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="p-2 bg-green-600  rounded mr-2"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
