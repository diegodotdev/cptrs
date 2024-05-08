"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider value={{ light: "emerald", dark: "dim" }}>
      {children}
    </NextThemesProvider>
  );
}
