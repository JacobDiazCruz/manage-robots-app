import { useEffect, useState } from "react";

export default function useDarkTheme() {
  const [darkTheme, setDarkTheme] = useState(true);

  const handleToggleDarkTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    if (
      darkTheme &&
      window?.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  return {
    darkTheme,
    handleToggleDarkTheme,
  };
}
