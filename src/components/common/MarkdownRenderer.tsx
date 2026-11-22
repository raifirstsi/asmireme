"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Parse sections line by line or block by block
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let tableBuffer: string[] = [];
  let inTable = false;
  let listBuffer: string[] = [];
  let inList = false;

  const flushTable = (key: string) => {
    if (tableBuffer.length < 2) {
      tableBuffer = [];
      inTable = false;
      return;
    }

    const headerLine = tableBuffer[0];
    const rowLines = tableBuffer.slice(2); // Skip separator line | :--- |

    const headers = headerLine
      .split("|")
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    const rows = rowLines.map((row) =>
      row
        .split("|")
        .map((c) => c.trim())
        .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1)
    );

    elements.push(
      <div
        key={`table-${key}`}
        className="my-6 overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#141415] shadow-xs"
      >
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[560px]">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800/80">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="p-3.5 sm:p-4 font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight"
                >
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3.5 sm:p-4 text-zinc-700 dark:text-zinc-300">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    tableBuffer = [];
    inTable = false;
  };

  const flushList = (key: string) => {
    if (listBuffer.length === 0) {
      inList = false;
      return;
    }

    elements.push(
      <ul key={`list-${key}`} className="my-4 space-y-2 pl-4 list-disc text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
        {listBuffer.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {renderInline(item)}
          </li>
        ))}
      </ul>
    );

    listBuffer = [];
    inList = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Table detection
    if (line.startsWith("|") && line.endsWith("|")) {
      if (inList) flushList(`line-${i}`);
      inTable = true;
      tableBuffer.push(line);
      continue;
    } else if (inTable) {
      flushTable(`line-${i}`);
    }

    // List detection
    if (line.startsWith("- ") || line.startsWith("* ")) {
      inList = true;
      listBuffer.push(line.slice(2).trim());
      continue;
    } else if (inList) {
      flushList(`line-${i}`);
    }

    // Spacing divider (no visible line border to prevent clutter)
    if (line === "---" || line === "***") {
      elements.push(
        <div key={`spacer-${i}`} className="py-2.5" />
      );
      continue;
    }

    // Headings
    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-lg sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-8 mb-3"
        >
          {renderInline(line.replace("### ", ""))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-4"
        >
          {renderInline(line.replace("## ", ""))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mt-10 mb-4"
        >
          {renderInline(line.replace("# ", ""))}
        </h1>
      );
      continue;
    }

    // Empty lines
    if (!line) {
      continue;
    }

    // Special check for CTA Buttons like [>> Click Here...](/go/...)
    if (line.includes("[>>") || line.includes("[Bấm Vào Đây") || line.includes("[Click Here")) {
      const match = line.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const text = match[1].replace(">>", "").trim();
        const href = match[2];
        elements.push(
          <div key={`cta-${i}`} className="my-8 text-center sm:text-left">
            <a
              href={href}
              target="_blank"
              rel="nofollow sponsored"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-black hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-black font-semibold text-sm shadow-md transition-all active:scale-95 group"
            >
              <span>{text}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        );
        continue;
      }
    }

    // Standard Paragraph - Mobile-friendly, airy spacing, high readability
    elements.push(
      <p
        key={`p-${i}`}
        className="text-sm sm:text-base leading-[1.85] text-zinc-800 dark:text-zinc-300 my-4 sm:my-5 font-normal tracking-normal"
      >
        {renderInline(line)}
      </p>
    );
  }

  if (inTable) flushTable("end");
  if (inList) flushList("end");

  return <div className="space-y-4 sm:space-y-6">{elements}</div>;
}

// Inline formatting helper for bold, italic, code, and links
function renderInline(text: string): React.ReactNode {
  // Regex to match links [text](url)
  const linkRegex = /\[(.*?)\]\((.*?)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(parseFormatting(text.slice(lastIndex, match.index)));
    }
    const linkText = match[1];
    const linkHref = match[2];
    const isInternal = linkHref.startsWith("/");

    if (isInternal && !linkHref.startsWith("/go/")) {
      parts.push(
        <Link
          key={match.index}
          href={linkHref}
          className="text-zinc-950 dark:text-zinc-50 font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={linkHref}
          target="_blank"
          rel="nofollow sponsored"
          className="text-zinc-950 dark:text-zinc-50 font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity inline-flex items-center gap-0.5"
        >
          <span>{linkText}</span>
          <ExternalLink className="h-3 w-3 inline ml-0.5" />
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(parseFormatting(text.slice(lastIndex)));
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// Simple bold (**text**) and code (`code`) parser
function parseFormatting(text: string): React.ReactNode {
  // Bold **text**
  const boldParts = text.split(/\*\*(.*?)\*\*/g);
  if (boldParts.length === 1) {
    return text;
  }

  return boldParts.map((part, idx) => {
    if (idx % 2 === 1) {
      return (
        <strong key={idx} className="font-semibold text-zinc-950 dark:text-zinc-50">
          {part}
        </strong>
      );
    }
    return part;
  });
}
