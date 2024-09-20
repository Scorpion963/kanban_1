"use client";

import { useTheme } from "next-themes";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeSwitch = () => {
    return setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-6">
      <Switch
        onClick={() => handleThemeSwitch()}
        className="scale-150 data-[state=unchecked]:bg-primary"
        id="dark-mode-toggle"
      />
      <Label htmlFor="dark-mode-toggle">
        <div className="text-slate-400  ">Switch to {resolvedTheme === "dark" ? "light" : "dark"} mode</div>
      </Label>
    </div>
  );
}
