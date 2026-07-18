"use client";

import { useState } from "react";
import ShareModal from "./ShareModal";

interface TweetCardProps {
  authorName: string;
  handle: string;
  content: string;
  url: string;
  category: string;
}

export default function TweetCard({ authorName, handle, content, url, category }: TweetCardProps) {
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `"${content}"\n\n— @${handle}\n\n${url}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `"${content}"\n\n— @${handle}\n\nSource: ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <>
      <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-amber-400/30 transition-all">
        
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-xs font-bold border border-amber-400/20">
              {authorName[0]}
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-100 leading-none">{authorName}</div>
              <div className="text-[10px] text-zinc-500 mt-1">@{handle}</div>
            </div>
          </div>
          <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-400 uppercase tracking-wider">
            {category}
          </span>
        </div>

        {/* CONTENT */}
        <p className="mt-4 text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
          {content}
        </p>

        {/* ACTIONS */}
        <div className="mt-5 flex items-center gap-4 border-t border-zinc-800/50 pt-4 flex-wrap">
          
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:text-amber-300 text-xs font-bold transition-colors"
          >
            VIEW ON X →
          </a>

          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="text-zinc-500 hover:text-emerald-400 text-xs font-bold transition-colors"
          >
            WHATSAPP
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`text-xs font-bold transition-colors ${
              copied ? "text-emerald-400" : "text-zinc-500 hover:text-amber-400"
            }`}
          >
            {copied ? "✓ COPIED" : "COPY"}
          </button>

          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="text-zinc-500 hover:text-amber-400 text-xs font-bold transition-colors"
          >
            📸 IMAGE
          </button>
        </div>
      </article>

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        content={content}
        authorName={authorName}
        handle={handle}
        category={category}
        url={url}
      />
    </>
  );
}