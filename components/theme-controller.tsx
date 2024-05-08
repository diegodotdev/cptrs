"use client";

import { useTheme } from "next-themes";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      className="select select-bordered select-sm"
      onChange={(e) => setTheme(e.target.value)}
      value={theme}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
