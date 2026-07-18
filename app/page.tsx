import TweetCard from "@/components/TweetCard";

// THIS IS OUR MOCK DATA (Our temporary database)
const MOCK_TWEETS = [
  {
    id: 1,
    authorName: "Naval",
    handle: "naval",
    category: "Mindset",
    content: "Productivity is for the middle-class. High-output individuals focus on leverage, judgment, and accountability.",
    url: "https://x.com/naval"
  },
  {
    id: 2,
    authorName: "Alex Hormozi",
    handle: "AlexHormozi",
    category: "Business",
    content: "You don’t become confident by shouting affirmations in the mirror. You become confident by having a stack of undeniable proof that you are who you say you are. Outwork your self-doubt.",
    url: "https://x.com/AlexHormozi"
  },
  {
    id: 3,
    authorName: "Paul Graham",
    handle: "paulg",
    category: "Tech",
    content: "It’s better to have 100 people who love you than 1 million people who sort of like you. Build deep, not wide.",
    url: "https://x.com/paulg"
  }
];

export default function Home() {
  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter italic">
            CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
          </div>

          <button className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Admin
          </button>
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

        {/* SEARCH BOX */}
        <div className="mt-8 relative group">
          <div className="absolute -inset-0.5 bg-amber-400/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
          <input
            placeholder="Search gems..."
            className="relative w-full rounded-xl border border-zinc-800 bg-black px-4 py-4 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-amber-400 focus:outline-none transition-all"
          />
        </div>

        {/* LATEST GEMS LIST */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
              Latest Discoveries
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-900 ml-4"></div>
          </div>

          <div className="space-y-6">
            {MOCK_TWEETS.map((tweet) => (
              <TweetCard 
                key={tweet.id}
                authorName={tweet.authorName}
                handle={tweet.handle}
                content={tweet.content}
                url={tweet.url}
                category={tweet.category}
              />
            ))}
          </div>
        </section>

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