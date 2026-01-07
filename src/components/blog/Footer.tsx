"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full px-8 py-12 bg-gray-800 text-white shadow-md border-t border-gray-700">
      <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-4">
        ← Back to all posts
      </Link>
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Contact Me</h2>
        <p className="text-gray-400">Get in touch for collaborations or inquiries</p>
      </div>
    </footer>
  );
}