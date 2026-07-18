"use client";

import { useState } from "react";
import TweetCard from "./TweetCard";
import TweetSkeleton from "./TweetSkeleton";
import { Tweet } from "@/lib/types";

interface TweetsListProps {
  initialTweets: Tweet[];
  hasMore: boolean;
}

export default function TweetsList({ initialTweets, hasMore: initialHasMore }: TweetsListProps) {
  const [tweets, setTweets] = useState<Tweet[]>(initialTweets);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tweets based on search
  const filteredTweets = tweets.filter((tweet) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      tweet.content.toLowerCase().includes(query) ||
      tweet.author_name.toLowerCase().includes(query) ||
      tweet.author_handle.toLowerCase().includes(query) ||
      tweet.category.toLowerCase().includes(query)
    );
  });

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const res = await fetch(`/api/tweets?page=${nextPage}`);
      const data = await res.json();

      setTweets((prev) => [...prev, ...data.tweets]);
      setPage(nextPage);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Failed to load more tweets:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEARCH BOX */}
      <div className="mt-8 relative group">
        <div className="absolute -inset-0.5 bg-amber-400/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by content, author, or category..."
          className="relative w-full rounded-xl border border-zinc-800 bg-black px-4 py-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none transition-all"
        />
        
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 text-xs font-bold"
          >
            CLEAR ✕
          </button>
        )}
      </div>

      {/* TWEETS LIST */}
      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
            {searchQuery ? `Results (${filteredTweets.length})` : "Latest Discoveries"}
          </h2>
          <div className="h-[1px] flex-1 bg-zinc-900 ml-4"></div>
        </div>

        {filteredTweets.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-zinc-500 text-sm">
              {searchQuery 
                ? `No tweets found for "${searchQuery}"` 
                : "No tweets yet. Add some from the admin panel!"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTweets.map((tweet) => (
              <TweetCard 
                key={tweet.id}
                authorName={tweet.author_name}
                handle={tweet.author_handle}
                content={tweet.content}
                url={tweet.tweet_url}
                category={tweet.category}
              />
            ))}

            {/* Loading skeletons when fetching more */}
            {loading && (
              <>
                <TweetSkeleton />
                <TweetSkeleton />
              </>
            )}
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {!searchQuery && hasMore && !loading && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMore}
              className="rounded-xl border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold py-3 px-8 text-xs uppercase tracking-widest transition-colors"
            >
              Load More Gems
            </button>
          </div>
        )}

        {/* End of list message */}
        {!searchQuery && !hasMore && tweets.length > 6 && (
          <div className="mt-8 text-center text-zinc-600 text-xs uppercase tracking-widest">
            ✨ You&apos;ve seen all the gems ✨
          </div>
        )}
      </section>
    </>
  );
}