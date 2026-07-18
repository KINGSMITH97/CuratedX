"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [tweetUrl, setTweetUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorHandle, setAuthorHandle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Business");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFetchTweet = async () => {
    if (!tweetUrl) {
      setMessage("⚠️ Please enter a tweet URL first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Fetching tweet data...");

      const response = await fetch(
        `/api/fetch-tweet?url=${encodeURIComponent(tweetUrl)}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage("❌ " + data.error);
        setLoading(false);
        return;
      }

      setAuthorName(data.author_name);
      setAuthorHandle(data.author_handle);
      setContent(data.content);

      setMessage("✅ Tweet data fetched successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to fetch tweet.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("tweets").insert({
      tweet_url: tweetUrl,
      author_name: authorName,
      author_handle: authorHandle,
      content: content,
      category: category,
      is_published: true,
    });

    if (error) {
      console.error("Error saving tweet:", error);
      setMessage("❌ Error: " + error.message);
      setLoading(false);
      return;
    }

    setMessage("✅ Tweet added successfully!");

    setTweetUrl("");
    setAuthorName("");
    setAuthorHandle("");
    setContent("");
    setCategory("Business");

    setLoading(false);
    router.refresh();
  };

  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter italic">
            CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
          </a>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Admin
          </span>
        </header>

        {/* TITLE */}
        <section className="mt-10">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter">
            Add a <span className="text-amber-400">Goldmine</span> Tweet
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Paste a tweet URL and we&apos;ll auto-fetch the details.
          </p>
        </section>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Tweet URL */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Tweet URL
            </label>
            <input
              type="url"
              required
              value={tweetUrl}
              onChange={(e) => setTweetUrl(e.target.value)}
              placeholder="https://x.com/username/status/..."
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleFetchTweet}
              disabled={loading}
              className="mt-3 w-full rounded-xl border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold py-3 text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch Tweet Data"}
            </button>
          </div>

          {/* Author Name */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Author Name
            </label>
            <input
              type="text"
              required
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Naval"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Author Handle */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Author Handle (without @)
            </label>
            <input
              type="text"
              required
              value={authorHandle}
              onChange={(e) => setAuthorHandle(e.target.value)}
              placeholder="naval"
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none"
            />
          </div>

          {/* Tweet Content */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Tweet Content
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="The tweet text goes here..."
              rows={5}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-zinc-200 focus:border-amber-400 focus:outline-none"
            >
              <option value="Business">Business</option>
              <option value="Mindset">Mindset</option>
              <option value="Tech">Tech</option>
              <option value="Growth">Growth</option>
              <option value="Marketing">Marketing</option>
              <option value="Sports">Sports</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-4 text-sm uppercase tracking-widest transition-colors"
          >
            {loading ? "Saving..." : "Add Tweet"}
          </button>

          {/* Message */}
          {message && (
            <div className="text-center text-sm text-amber-400 mt-4">
              {message}
            </div>
          )}
        </form>

      </div>
    </main>
  );
}