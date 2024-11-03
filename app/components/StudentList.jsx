"use client";
import React, { useEffect, useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const res = await fetch("http://localhost:3000/students");
        if (!res.ok) throw new Error("Failed to fetch students");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error(error);
        setStudents([]);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div className="p-8 md:w-2/3 w-max">
      <h2 className="text-2xl font-bold mb-6 text-center">Students</h2>
      {students === null ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
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
