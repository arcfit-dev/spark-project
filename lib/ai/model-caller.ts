import { ProjectFormData, SparkProject, VisualType } from "@/types/project";
import { SPARKLAB_SYSTEM_PROMPT } from "./prompt";

function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/```\s*$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/```\s*$/, "");
  }
  return cleaned.trim();
}

function sanitizeProjectResponse(data: any): SparkProject | null {
  if (!data || typeof data !== "object") return null;

  const validVisualTypes: VisualType[] = [
    "blueprint",
    "electronics",
    "app",
    "science",
    "environment",
    "mechanical",
    "art",
  ];

  const visual_type: VisualType = validVisualTypes.includes(data.visual_type)
    ? data.visual_type
    : "blueprint";

  return {
    title: String(data.title || "Autonomous Science Project"),
    hook: String(data.hook || "An exciting hands-on investigation!"),
    domain: String(data.domain || "Science"),
    project_type: String(data.project_type || "Build something"),
    difficulty:
      data.difficulty === "Easy" || data.difficulty === "Challenging"
        ? data.difficulty
        : "Medium",
    duration: String(data.duration || "1–2 weeks"),
    estimated_cost: String(data.estimated_cost || "₹200–₹500"),
    age_range: "13–15",
    why_it_matters: String(
      data.why_it_matters ||
        "Helps solve real-world problems through hands-on inquiry and creative design."
    ),
    what_you_will_learn: Array.isArray(data.what_you_will_learn)
      ? data.what_you_will_learn.map(String)
      : ["Hands-on problem solving", "Scientific testing & recording"],
    materials: Array.isArray(data.materials)
      ? data.materials.map(String)
      : ["Basic stationery", "Recycled materials"],
    steps: Array.isArray(data.steps)
      ? data.steps.map((s: any, idx: number) => ({
          number: typeof s.number === "number" ? s.number : idx + 1,
          title: String(s.title || `Step ${idx + 1}`),
          description: String(s.description || ""),
          tip: s.tip ? String(s.tip) : undefined,
        }))
      : [],
    expected_output: String(data.expected_output || "A working prototype or documented experiment."),
    presentation_idea: String(data.presentation_idea || "Live interactive demonstration."),
    upgrade_ideas: Array.isArray(data.upgrade_ideas)
      ? data.upgrade_ideas.map(String)
      : ["Add smart data logging", "Scale to classroom usage"],
    visual_type,
    visual_prompt: String(data.visual_prompt || "Blueprint technical schematic"),
    feasibility_score: typeof data.feasibility_score === "number" ? data.feasibility_score : 92,
    creativity_score: typeof data.creativity_score === "number" ? data.creativity_score : 88,
  };
}

/**
 * Calls Google Gemini (gemini-2.0-flash) using REST API
 */
async function callGemini(apiKey: string, promptText: string): Promise<SparkProject | null> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${SPARKLAB_SYSTEM_PROMPT}\n\n${promptText}` }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Gemini API Error:", response.status, errText);
    return null;
  }

  const result = await response.json();
  const textContent =
    result?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  if (!textContent) return null;

  const parsed = JSON.parse(cleanJsonString(textContent));
  return sanitizeProjectResponse(parsed);
}

/**
 * Calls OpenAI (gpt-4o-mini) using REST API
 */
async function callOpenAI(apiKey: string, promptText: string): Promise<SparkProject | null> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SPARKLAB_SYSTEM_PROMPT },
        { role: "user", content: promptText },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("OpenAI API Error:", response.status, errText);
    return null;
  }

  const result = await response.json();
  const textContent = result?.choices?.[0]?.message?.content || "";

  if (!textContent) return null;

  const parsed = JSON.parse(cleanJsonString(textContent));
  return sanitizeProjectResponse(parsed);
}

/**
 * Main dispatcher: checks for configured API keys and generates a SparkProject.
 * Returns null if no API key is provided or if generation fails, allowing fallback.
 */
export async function callAIModel(
  formData?: ProjectFormData
): Promise<SparkProject | null> {
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  const openAIKey = process.env.OPENAI_API_KEY?.trim();

  if (!geminiKey && !openAIKey) {
    return null; // No key configured, use procedural fallback
  }

  const promptText = formData
    ? `Student Preferences:
- Interests: ${formData.interests?.join(", ") || "General Science & Tech"}
- Project Type: ${formData.projectType || "Build something"}
- Timeframe: ${formData.timeframe || "1–2 weeks"}
- Available Resources: ${formData.resources?.join(", ") || "Basic household materials"}
- Specific Ideas / Thoughts: ${formData.customThought || "None provided"}

Generate a customized, safe, high-engagement project matching this student's profile:`
    : `Surprise Me Mode:
Generate a completely unique, highly creative, and safe school project for a 13–15 year old student. Choose an interesting domain and hands-on build or experiment:`;

  try {
    if (geminiKey) {
      const project = await callGemini(geminiKey, promptText);
      if (project) return project;
    }

    if (openAIKey) {
      const project = await callOpenAI(openAIKey, promptText);
      if (project) return project;
    }
  } catch (error) {
    console.warn("AI generation failed or timed out, will fall back to procedural engine:", error);
  }

  return null;
}
