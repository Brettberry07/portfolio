"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BodyProps {
  content: string;
}

export default function Body({ content }: BodyProps) {
  return (
    <div className="flex justify-center w-full py-12 px-8 bg-gray-900 text-white">
      <article className="prose prose-invert prose-lg max-w-4xl w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}