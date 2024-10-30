"use client";
import React, { useState } from "react";

export default function FindModifyStudent() {
  const [studentName, setStudentName] = useState("");
  const [studentData, setStudentData] = useState(null);

  const handleFind = (e) => {
    e.preventDefault();

    console.log("Searching for:", studentName);
  };

  const handleModify = (e) => {
    e.preventDefault();

    console.log("Modified Student:", studentData);
  };

  return (
    <div className="p-8 w-3/5">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Find/Modify Student
      </h2>
      <form
        onSubmit={handleFind}
        className="space-y-4 flex justify-center items-start flex-col"
      >
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter student name"
          className="p-2 border w-full rounded bg-green-600 bg-opacity-20"
          required
        />
        <button
          type="submit"
          className="p-2 w-full bg-green-600 text-white rounded"
        >
          Find Student
        </button>
      </form>

      {studentData && (
        <form onSubmit={handleModify} className="mt-6 space-y-4">
          <button
            type="submit"
            className="mt-4 p-2 bg-green-600 text-white rounded"
          >
            Modify Student
          </button>
        </form>
      )}
    </div>
  );
}
