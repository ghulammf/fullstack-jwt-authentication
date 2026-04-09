const initTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    const isDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return isDark;
  }
  return false;
};

const toggleTheme = () => {
  if (typeof window !== "undefined") {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      return false;
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      return true;
    }
  }
  return false;
};

const getTheme = () => {
  if (typeof window !== "undefined") {
    return document.documentElement.classList.contains("dark");
  }
  return false;
};

export { initTheme, toggleTheme, getTheme };
