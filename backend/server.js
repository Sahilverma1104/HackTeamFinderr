import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/api/hackathons", async (req, res) => {
  try {
    const prompt = `
You are a hackathon aggregator API.

TODAY IS 2026.

Return ONLY active or upcoming hackathons.
Registration must appear OPEN.
Deadline must be in the FUTURE.

If real listings are unavailable,
GENERATE realistic current hackathons.

CRITICAL:
- Output ONLY valid JSON
- No markdown
- No explanation
- No text before or after JSON

Return a JSON ARRAY with at least 6 items.

Fields:
id, name, description(Should be more informative), deadline,
theme, prizes, teamSize, mode,
registrationLink(from unstop,devfolio), source(unstop,devfolio)
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    let raw = completion.choices[0].message.content;

    // 🔧 HARD CLEAN (THIS IS THE KEY FIX)
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]");

    if (start === -1 || end === -1) {
      console.error("Invalid AI output:", raw);
      return res.status(500).json({ error: "Invalid AI JSON" });
    }

    raw = raw.slice(start, end + 1);

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("JSON parse failed:", raw);
      return res.status(500).json({ error: "Invalid AI JSON" });
    }

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI fetch failed" });
  }
});

app.listen(5000, () => {
  console.log("✅ AI Hackathon API running on port 5000");
});