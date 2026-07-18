import TweetSkeleton from "@/components/TweetSkeleton";

export default function Loading() {
  return (
    <main className="min-h-dvh px-4 py-6">
      <div className="mx-auto w-full max-w-md">
        
        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div className="text-xl font-black tracking-tighter italic">
            CURATED<span className="text-amber-400 text-2xl not-italic">X</span>
          </div>
          <div className="rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-1.5 text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Admin
          </div>
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

        {/* Search box skeleton */}
        <div className="mt-8">
          <div className="w-full h-14 rounded-xl border border-zinc-800 bg-zinc-900/50 animate-pulse"></div>
        </div>

        {/* Tweet skeletons */}
        <section className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-black text-zinc-500 uppercase tracking-[0.2em]">
              Loading Discoveries
            </h2>
            <div className="h-[1px] flex-1 bg-zinc-900 ml-4"></div>
          </div>

          <div className="space-y-6">
            <TweetSkeleton />
            <TweetSkeleton />
            <TweetSkeleton />
          </div>
        </section>
      </div>
    </main>
  );
}