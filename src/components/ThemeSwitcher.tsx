// components/ThemeSwitcher.tsx
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

import Cupcake02Icon from "./CupcakeIcon";

const themes = [
  { name: "light", icon: <FaSun size={24} />, label: "Light"  },
  { name: "dark", icon: <FaMoon size={24} />, label: "Dark" },
  { name: "cupcake", icon: <Cupcake02Icon color="#44ead2" />, label: "Cupcake" },
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const currentThemeIcon = themes.find((t) => t.name === theme)?.icon;

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle text-xl">
        {currentThemeIcon}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50"
      >
        {themes.map((t) => (
          <li key={t.name}>
            <button
              className={`flex items-center gap-2 px-2 py-1 text-base-content hover:text-primary`}
              onClick={() => handleThemeChange(t.name)}
            >
              {t.icon} {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
