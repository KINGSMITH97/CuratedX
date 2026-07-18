"use client";

interface TweetCardProps {
  authorName: string;
  handle: string;
  content: string;
  url: string;
  category: string;
}

export default function TweetCard({ authorName, handle, content, url, category }: TweetCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-amber-400/30 transition-all">
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

      <p className="mt-4 text-sm leading-relaxed text-zinc-200">
        {content}
      </p>

      <div className="mt-5 flex items-center gap-4 border-t border-zinc-800/50 pt-4">
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
          className="text-zinc-500 hover:text-emerald-400 text-xs font-bold transition-colors flex items-center gap-1"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(content + "\n\nSource: " + url)}`, '_blank')}
        >
          SHARE WHATSAPP
        </button>
      </div>
    </article>
  );
}