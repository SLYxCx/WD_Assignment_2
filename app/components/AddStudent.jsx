"use client";
import React, { useState } from "react";

export default function AddStudent() {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    currentGrade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      studentData.currentGrade.length &&
      studentData.firstName.length &&
      studentData.lastName.length > 0
    ) {
      const res = await fetch("http://localhost:3000/students", {
        method: "POST",
        body: JSON.stringify({
          studentData,
        }),
      });

      setStudentData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        currentGrade: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className=" w-2/3">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Student</h2>
      <div className="space-y-4 flex justify-center items-start flex-col">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={studentData.firstName}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={studentData.lastName}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={studentData.dateOfBirth}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
          required
        />
        <input
          type="text"
          name="currentGrade"
          placeholder="Current Grade"
          value={studentData.currentGrade}
          onChange={handleChange}
          className="p-2 border rounded w-full bg-green-600 bg-opacity-20"
          required
        />
        <button
          type="submit"
          className="mt-4 p-2 w-full bg-green-600 text-white  rounded"
        >
          Add Student
        </button>
      </div>
    </form>
  );
}
