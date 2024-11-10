// components/AddButton.js
import { useState } from "react";

export default function AddButton() {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={toggleActive}
      className={`w-24 h-12 rounded-full transition-colors duration-300 mt-2
        transition-colors duration-300 
        ${
          isActive
            ? "bg-blue-500 text-white"
            : "bg-white text-black bg-opacity-70"
        }`}
    >
      ➕
    </button>
  );
}
