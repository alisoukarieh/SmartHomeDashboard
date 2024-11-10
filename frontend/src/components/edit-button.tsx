// components/EditButton.tsx
import { useState } from "react";

interface EditButtonProps {
  value: boolean;
  onToggle: (newValue: boolean) => void;
}

export default function EditButton({ value, onToggle }: EditButtonProps) {
  const [isActive, setIsActive] = useState(value);

  const toggleActive = () => {
    const newValue = !value;
    setIsActive(newValue);
    onToggle(newValue); // Notify the parent of the new value
  };

  return (
    <button
      onClick={toggleActive}
      className={`w-24 h-12 rounded-full transition-colors duration-300 mt-2
                ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black bg-opacity-70"
                }`}
    >
      {value ? "✏️" : "📝"}
    </button>
  );
}
