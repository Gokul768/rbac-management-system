"use client";

import { TextField } from "@mui/material";

interface SearchBarProps {
  search: string;
  onSearch: (value: string) => void;
}

export default function SearchBar({
  search,
  onSearch,
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      label="Search Members"
      placeholder="Search by Name, Email or Phone"
      value={search}
      onChange={(e) => onSearch(e.target.value)}
      margin="normal"
    />
  );
}