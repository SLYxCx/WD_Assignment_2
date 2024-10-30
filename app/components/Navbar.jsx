// app/components/Navbar.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ activeComponent }) {
  const [active, setActive] = useState(activeComponent);
  const router = useRouter();

  const handleNavigation = (component) => {
    setActive(component);
    router.push(`/?view=${component}`);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-green-600 text-white">
      <h2 className="text-xl font-bold">New Generation High School</h2>
      <ul className="flex space-x-4">
        <li>
          <button
            onClick={() => handleNavigation("view")}
            className={`hover:underline ${
              active === "view" ? "font-bold" : ""
            }`}
          >
            View Student List
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("add")}
            className={`hover:underline ${active === "add" ? "font-bold" : ""}`}
          >
            Add Student
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigation("find")}
            className={`hover:underline ${
              active === "find" ? "font-bold" : ""
            }`}
          >
            Find/Modify Student
          </button>
        </li>
      </ul>
    </nav>
  );
}
