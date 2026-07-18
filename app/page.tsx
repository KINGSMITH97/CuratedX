import TweetsList from "@/components/TweetsList";
import { supabase } from "@/lib/supabase";
import { Tweet } from "@/lib/types";

// Force fresh data on every request
export const revalidate = 0;

// Fetch tweets from Supabase
async function getTweets(): Promise<Tweet[]> {
  const { data, error } = await supabase
    .from("tweets")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const tweets = await getTweets();

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

        {/* TWEETS LIST WITH SEARCH */}
        <TweetsList tweets={tweets} />

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