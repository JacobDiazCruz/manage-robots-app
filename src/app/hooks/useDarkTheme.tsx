import { useEffect, useState } from "react";

export default function useDarkTheme() {
  const [darkTheme, setDarkTheme] = useState(false);

  const handleToggleDarkTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  /**
   * Apply the "dark" class to the document's root element
   * when the darkTheme state is enabled and the user's
   * system preference is also set to dark mode.
   */
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
