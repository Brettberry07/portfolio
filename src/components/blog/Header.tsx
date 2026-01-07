"use client";

interface HeaderProps {
  title?: string;
  date?: string;
}

export default function Header({ title, date }: HeaderProps) {
  return (
    <header className="flex flex-col justify-center items-center w-full py-12 px-8 bg-gray-800 text-white shadow-md">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">{title || "Querry Berry"}</h1>
      {date && (
        <p className="text-gray-400 text-sm">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
    </header>
  );
}