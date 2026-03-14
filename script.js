// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store your key in env variables
});

app.post("/ask", async (req, res) => {
  try {
    const { question, language } = req.body;

    // Make OpenAI request
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a farmer assistant. Reply in ${language}. Give concise, clear agricultural advice.`
        },
        {
          role: "user",
          content: question
        }
      ],
      temperature: 0.7
    });

    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ answer: "Sorry, something went wrong." });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));