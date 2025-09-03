import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="
        fixed top-4 right-4 p-3 bg-white/20 backdrop-blur-md
        rounded-full border border-white/30 transition-all duration-200
        hover:bg-white/30 hover:scale-110 text-gray-700 dark:text-gray-300
      "
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};