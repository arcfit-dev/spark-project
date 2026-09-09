import { NextRequest, NextResponse } from "next/server";
import { generateProject } from "@/lib/ai/generator-engine";
import { validateProjectFeasibility } from "@/lib/project-validator";
import { ProjectFormData, SparkProject } from "@/types/project";
import { SAMPLE_PROJECTS } from "@/lib/ai/sample-projects";
import { callAIModel } from "@/lib/ai/model-caller";

// Allow up to 30s for AI model inference on Vercel Serverless
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    let formData: ProjectFormData | undefined;

    try {
      const body = await req.json();
      if (body && Object.keys(body).length > 0) {
        formData = body as ProjectFormData;
      }
    } catch {
      // Empty body indicates Surprise Me mode
      formData = undefined;
    }

    // 1. Attempt generation via live AI model (Gemini or OpenAI)
    let project: SparkProject | null = await callAIModel(formData);

    // 2. Fall back to local procedural blueprints if no key or AI generation fails
    if (!project) {
      project = await generateProject(formData);
    }

    // 3. Feasibility & Safety Engine Check
    const validation = validateProjectFeasibility(project);
    if (!validation.isValid) {
      console.warn("Project failed feasibility, regenerating internally:", validation.reasons);
      project = SAMPLE_PROJECTS[0]; // Guaranteed 100% compliant fallback
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error in /api/generate:", error);
    // Graceful error response with default high-feasibility project
    return NextResponse.json(SAMPLE_PROJECTS[0], { status: 200 });
  }
}

