"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Tweet } from "@/lib/types";

export default function AdminPage() {
  const router = useRouter();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tweetUrl, setTweetUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorHandle, setAuthorHandle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Business");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Tweets list state
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loadingTweets, setLoadingTweets] = useState(false);

  // Fetch all tweets
  const fetchTweets = useCallback(async () => {
    setLoadingTweets(true);
    const { data, error } = await supabase
      .from("tweets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tweets:", error);
    } else {
      setTweets(data || []);
    }
    setLoadingTweets(false);
  }, []);

  // Check auth on load
  useEffect(() => {
    const savedAuth = localStorage.getItem("curatedx_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
      fetchTweets();
    }
  }, [fetchTweets]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("curatedx_admin_auth", "true");
      fetchTweets();
    } else {
      setAuthError("❌ Incorrect password");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("curatedx_admin_auth");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

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

  const handleEdit = (tweet: Tweet) => {
    setEditingId(tweet.id);
    setTweetUrl(tweet.tweet_url);
    setAuthorName(tweet.author_name);
    setAuthorHandle(tweet.author_handle);
    setContent(tweet.content);
    setCategory(tweet.category);
    setMessage("✏️ Editing tweet. Click 'Update Tweet' to save changes.");
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTweetUrl("");
    setAuthorName("");
    setAuthorHandle("");
    setContent("");
    setCategory("Business");
    setMessage("");
  };

  const handleDelete = async (tweetId: string) => {
    if (!confirm("Are you sure you want to delete this tweet? This cannot be undone.")) {
      return;
    }

    const { error } = await supabase.from("tweets").delete().eq("id", tweetId);

    if (error) {
      alert("Error deleting tweet: " + error.message);
      return;
    }

    setMessage("🗑️ Tweet deleted!");
    fetchTweets();
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (editingId) {
      // UPDATE existing tweet
      const { error } = await supabase
        .from("tweets")
        .update({
          tweet_url: tweetUrl,
          author_name: authorName,
          author_handle: authorHandle,
          content: content,
          category: category,
        })
        .eq("id", editingId);

      if (error) {
        setMessage("❌ Error: " + error.message);
        setLoading(false);
        return;
      }

      setMessage("✅ Tweet updated successfully!");
      setEditingId(null);
    } else {
      // INSERT new tweet
      const { error } = await supabase.from("tweets").insert({
        tweet_url: tweetUrl,
        author_name: authorName,
        author_handle: authorHandle,
        content: content,
        category: category,
        is_published: true,
      });

      if (error) {
        setMessage("❌ Error: " + error.message);
        setLoading(false);
        return;
      }

      setMessage("✅ Tweet added successfully!");
    }

    // Clear form
    setTweetUrl("");
    setAuthorName("");
    setAuthorHandle("");
    setContent("");
    setCategory("Business");

    setLoading(false);
    fetchTweets();
    router.refresh();
  };

  // 🔐 LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-dvh px-4 py-6 flex items-center">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center">
            <a href="/" className="inline-block text-xl font-black tracking-tighter italic">
              CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
            </a>
            <h1 className="mt-8 text-2xl font-extrabold tracking-tighter">
              Admin <span className="text-amber-400">Access</span>
            </h1>
            <p className="mt-2 text-sm text-zinc-500">
              Enter password to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <input
              type="password"
              required
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none text-center"
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold py-4 text-sm uppercase tracking-widest transition-colors"
            >
              Unlock
            </button>

            {authError && (
              <div className="text-center text-sm text-red-400 mt-4">
                {authError}
              </div>
            )}
          </form>
        </div>
      </main>
    );
  }

  // 🎯 ADMIN PANEL
  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto w-full max-w-md">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <a href="/" className="text-xl font-black tracking-tighter italic">
            CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
          </a>
          <button
            onClick={handleLogout}
            className="text-xs font-bold text-zinc-400 hover:text-amber-400 uppercase tracking-widest transition-colors"
          >
            Logout
          </button>
        </header>

        {/* TITLE */}
        <section className="mt-10">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter">
            {editingId ? (
              <>Edit <span className="text-amber-400">Tweet</span></>
            ) : (
              <>Add a <span className="text-amber-400">Goldmine</span> Tweet</>
            )}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            {editingId ? "Update the tweet details below." : "Paste a tweet URL and we'll auto-fetch the details."}
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

            {!editingId && (
              <button
                type="button"
                onClick={handleFetchTweet}
                disabled={loading}
                className="mt-3 w-full rounded-xl border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold py-3 text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Fetch Tweet Data"}
              </button>
            )}
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
            </select>
          </div>

          {/* Submit + Cancel Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold py-4 text-sm uppercase tracking-widest transition-colors"
            >
              {loading ? "Saving..." : editingId ? "Update Tweet" : "Add Tweet"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-bold px-6 py-4 text-sm uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Message */}
          {message && (
            <div className="text-center text-sm text-amber-400 mt-4">
              {message}
            </div>
          )}
        </form>

        {/* MANAGE TWEETS SECTION */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
              Manage Tweets ({tweets.length})
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-900 ml-4"></div>
          </div>

          {loadingTweets ? (
            <div className="text-center py-8 text-zinc-500 text-sm">
              Loading tweets...
            </div>
          ) : tweets.length === 0 ? (
            <div className="text-center py-8 text-zinc-500 text-sm">
              No tweets yet. Add your first one above!
            </div>
          ) : (
            <div className="space-y-3">
              {tweets.map((tweet) => (
                <div
                  key={tweet.id}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-zinc-200">
                          {tweet.author_name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 uppercase tracking-wider">
                          {tweet.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">
                        {tweet.content}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-3 pt-3 border-t border-zinc-800/50">
                    <button
                      onClick={() => handleEdit(tweet)}
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDelete(tweet.id)}
                      className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}