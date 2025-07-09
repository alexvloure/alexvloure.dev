import { NextRequest, NextResponse } from "next/server";

// TODO: transform this to a GET
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { mood } = body;

  if (!mood) {
    return NextResponse.json({ error: "Mood is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                // "You are a playlist generator who offers creative, fresh music every time based on user's mood. Avoid repetitions and always surprise the listener.",
                "You are a creative music curator who generates diverse, emotionally resonant playlists. You use well-known english songs. Try to include at least one song in the user's language",
            },
            {
              role: "user",
              // content: `The user is feeling: "${mood}". The mood is expressed in ${language}. Generate a playlist of 10 songs. Respond as a JSON array with "title", "artist", and "album".`,
              content: `The user is feeling: "${mood}". Create a playlist of 10 songs that match this mood. Use songs that strongly match the vibe. Return the result as a JSON array of objects, each with "title", "artist", and "album" fields.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "playlist",
              strict: true,
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string", description: "Song title" },
                    artist: { type: "string", description: "Artist name" },
                    album: { type: "string", description: "Album name" },
                  },
                  required: ["title", "artist", "album"],
                  additionalProperties: false,
                },
                minItems: 1,
              },
            },
          },
        }),
      },
    );

    const data = await response.json();
    const playlistText = data.choices[0]?.message?.content;

    let playlist;
    try {
      playlist = JSON.parse(playlistText);
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse playlist response" },
        { status: 500 },
      );
    }

    return NextResponse.json({ playlist }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch playlist" },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "Only POST requests allowed" },
    { status: 405 },
  );
}
