const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyDK7o8-_7uetyYtuNe480y07HeE0f7grhAHERE"; // Gemini/OpenAI

app.post("/interview", async (req, res) => {
  try {
    const { resume, question, answer } = req.body;

    // 🔹 Agent 1: Question Analysis
    const analysisPrompt = `
    Analyze this interview question:
    ${question}
    What is interviewer expecting?
    `;

    // 🔹 Agent 2: Evaluation
    const evaluationPrompt = `
    Resume: ${resume}
    Question: ${question}
    Answer: ${answer}

    Give:
    - Score out of 10
    - Feedback
    `;

    // 🔹 Agent 3: Improvement
    const improvementPrompt = `
    Improve this answer professionally:
    ${answer}
    `;

    // 👉 API CALL (same API for all agents)
    const aiCall = async (prompt) => {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      return response.data.candidates[0].content.parts[0].text;
    };

    const analysis = await aiCall(analysisPrompt);
    const evaluation = await aiCall(evaluationPrompt);
    const improved = await aiCall(improvementPrompt);

    res.json({
      analysis,
      evaluation,
      improved
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});