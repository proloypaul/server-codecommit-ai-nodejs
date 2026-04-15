const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");
const { openApiKey } = require("./config");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  baseURL: openApiKey.apiUrl,
  apiKey: openApiKey.apiKey,
});

app.post("/generate-commit", async (req, res) => {
  const { diff } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a senior developer. Generate concise conventional commit messages.",
        },
        {
          role: "user",
          content: `Generate commit message for this diff:\n${diff}`,
        },
      ],
    });

    const message = completion.choices[0].message.content.trim();

    console.log("model response message", message);
    res.json({ message });
  } catch (err) {
    res.status(500).json({ message: "Error generating commit message" });
  }
});

app.listen(3000, () => {
  console.log("AI server running on http://localhost:3000");
});
