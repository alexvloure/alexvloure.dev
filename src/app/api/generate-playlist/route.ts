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
              content: `You are an expert music curator who creates playlists that match user's emotional states and moods.
                
                REQUIREMENTS:
                - Choose internationally recognized songs with high Spotify availability
                - Provide the exact number of songs requested (never more, never less)
                - Verify all song titles and artist names are completely accurate
                - If uncertain about any track details, replace with a confirmed alternative
                - Include diverse genres, eras, and artists while maintaining mood coherence
                - Arrange songs to create a natural emotional flow

                RESPONSE FORMAT:
                Return only a JSON array in this exact format:
                [
                  {
                    "title": "Song Title",
                    "artist": "Artist Name"
                  }
                ]

                Your goal is to create a soundtrack that enhances the user's emotional experience through music.`,
            },
            {
              role: "user",
              content: `The user is feeling: "${mood}". Create a playlist of 10 songs that match this mood.`,
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
