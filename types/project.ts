export type Domain =
  | "Science"
  | "Technology"
  | "Environment"
  | "AI & Robotics"
  | "Space"
  | "Art & Design"
  | "Business"
  | "Psychology"
  | "Sports"
  | "Health & Fitness"
  | "Social Impact";

export type ProjectType =
  | "Build something"
  | "Run an experiment"
  | "Investigate something"
  | "Create something"
  | "Solve a problem"
  | "Make an app"
  | "Build with AI"
  | "Make a game";

export type Timeframe =
  | "This weekend"
  | "1–2 weeks"
  | "About a month"
  | "Long-term";

export type Resource =
  | "Laptop"
  | "Phone"
  | "Basic materials"
  | "Electronics / Arduino"
  | "3D printer"
  | "Art supplies"
  | "Small budget"
  | "Almost nothing";

export interface ProjectFormData {
  interests: Domain[];
  projectType: ProjectType;
  timeframe: Timeframe;
  resources: Resource[];
  customThought?: string;
}

export type VisualType =
  | "blueprint"
  | "electronics"
  | "app"
  | "science"
  | "environment"
  | "mechanical"
  | "art";

export interface ProjectStep {
  number: number;
  title: string;
  description: string;
  tip?: string;
}

export interface SparkProject {
  title: string;
  hook: string;
  domain: Domain | string;
  project_type: ProjectType | string;
  difficulty: "Easy" | "Medium" | "Challenging";
  duration: string;
  estimated_cost: string;
  age_range: string;
  why_it_matters: string;
  what_you_will_learn: string[];
  materials: string[];
  steps: ProjectStep[];
  expected_output: string;
  presentation_idea: string;
  upgrade_ideas: string[];
  visual_type: VisualType;
  visual_prompt: string;
  feasibility_score: number;
  creativity_score: number;
}

export type AppState =
  | "IDLE"
  | "FORM"
  | "GENERATING"
  | "REVEALING"
  | "RESULT"
  | "RESETTING";

export type ThinkingOrbState =
  | "breathing"
  | "listening"
  | "searching"
  | "connecting"
  | "weaving"
  | "working"
  | "solving"
  | "composing"
  | "shaping";

export interface FeasibilityCheck {
  id: string;
  label: string;
  passed: boolean;
}
