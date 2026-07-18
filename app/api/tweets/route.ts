import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const PAGE_SIZE = 6;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "0");

    // Create Supabase client on the server
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("tweets")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message, tweets: [], hasMore: false },
        { status: 500 }
      );
    }

    const hasMore = count ? (page + 1) * PAGE_SIZE < count : false;

    return NextResponse.json({
      tweets: data || [],
      hasMore,
      total: count || 0,
    });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json(
      { error: "Server error", tweets: [], hasMore: false },
      { status: 500 }
    );
  }
}