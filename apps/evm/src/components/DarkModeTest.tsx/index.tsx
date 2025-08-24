import { useEffect, useState } from "react";

export default function DarkModeTest() {
  const [isDark, setIsDark] = useState(false);

  // Applique ou enlève la classe .dark sur <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background-var text-text-var transition-colors duration-300">
      <div className="bg-cards border border-border-var rounded-xl p-6 shadow-md w-96 text-center transition-colors duration-300">
        <h1 className="text-xl font-bold mb-2">Test Dark Mode</h1>
        <p className="text-textMuted-var mb-4">
          {isDark ? "Mode sombre actif 🌙" : "Mode clair actif ☀️"}
        </p>

        <button
          onClick={() => setIsDark((v) => !v)}
          className="px-4 py-2 rounded-lg font-semibold text-white bg-primaryVar hover:bg-hoverBlue-var transition-colors duration-300"
        >
          {isDark ? "Passer en clair" : "Passer en sombre"}
        </button>
      </div>
    </div>
  );
}
