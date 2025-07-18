import { NextRequest, NextResponse } from "next/server";
import { franc } from "franc";
import langs from "langs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { language, genre, numberOfSongs, mood } = body;

  if (!language || !genre || !numberOfSongs || !mood) {
    return NextResponse.json({ error: "Missing body" }, { status: 400 });
  }

  let requestedLang = language;
  if (requestedLang === "auto-detect") {
    const langCode = franc(mood);
    requestedLang =
      "English and " + langs.where("3", langCode)?.name || "English";
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
          model: "google/gemini-2.0-flash-001",
          temperature: 0.5,
          messages: [
            {
              role: "system",
              content: `You are an expert music curator who creates playlists that match user's emotional states and moods.

              REQUIREMENTS:
              - Choose internationally recognized songs with high Spotify availability
              - Provide the exact number of songs requested (never more, never less)
              - Include only songs in the specified genre(s) and language(s)
              - Verify all song titles and artist names are completely accurate
              - If uncertain about any track details, replace with a confirmed alternative
              - Arrange songs to create a natural emotional flow
              - Create a compelling playlist name that captures the essence of the mood/theme (max 30 characters)

              RESPONSE FORMAT:
              Return only a JSON object in this exact format:
              {
                "name": "Playlist Name",
                "tracks": [
                  {
                    "title": "Song Title",
                    "artist": "Artist Name"
                  }
                ]
              }

              Your goal is to create a soundtrack that enhances the user's emotional experience through music.`,
            },
            {
              role: "user",
              content: `The user is feeling: "${mood}". Create a playlist of exactly ${numberOfSongs} songs that match this mood. The genre must be ${genre}. Please, make sure to just include songs in ${requestedLang}.`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "playlist",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", description: "Playlist name" },
                  tracks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Song title" },
                        artist: { type: "string", description: "Artist name" },
                      },
                      required: ["title", "artist"],
                      additionalProperties: false,
                    },
                    minItems: 1,
                  },
                },
                required: ["name", "tracks"],
                additionalProperties: false,
              },
            },
          },
        }),
      },
    );

    const parsedResponse = await response.json();
    const dataText = parsedResponse.choices[0]?.message?.content;

    let data;
    try {
      data = JSON.parse(dataText);
    } catch (e) {
      return NextResponse.json(
        { error: "Failed to parse playlist response" },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch playlist" },
      { status: 500 },
    );
  }
}
