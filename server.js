
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-5.6-luna";

// CORS: allow your GitHub Pages website and local testing
app.use(cors({
  origin: [
    "https://sumanthkmsuman.github.io",
    "http://localhost:3000",
    "http://127.0.0.1:3000"
  ],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.static("."));

// Health check
app.get("/", (_req, res) => {
  res.json({
    status: "EduVoice AI backend is running",
    model: OPENAI_MODEL
  });
});

// AI API
app.post("/api/ai", async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured on the server."
      });
    }

    const question = String(req.body?.question || "").trim();
    const context = req.body?.context || {};
    const image = req.body?.image || null;

    if (!question && !image) {
      return res.status(400).json({
        error: "Please provide a question or image."
      });
    }

    const systemPrompt = `
You are EduVoice AI, an intelligent AI student assistant.

Help college students with:
- Engineering subjects
- Programming and code debugging
- Data Structures and Algorithms
- Java, Python, C, C++
- HTML, CSS, JavaScript
- DBMS, Operating Systems, Computer Networks
- Simple explanations and examples
- Exam preparation
- 2-mark, 5-mark and 10-mark questions
- Notes and summaries
- Quizzes and study plans
- Image and question-paper explanations
- General educational questions

Instructions:
1. Give accurate, helpful answers.
2. Explain in simple student-friendly language.
3. Use examples and step-by-step explanations when useful.
4. Answer the actual question asked.
5. Use the provided timetable context only for timetable questions.
6. Never invent class or exam schedules.
7. Never reveal API keys or server secrets.

Student project context:
${JSON.stringify(context)}
`;

    const userContent = [
      {
        type: "input_text",
        text: question ||
          "Explain the uploaded study image in simple student-friendly language."
      }
    ];

    if (
      typeof image === "string" &&
      /^data:image\/(png|jpeg|webp);base64,/i.test(image)
    ) {
      userContent.push({
        type: "input_image",
        image_url: image
      });
    }

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: OPENAI_MODEL,
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text: systemPrompt
                }
              ]
            },
            {
              role: "user",
              content: userContent
            }
          ]
        })
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("OpenAI API error:", data);

      return res.status(response.status).json({
        error: data?.error?.message ||
          "OpenAI API request failed."
      });
    }

    const answer = String(data.output_text || "").trim();

    if (!answer) {
      return res.status(502).json({
        error: "AI returned an empty answer."
      });
    }

    return res.json({ answer });

  } catch (error) {
    console.error("EduVoice AI server error:", error);

    return res.status(500).json({
      error: error?.message || "AI server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`EduVoice AI running on port ${PORT}`);
  console.log(`AI model: ${OPENAI_MODEL}`);
});
