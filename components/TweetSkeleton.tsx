export default function TweetSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 animate-pulse">
      
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
          <div>
            <div className="h-3 w-20 rounded bg-zinc-800"></div>
            <div className="h-2 w-14 rounded bg-zinc-800 mt-2"></div>
          </div>
        </div>
        <div className="h-5 w-16 rounded-full bg-zinc-800"></div>
      </div>

      {/* Content skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-zinc-800"></div>
        <div className="h-3 w-full rounded bg-zinc-800"></div>
        <div className="h-3 w-3/4 rounded bg-zinc-800"></div>
      </div>

      {/* Actions skeleton */}
      <div className="mt-5 flex items-center gap-4 border-t border-zinc-800/50 pt-4">
        <div className="h-3 w-20 rounded bg-zinc-800"></div>
        <div className="h-3 w-20 rounded bg-zinc-800"></div>
        <div className="h-3 w-14 rounded bg-zinc-800"></div>
      </div>
    </div>
  );
}