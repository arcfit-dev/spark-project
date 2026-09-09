import { SparkProject, FeasibilityCheck } from "@/types/project";

export interface FeasibilityResult {
  isValid: boolean;
  score: number;
  checks: FeasibilityCheck[];
  reasons: string[];
}

// Banned unsafe topics or dangerous phrases for 13-15 age group
const UNSAFE_PATTERNS = [
  /explosiv/i,
  /weapon/i,
  /gun/i,
  /toxic/i,
  /hazardous chemical/i,
  /hydrochloric acid/i,
  /sulfuric acid/i,
  /mercury/i,
  /pathogen/i,
  /220v|240v|mains power|high voltage/i,
  /live animal dissection/i,
  /ingestion|consume|swallow/i,
  /pyrotechnic/i,
];

// Anti-patterns: generic boring assignments that violate Product Principle 1
const BORING_ASSIGNMENT_PATTERNS = [
  /write an essay/i,
  /make a powerpoint/i,
  /make a poster about/i,
  /research a topic online/i,
  /generic chatbot/i,
];

export function validateProjectFeasibility(
  project: SparkProject,
  userTimeframe?: string,
  userBudget?: string
): FeasibilityResult {
  const reasons: string[] = [];
  const checks: FeasibilityCheck[] = [
    { id: "safety", label: "Safe for school & home", passed: true },
    { id: "age", label: "Age appropriate (13–15)", passed: true },
    { id: "resources", label: "Accessible resources", passed: true },
    { id: "time", label: "Feasible timeframe", passed: true },
    { id: "demonstrable", label: "Demonstrable outcome", passed: true },
    { id: "learning", label: "High learning value", passed: true },
  ];

  const fullText = [
    project.title,
    project.hook,
    project.why_it_matters,
    ...project.materials,
    ...project.steps.map((s) => `${s.title} ${s.description}`),
  ].join(" ");

  // 1. Safety check
  for (const pattern of UNSAFE_PATTERNS) {
    if (pattern.test(fullText)) {
      checks.find((c) => c.id === "safety")!.passed = false;
      reasons.push(`Contains unsafe element matching: ${pattern}`);
    }
  }

  // 2. Anti-generic school assignment check
  for (const pattern of BORING_ASSIGNMENT_PATTERNS) {
    if (pattern.test(project.hook) || pattern.test(project.title)) {
      checks.find((c) => c.id === "learning")!.passed = false;
      reasons.push("Too similar to a passive presentation/essay assignment.");
    }
  }

  // 3. Demonstrable outcome check
  if (!project.steps || project.steps.length < 3) {
    checks.find((c) => c.id === "demonstrable")!.passed = false;
    reasons.push("Must contain at least 3 distinct actionable steps.");
  }

  if (!project.expected_output || project.expected_output.length < 15) {
    checks.find((c) => c.id === "demonstrable")!.passed = false;
    reasons.push("Must define a tangible output or measurement.");
  }

  // 4. Learning value check
  if (!project.what_you_will_learn || project.what_you_will_learn.length < 2) {
    checks.find((c) => c.id === "learning")!.passed = false;
    reasons.push("Must specify at least two clear learning competencies.");
  }

  // Calculate score
  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);
  const isValid = checks.find((c) => c.id === "safety")!.passed && score >= 80;

  return {
    isValid,
    score,
    checks,
    reasons,
  };
}
