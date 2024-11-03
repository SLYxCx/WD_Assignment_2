"use client";
import React from "react";

export default function Navbar({ activeComponent, onNavigate }) {
  const handleNavigation = (component) => {
    onNavigate(component);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
      <h2 className="text-xl font-bold">New Generation High School</h2>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => handleNavigation("view")}
            className={`hover:underline ${
              activeComponent === "view" ? "font-bold" : ""
            }`}
          >
            View Student List
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("add")}
            className={`hover:underline ${
              activeComponent === "add" ? "font-bold" : ""
            }`}
          >
            Add Student
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("find")}
            className={`hover:underline ${
              activeComponent === "find" ? "font-bold" : ""
            }`}
          >
            Find/Modify Student
          </button>
        </li>
      </ul>
    </nav>
  );
}
