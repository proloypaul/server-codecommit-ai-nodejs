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

// improve code api
app.post("/improve-code", async (req, res) => {
  const { code } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Improve this code. Return only updated code without explanation.",
      },
      {
        role: "user",
        content: code,
      },
    ],
  });

  res.json({
    code: completion.choices[0].message.content,
  });
});

app.listen(3000, () => {
  console.log("AI server running on http://localhost:3000");
});
