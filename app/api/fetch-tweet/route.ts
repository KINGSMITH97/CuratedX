import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tweetUrl = searchParams.get("url");

  if (!tweetUrl) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Call Twitter's oEmbed API
    const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(
      tweetUrl
    )}&omit_script=true`;

    const response = await fetch(oembedUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch tweet. Make sure the URL is valid." },
        { status: 400 }
      );
    }

    const data = await response.json();

    // Extract the tweet text from the HTML
    const textMatch = data.html.match(/<p[^>]*>(.*?)<\/p>/);
    let tweetText = textMatch ? textMatch[1] : "";

    // Clean up HTML entities and tags
    tweetText = tweetText
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ")
      .trim();

    // Extract handle from author_url (e.g., "https://twitter.com/naval" → "naval")
    const handleMatch = data.author_url.match(/\/([^/]+)$/);
    const handle = handleMatch ? handleMatch[1] : "";

    return NextResponse.json({
      author_name: data.author_name,
      author_handle: handle,
      content: tweetText,
      url: tweetUrl,
    });
  } catch (error) {
    console.error("oEmbed error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tweet data" },
      { status: 500 }
    );
  }
}