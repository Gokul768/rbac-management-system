"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="🔍 Search by name or email..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-80
        px-4
        py-2
        rounded-lg
        border
        border-gray-300
        dark:border-gray-600
        bg-white
        dark:bg-gray-700
        text-black
        dark:text-white
        placeholder:text-gray-400
        dark:placeholder:text-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
      "
    />
  );
}