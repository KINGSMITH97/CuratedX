import TweetsList from "@/components/TweetsList";
import { supabase } from "@/lib/supabase";
import { Tweet } from "@/lib/types";

export const revalidate = 0;

const INITIAL_PAGE_SIZE = 6;

async function getInitialTweets(): Promise<{ tweets: Tweet[]; hasMore: boolean }> {
  const { data, error, count } = await supabase
    .from("tweets")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .range(0, INITIAL_PAGE_SIZE - 1);

  if (error) {
    console.error("Error fetching tweets:", error);
    return { tweets: [], hasMore: false };
  }

  const hasMore = count ? count > INITIAL_PAGE_SIZE : false;

  return {
    tweets: data || [],
    hasMore,
  };
}

export default async function Home() {
  const { tweets, hasMore } = await getInitialTweets();

  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter italic">
            CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
          </div>

          <a
            href="/admin"
            className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-bold text-zinc-400 hover:text-amber-400 uppercase tracking-widest transition-colors"
          >
            Admin
          </a>
        </header>

        {/* HERO */}
        <section className="mt-10">
          <h1 className="text-4xl font-extrabold leading-[0.9] tracking-tighter">
            FIND <span className="text-amber-400">GOLDMINE</span> <br/> TWEETS, FAST.
          </h1>
          <p className="mt-4 text-sm text-zinc-500 font-medium leading-relaxed">
            The private library of high-signal content. <br/> Filtered for builders and thinkers.
          </p>
        </section>

        {/* TWEETS LIST WITH SEARCH + LOAD MORE */}
        <TweetsList initialTweets={tweets} hasMore={hasMore} />

        {/* FOOTER */}
        <footer className="mt-20 border-t border-zinc-900 pt-10 pb-10 text-center">
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em]">
            Curated<span className="text-amber-400">X</span> 
          </p>
        </footer>

      </div>
    </main>
  );
}