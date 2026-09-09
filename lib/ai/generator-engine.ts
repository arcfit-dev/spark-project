import { ProjectFormData, SparkProject, VisualType } from "@/types/project";
import { SAMPLE_PROJECTS } from "./sample-projects";
import { validateProjectFeasibility } from "../project-validator";

// Combinatorial seed pools for Surprise Me mode (Section 8)
const DOMAINS = [
  "Environment",
  "Technology",
  "Science",
  "AI & Robotics",
  "Space",
  "Psychology",
  "Social Impact",
  "Sports",
  "Art & Design",
];

const PROJECT_TYPES = [
  "Build something",
  "Run an experiment",
  "Investigate something",
  "Make an app",
  "Build with AI",
  "Solve a problem",
];

const PROCEDURAL_BLUEPRINTS: SparkProject[] = [
  ...SAMPLE_PROJECTS,
  {
    title: "Classroom Flora Light Tracker",
    hook: "Can you measure whether different classroom window orientations change plant phototropism and growth rate?",
    domain: "Environment",
    project_type: "Run an experiment",
    difficulty: "Easy",
    duration: "1–2 weeks",
    estimated_cost: "₹100–₹300",
    age_range: "13–15",
    why_it_matters:
      "Many indoor plants in schools wilt because light levels differ vastly between North and South facing windows. Measuring lux and stem angles proves exactly where classroom greens thrive.",
    what_you_will_learn: [
      "Using smartphone light meters (lux sensors)",
      "Tracking plant phototropism angles with a protractor",
      "Controlling watering and soil variables",
      "Graphing biological growth rates over time",
    ],
    materials: [
      "3 identical bean or pea sprouts in paper cups",
      "Phone with free 'Phyphox' or 'Lux Meter' app",
      "Transparent ruler & protractor",
      "Measuring cup for precise water amounts",
    ],
    steps: [
      {
        number: 1,
        title: "Sprout & Standardize Seedlings",
        description:
          "Germinate 6 bean seeds in damp paper towels and transplant the 3 most uniform sprouts into identical cups.",
        tip: "Keep soil volume and moisture identical across all three.",
      },
      {
        number: 2,
        title: "Map Sunlight Locations",
        description:
          "Place Cup A on a sunny windowsill, Cup B on an interior shelf, and Cup C under artificial fluorescent lighting.",
        tip: "Record lux readings at 9 AM, 12 PM, and 3 PM each day.",
      },
      {
        number: 3,
        title: "Measure Stem Bending & Height",
        description:
          "Measure plant height in millimeters and the stem curvature angle toward the window every 48 hours.",
        tip: "Photograph plants against a grid paper backdrop for precise visual measurements.",
      },
      {
        number: 4,
        title: "Rotate & Test Recovery",
        description:
          "On Day 8, rotate the leaning plant 180 degrees away from the light and record how quickly it re-bends.",
        tip: "Track if stem elongation speeds up when plants are light-starved.",
      },
      {
        number: 5,
        title: "Publish the Green Campus Guide",
        description:
          "Plot growth vs lux and present your recommendations on optimal classroom plant placement to your school garden club.",
        tip: "Bring all three live plants to your presentation so judges see the stark visual contrast.",
      },
    ],
    expected_output:
      "Three documented specimen plants, daily lux and stem angle logs, and a classroom greening guide.",
    presentation_idea:
      "Show a 10-second smartphone time-lapse video of the seedling turning its leaves toward the sun.",
    upgrade_ideas: [
      "Build an automated soil-moisture LED warning stick with an Arduino or BBC micro:bit.",
      "Test different coloured cellophane filters (Red vs Blue light) to see which promotes faster leaf growth.",
    ],
    visual_type: "environment",
    visual_prompt:
      "Isometric botanical experiment setup showing 3 bean seedlings in numbered cups next to a window grid, smartphone lux sensor reading lumens, stem angle protractor measurements, and growth curve graphs.",
    feasibility_score: 96,
    creativity_score: 87,
  },
  {
    title: "The Backpack Spine Sentry",
    hook: "Does your daily school bag exceed the safe 10% bodyweight limit, and does it trigger neck strain during your walk?",
    domain: "Health & Fitness",
    project_type: "Investigate something",
    difficulty: "Easy",
    duration: "1–2 weeks",
    estimated_cost: "₹0–₹200",
    age_range: "13–15",
    why_it_matters:
      "Medical guidelines warn that carrying more than 10–15% of body weight damages teenage posture and causes spinal compression. Most students carry heavy unread textbooks every day.",
    what_you_will_learn: [
      "Biomechanical ergonomics and center-of-gravity principles",
      "Survey design and anthropometric ratio calculations",
      "Designing physical weight-distribution strategies",
      "Formulating school locker policy proposals",
    ],
    materials: [
      "Bathroom or luggage spring scale",
      "Smartphone camera for side-profile posture photography",
      "Survey sheet for 25 classmates (bag weight vs body weight)",
      "Grid tape for wall-mounted postural angle checks",
    ],
    steps: [
      {
        number: 1,
        title: "Survey Campus Bag Loads",
        description:
          "Weigh 25 classmates' bags before morning homeroom on Monday and Friday, calculating the percentage of their body weight.",
        tip: "Categorise bag contents: books, sports gear, water bottles, and stationery.",
      },
      {
        number: 2,
        title: "Profile Forward Head Tilt",
        description:
          "Photograph volunteers from the side walking with and without their bag, measuring head posture angle (craniovertebral angle).",
        tip: "Notice how heavy bags pull the head forward by up to 15 degrees!",
      },
      {
        number: 3,
        title: "Identify Deadweight Items",
        description:
          "Have participants empty their bags to find unneeded items (e.g. gym clothes from Tuesday, novels not being read that day).",
        tip: "The average student carries 1.8 kg of unnecessary items every day.",
      },
      {
        number: 4,
        title: "Test Bag Packing Ergonomics",
        description:
          "Test placing the heaviest books tight against the spine vs far from the back, noting participant comfort ratings.",
        tip: "Lever arm physics proves weight closer to the spine requires significantly less back muscle exertion.",
      },
      {
        number: 5,
        title: "Deliver the Posture Report",
        description:
          "Present your data to the school health committee and propose digital textbook days or locker reorganization.",
        tip: "A side-by-side posture silhouette comparison makes your conclusions immediately undeniable.",
      },
    ],
    expected_output:
      "A complete ergonomic dataset, posture angle photographic proof, and an actionable school bag wellness guideline.",
    presentation_idea:
      "Place two identical bags at your presentation table — one poorly packed and one ergonomically packed — and let visitors feel the lever difference.",
    upgrade_ideas: [
      "Build a pressure-sensing shoulder strap with conductive foam and an Arduino beep alert when overloaded.",
      "Develop a quick web app calculator where students input their timetable to compute minimum bag weight.",
    ],
    visual_type: "science",
    visual_prompt:
      "Isometric biomechanics diagram showing a human posture silhouette with backpack weight vector arrows, luggage scale readout, forward-head tilt angle measurements, and spinal load comparison charts.",
    feasibility_score: 98,
    creativity_score: 90,
  },
  {
    title: "Sound-Sculpt: 3D Acoustic Visualizer",
    hook: "Can you turn different musical frequencies into visible geometric sand patterns using a homemade Chladni plate?",
    domain: "Art & Design",
    project_type: "Create something",
    difficulty: "Medium",
    duration: "1–2 weeks",
    estimated_cost: "₹300–₹800",
    age_range: "13–15",
    why_it_matters:
      "Sound is usually invisible. When acoustic vibrations pass through a metal sheet, nodal resonance lines trap fine grains into astonishing, symmetrical geometric mandalas (Cymatics).",
    what_you_will_learn: [
      "Standing wave harmonics and acoustic resonance",
      "Nodal lines and vibrational frequencies",
      "Speaker audio transducer coupling",
      "Documenting high-speed physical phenomena with macro photography",
    ],
    materials: [
      "Flat square sheet of thin aluminum, brass, or rigid plastic (20cm × 20cm)",
      "Small audio speaker or portable Bluetooth speaker with central post",
      "Fine dry sand, table salt, or black glitter",
      "Smartphone with free Tone Generator app (100 Hz to 2000 Hz)",
      "Clamp, stand, or hot-glue center mount",
    ],
    steps: [
      {
        number: 1,
        title: "Mount the Resonator Plate",
        description:
          "Attach the center of your metal sheet directly to the speaker's center cone using a sturdy bolt or rigid plastic post.",
        tip: "Ensure the edges of the plate are completely free to vibrate without touching the table.",
      },
      {
        number: 2,
        title: "Sprinkle the Particle Medium",
        description:
          "Evenly dust a thin, light layer of fine black sand or table salt across the top surface of the plate.",
        tip: "Less is more: too much sand dampens the delicate vibrations.",
      },
      {
        number: 3,
        title: "Sweep Audio Frequencies",
        description:
          "Play pure sine waves from your phone starting at 200 Hz, slowly dialing upward to find specific resonant nodes.",
        tip: "Watch the sand suddenly dance away from vibrating areas and settle into crystal-sharp lines!",
      },
      {
        number: 4,
        title: "Catalog Harmonic Patterns",
        description:
          "Photograph the exact mandala geometry produced at 440 Hz, 880 Hz, 1200 Hz, and 1760 Hz from directly overhead.",
        tip: "Note how higher frequencies produce increasingly intricate, multi-ringed geometric symmetries.",
      },
      {
        number: 5,
        title: "Curate the Cymatic Gallery",
        description:
          "Mount high-contrast black & white photos of each frequency's wave pattern alongside mathematical wave equations.",
        tip: "Record a short slow-motion video showing the sand snapping into alignment the instant sound starts.",
      },
    ],
    expected_output:
      "A working desktop Cymatic Chladni visualizer and an art-science photo gallery of acoustic standing wave patterns.",
    presentation_idea:
      "Run the speaker live at your exhibit, dial the tone knob, and let the crowd watch the sand snap into new patterns instantly.",
    upgrade_ideas: [
      "Play full songs through the speaker to observe how bass drops vs guitar riffs shatter and reform the patterns.",
      "Cast the sand patterns into permanent resin coasters as commemorative sound art.",
    ],
    visual_type: "art",
    visual_prompt:
      "Isometric technical illustration of a square metal Chladni resonance plate mounted on an audio vibration driver, showing intricate geometric salt wave node lines, smartphone tone generator frequency dial, and wave resonance schematics.",
    feasibility_score: 93,
    creativity_score: 97,
  },
  {
    title: "Solar S'more Oven: The Parabolic Reflector",
    hook: "Can you concentrate free solar energy with recycled cardboard and foil to melt cheese or cook s'mores in 20 minutes?",
    domain: "Science",
    project_type: "Build something",
    difficulty: "Easy",
    duration: "This weekend",
    estimated_cost: "₹100–₹300",
    age_range: "13–15",
    why_it_matters:
      "Solar thermal cooking saves firewood and fossil fuels in developing communities. Building a solar concentrator demonstrates thermodynamics, optics, and green energy with everyday kitchen materials.",
    what_you_will_learn: [
      "Focal points and parabolic reflective geometry",
      "Greenhouse heat trapping (radiation vs conduction)",
      "Thermal insulation techniques",
      "Measuring thermal capture efficiency over time",
    ],
    materials: [
      "Cardboard pizza box or shoebox",
      "Heavy-duty aluminum foil",
      "Black construction paper (for the heat-absorber base)",
      "Clear plastic cling film or acrylic sheet",
      "Cooking or digital probe thermometer",
      "Marshmallows, chocolate, and biscuits",
    ],
    steps: [
      {
        number: 1,
        title: "Engineer the Reflector Flap",
        description:
          "Cut a three-sided flap into the lid of the box and line the inner face with wrinkle-free aluminum foil to bounce sunlight.",
        tip: "Smooth the foil with a soft cloth for maximum mirror-like reflection.",
      },
      {
        number: 2,
        title: "Build the Thermal Absorption Floor",
        description:
          "Line the bottom of the box with matte black paper to absorb incoming optical light and convert it to infrared heat.",
        tip: "Insulate the box bottom with rolled newspaper beneath the black paper to block heat loss.",
      },
      {
        number: 3,
        title: "Seal the Greenhouse Window",
        description:
          "Double-layer clear cling wrap across the lid opening to create an airtight heat-trap chamber.",
        tip: "Tape edges thoroughly; hot air escaping is the #1 reason solar ovens fail.",
      },
      {
        number: 4,
        title: "Angle Toward the Sun & Track Temp",
        description:
          "Prop the reflector flap open with a ruler, orient the box south, and record internal temperature every 5 minutes.",
        tip: "Watch the thermometer climb past 75°C (167°F) on a sunny afternoon!",
      },
      {
        number: 5,
        title: "Test Cooking Rates & Present",
        description:
          "Bake two test s'mores, measure melt time, and calculate total solar thermal energy captured per square meter.",
        tip: "Compare cooking speed on a cloudless day vs partly cloudy conditions.",
      },
    ],
    expected_output:
      "A functioning solar cooker, temperature ramp-up graph, and photographic cooking timeline.",
    presentation_idea:
      "Bring the cooker outside at lunch during the science fair and offer freshly melted solar-cooked treats to the judges.",
    upgrade_ideas: [
      "Construct a true curved 3D parabolic trough using geometric curve templates for 2x faster heating.",
      "Add a miniature 5V solar panel to power a small convection fan inside the chamber.",
    ],
    visual_type: "mechanical",
    visual_prompt:
      "Isometric exploded technical blueprint of a solar box cooker with angled reflective aluminum flap, double-glazed clear film seal, black heat-absorption plate, digital thermometer probe, and sunlight focal ray tracings.",
    feasibility_score: 98,
    creativity_score: 89,
  },
];

export async function generateProject(formData?: ProjectFormData): Promise<SparkProject> {
  // If no form data, this is "Surprise me" mode
  if (!formData) {
    const randomIndex = Math.floor(Math.random() * PROCEDURAL_BLUEPRINTS.length);
    const selected = PROCEDURAL_BLUEPRINTS[randomIndex];
    const validation = validateProjectFeasibility(selected);
    if (validation.isValid) {
      return selected;
    }
    return SAMPLE_PROJECTS[0];
  }

  // Form mode matching:
  // Check if inputs correlate strongly with "Plastic Detective"
  const hasPlasticThought =
    formData.customThought &&
    /plastic|trash|waste|canteen|recycl|environment|rubbish/i.test(formData.customThought);
  const isEnvInvestigate =
    formData.interests.includes("Environment") &&
    (formData.projectType === "Investigate something" || formData.projectType === "Solve a problem");

  if (hasPlasticThought || (isEnvInvestigate && formData.resources.includes("Phone"))) {
    return SAMPLE_PROJECTS[0]; // Plastic Detective
  }

  // Check tech / electronics match
  const hasElectronics =
    formData.resources.includes("Electronics / Arduino") ||
    formData.interests.includes("Technology") ||
    formData.interests.includes("AI & Robotics");
  const wantsBuild =
    formData.projectType === "Build something" || formData.projectType === "Build with AI";

  if (hasElectronics && wantsBuild) {
    if (formData.customThought && /noise|sound|quiet|listen|audio/i.test(formData.customThought)) {
      return SAMPLE_PROJECTS[1]; // Classroom Whisper Guard
    }
    if (formData.interests.includes("AI & Robotics")) {
      return SAMPLE_PROJECTS[5]; // AI Cafeteria Tray Scanner
    }
    return SAMPLE_PROJECTS[1]; // Whisper Guard
  }

  // Check psychology / audio match
  if (
    formData.interests.includes("Psychology") ||
    (formData.customThought && /music|beat|study|focus|brain|reaction/i.test(formData.customThought))
  ) {
    return SAMPLE_PROJECTS[3]; // Focus & Beat
  }

  // Check Space / Mechanical match
  if (
    formData.interests.includes("Space") ||
    (formData.customThought && /rover|mars|robot|wheel|car/i.test(formData.customThought))
  ) {
    return SAMPLE_PROJECTS[6]; // Mars Rocker-Bogie Rover
  }

  // Check Art / Design match
  if (formData.interests.includes("Art & Design")) {
    return PROCEDURAL_BLUEPRINTS.find((p) => p.visual_type === "art") || SAMPLE_PROJECTS[0];
  }

  // Find best domain match from curated database
  const matchingDomain = PROCEDURAL_BLUEPRINTS.filter((p) =>
    formData.interests.some((interest) => p.domain.toLowerCase().includes(interest.toLowerCase()))
  );

  if (matchingDomain.length > 0) {
    return matchingDomain[Math.floor(Math.random() * matchingDomain.length)];
  }

  // Default fallback to high-quality project matching difficulty/time
  return PROCEDURAL_BLUEPRINTS[Math.floor(Math.random() * PROCEDURAL_BLUEPRINTS.length)];
}
