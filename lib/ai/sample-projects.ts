import { SparkProject } from "@/types/project";

export const SAMPLE_PROJECTS: SparkProject[] = [
  {
    title: "Plastic Detective",
    hook: "Can you discover where most of your school's plastic waste actually comes from?",
    domain: "Environment",
    project_type: "Investigate something",
    difficulty: "Easy",
    duration: "7–10 days",
    estimated_cost: "₹0–₹500",
    age_range: "13–15",
    why_it_matters:
      "Most schools produce hundreds of single-use bottles and snack wrappers daily without knowing which periods or areas create the most rubbish. By pinpointing the peak hotspots, you can propose targeted changes that actually make a difference.",
    what_you_will_learn: [
      "Collecting and categorising real-world field data",
      "Spreadsheet analysis and visual trend charting",
      "Designing controlled mini-interventions",
      "Presenting persuasive findings to school leaders",
    ],
    materials: [
      "Smartphone camera or notebook",
      "Google Sheets or Excel",
      "Protective gloves",
      "Kitchen luggage spring scale (optional)",
      "Recycling sorting bins or sacks",
    ],
    steps: [
      {
        number: 1,
        title: "Observe & Map",
        description:
          "Pick three high-traffic school spots (canteen, hallway, playground) and photograph waste bins before and after lunch for 5 days.",
        tip: "Take photos from the same angle each day for easy visual comparison.",
      },
      {
        number: 2,
        title: "Collect & Categorise",
        description:
          "With gloves on, count and log items into four categories: drink containers, plastic cutlery/straws, chip wrappers, and cling wrap.",
        tip: "Weighing bag totals takes less than 3 minutes and gives solid quantitative metrics.",
      },
      {
        number: 3,
        title: "Analyse Patterns",
        description:
          "Chart daily volume by zone to find your school's 'plastic epicenter' and identify the single most common throwaway item.",
        tip: "Calculate the estimated yearly count (e.g. 80 wrappers/day × 200 school days).",
      },
      {
        number: 4,
        title: "Deploy One Change",
        description:
          "Test one low-friction intervention for 5 days: e.g. a 'Wrapper-Free Wednesday' challenge or placing dedicated bottle recycling crates right next to the vending area.",
        tip: "Make signs with bold visual icons rather than long text.",
      },
      {
        number: 5,
        title: "Compare & Pitch",
        description:
          "Graph your baseline week versus the test week and present your data-backed recommendations to your science teacher or principal.",
        tip: "Physical before/after photo boards grab far more attention than slides alone.",
      },
    ],
    expected_output:
      "A complete two-week waste dataset, comparative bar charts, and a tested school policy proposal.",
    presentation_idea:
      "Set up an interactive display table showing a 1-day tower of collected plastic next to your infographic chart.",
    upgrade_ideas: [
      "Turn your spreadsheet into an interactive web dashboard for student councils.",
      "Calculate the carbon footprint equivalence of the plastic saved using free EPA conversion factors.",
    ],
    visual_type: "environment",
    visual_prompt:
      "Isometric school waste-monitoring station with labelled color-coded bins (Plastics, Compost, Landfill), smartphone digital audit log, spreadsheet trend chart on laptop, measurement spring scale, and before-and-after reduction metrics.",
    feasibility_score: 96,
    creativity_score: 88,
  },
  {
    title: "Classroom Whisper Guard",
    hook: "Can you build a glowing sound traffic light that automatically keeps classroom noise at study volume?",
    domain: "Technology",
    project_type: "Build something",
    difficulty: "Medium",
    duration: "1–2 weeks",
    estimated_cost: "₹800–₹1,500",
    age_range: "13–15",
    why_it_matters:
      "Teachers constantly waste voice energy telling students to quiet down. An impartial visual indicator gives everyone instant feedback without anyone needing to shout.",
    what_you_will_learn: [
      "Interfacing microphone sensors with Arduino or BBC micro:bit",
      "Analog signal threshold calibration in block code or C++",
      "Designing clear visual cues with multi-colour LEDs",
      "Documenting user behavior changes in a shared space",
    ],
    materials: [
      "Arduino Uno or BBC micro:bit",
      "Analog Sound Sensor module (KY-038 or similar)",
      "RGB LED strip or 3 standard LEDs (Green, Yellow, Red)",
      "Cardboard or frosted acrylic diffuser box",
      "USB power bank or 9V battery pack",
    ],
    steps: [
      {
        number: 1,
        title: "Wire the Sound Sensor",
        description:
          "Connect the microphone module's VCC, GND, and Analog Out pins to your microcontroller board using jumper wires.",
        tip: "Use a breadboard first to verify connections before placing in a box.",
      },
      {
        number: 2,
        title: "Calibrate Ambient Decibels",
        description:
          "Write a simple loop that prints raw audio levels into the serial plotter during a quiet library period vs noisy recess.",
        tip: "Set thresholds: Green < 45dB, Yellow 45-65dB, Red > 65dB.",
      },
      {
        number: 3,
        title: "Program Visual Thresholds",
        description:
          "Code logic so steady green glows during quiet study, yellow pulses when volume creeps up, and red flashes if it stays loud for >3 seconds.",
        tip: "Add a 2-second debounce timer so a single dropped pencil doesn't trip red.",
      },
      {
        number: 4,
        title: "Craft the Enclosure",
        description:
          "Construct an eye-level desk tower using recycled card or frosted plastic sheets to diffuse the LEDs softly.",
        tip: "A semi-transparent front cover makes the glow visible from across the room.",
      },
      {
        number: 5,
        title: "Test During Study Hall",
        description:
          "Run the monitor for three class periods and record how many times the class self-corrected before the teacher had to speak.",
        tip: "Survey 10 classmates afterwards on whether it helped their concentration.",
      },
    ],
    expected_output:
      "A working stand-alone sound monitor unit with calibrated sensitivity and real classroom testing logs.",
    presentation_idea:
      "Bring the device to your science expo, clap your hands or speak at different volumes, and let visitors test the response in real time.",
    upgrade_ideas: [
      "Add a small buzzer with a chime when volume returns to green.",
      "Log decibel timestamps to an SD card or micro:bit Bluetooth radio to graph daily noise peaks.",
    ],
    visual_type: "electronics",
    visual_prompt:
      "Isometric technical blueprint of an Arduino Uno connected to an analog sound detection microphone module, breadboard wiring with resistors, and an RGB LED traffic light tower with frosted acrylic diffuser shell and pinout callouts.",
    feasibility_score: 93,
    creativity_score: 91,
  },
  {
    title: "Classroom Energy Vampire Hunter",
    hook: "Which forgotten plugged-in devices in your school are quietly burning electricity 24/7?",
    domain: "Science",
    project_type: "Investigate something",
    difficulty: "Easy",
    duration: "1–2 weeks",
    estimated_cost: "₹300–₹800",
    age_range: "13–15",
    why_it_matters:
      "Phantom load (electricity consumed by appliances in standby mode) accounts for up to 10% of building utility bills. Hunting them down can save actual school funds.",
    what_you_will_learn: [
      "Measuring AC power (Watts, Volts, Amps) safely",
      "Calculating cumulative kilowatt-hours (kWh) and real monetary costs",
      "Creating clear data visualizations of hidden waste",
      "Proposing automated power-strip shutoff schedules",
    ],
    materials: [
      "Plug-in energy meter (Kill-a-Watt style meter) or school facility meter",
      "Notebook or spreadsheet",
      "Inventory checklist of school tech (projectors, printers, water coolers, laptops)",
      "Colored sticker dots (Red = High Standby, Green = Efficient)",
    ],
    steps: [
      {
        number: 1,
        title: "Audit School Hardware",
        description:
          "Walk through classrooms and labs with teacher permission, compiling a list of 15 appliances that stay plugged in overnight.",
        tip: "Check computer labs, staff lounges, and smart-board power supplies.",
      },
      {
        number: 2,
        title: "Measure Active vs Standby Watts",
        description:
          "Plug the power meter into the wall, connect each device, and note power draw when active vs when switched 'off'.",
        tip: "Some microwave displays or laser printers pull 15–20W continuously while sleeping!",
      },
      {
        number: 3,
        title: "Calculate Annual Waste",
        description:
          "Multiply standby wattage by 6,000 non-school hours per year to compute wasted kWh and total financial cost at local electricity rates.",
        tip: "Formula: (Watts × Hours / 1000) × Local Rate per kWh.",
      },
      {
        number: 4,
        title: "Test Smart Switch Schedules",
        description:
          "Borrow or set up a ₹400 mechanical timer plug on the worst culprit (e.g. computer lab charging cart) to kill power between 6 PM and 7 AM.",
        tip: "Track whether device performance or battery life is impacted in any way.",
      },
      {
        number: 5,
        title: "Deliver the Power Brief",
        description:
          "Design a 1-page executive summary for the school facilities manager showing how many thousands of rupees can be saved each term.",
        tip: "Frame the savings in terms of student resources (e.g. 'This phantom power equals 12 new science kits each year').",
      },
    ],
    expected_output:
      "A complete phantom power audit report with breakdown charts and an estimated yearly cost saving estimate.",
    presentation_idea:
      "Display an actual Kill-a-Watt meter hooked to an idle laptop charger showing non-zero wattage live at your booth.",
    upgrade_ideas: [
      "Build an IoT smart plug using an ESP32 microcontroller with a web dashboard.",
      "Organize an inter-class competition to see which classroom reduces idle plug count the most.",
    ],
    visual_type: "blueprint",
    visual_prompt:
      "Isometric exploded diagram of a digital wall plug power meter measuring idle standby wattage from chargers and projectors, with circuit flow arrows, kWh conversion formula callouts, and standby power comparison graph.",
    feasibility_score: 98,
    creativity_score: 85,
  },
  {
    title: "Focus & Beat: The Study Rhythm Test",
    hook: "Does listening to Lo-Fi beats, video game soundtracks, or pure silence produce faster reaction times and recall?",
    domain: "Psychology",
    project_type: "Run an experiment",
    difficulty: "Easy",
    duration: "1–2 weeks",
    estimated_cost: "₹0",
    age_range: "13–15",
    why_it_matters:
      "Almost every teen studies with headphones, but opinions are divided. Video game music is engineered to keep players immersed without distracting them. Testing this empirically produces real, actionable student insights.",
    what_you_will_learn: [
      "Formulating clear scientific hypotheses with control groups",
      "Eliminating confounding variables in human subject testing",
      "Statistical calculations (mean, median, standard deviation)",
      "Translating behavioral data into personal study strategies",
    ],
    materials: [
      "Laptop or tablet with internet access",
      "Free online memory/reaction test (e.g. Human Benchmark)",
      "Headphones",
      "Three audio tracks: Silence, 80 BPM Lo-Fi beats, Fast lyrical pop",
      "15–20 student volunteer participants",
    ],
    steps: [
      {
        number: 1,
        title: "Design the Test Battery",
        description:
          "Create a standardized 5-minute cognitive test: 10 digit-span memory questions and 10 tap-reaction trials.",
        tip: "Make sure all participants use identical testing rules and screen brightness.",
      },
      {
        number: 2,
        title: "Establish the Silent Baseline",
        description:
          "Test all participants under pure silence first to establish individual baseline scores.",
        tip: "Randomize the order of music tracks for subsequent rounds to avoid learning bias.",
      },
      {
        number: 3,
        title: "Run Audio Test Conditions",
        description:
          "Test subjects under Condition A (video game background music), Condition B (lyrical pop songs), and Condition C (brown noise).",
        tip: "Keep headphone volume locked at a comfortable 50% across all subjects.",
      },
      {
        number: 4,
        title: "Aggregate & Graph Results",
        description:
          "Plot individual scores and group averages in a scatter plot or bar chart to see if error rates spiked during lyrical music.",
        tip: "Look for outliers: did some students perform noticeably better with rhythmic beats?",
      },
      {
        number: 5,
        title: "Publish the 'Study Soundtrack Guide'",
        description:
          "Synthesize your findings into a practical 1-page guide recommending optimal study audio for math vs essay writing.",
        tip: "Include quotes from participants describing how the audio felt subjectively.",
      },
    ],
    expected_output:
      "A complete empirical psychology paper with charts, participant test data, and study recommendations.",
    presentation_idea:
      "Let visitors take a live 60-second reaction test with headphones at your booth while you log their score on a live leaderboard.",
    upgrade_ideas: [
      "Code your own custom reaction web app in HTML/JavaScript instead of using third-party sites.",
      "Test heart rate variability using a smartwatch during high-stress math problems.",
    ],
    visual_type: "science",
    visual_prompt:
      "Isometric cognitive testing station with participant wearing noise-canceling headphones, tablet displaying digital reaction latency test, brain wave audio frequency waveform visualizations, and comparative error rate bar charts.",
    feasibility_score: 97,
    creativity_score: 89,
  },
  {
    title: "Bio-Purifier: The Gravity Water Column",
    hook: "Can you engineer a low-cost, multi-stage water filter from natural materials that clarifies turbid water to crystal clear?",
    domain: "Science",
    project_type: "Build something",
    difficulty: "Medium",
    duration: "1–2 weeks",
    estimated_cost: "₹200–₹500",
    age_range: "13–15",
    why_it_matters:
      "Over 2 billion people worldwide lack safe drinking water. Understanding filtration mechanics through hands-on physical building teaches core environmental chemistry and fluid mechanics.",
    what_you_will_learn: [
      "Mechanical filtration vs activated adsorption",
      "Particle size fractionation and flow rates",
      "Turbidity measurement using Secchi disk or smartphone light meter",
      "Iterative engineering design (testing layer depths)",
    ],
    materials: [
      "Clear 2-liter recycled plastic bottle",
      "Activated charcoal (aquarium grade or crushed BBQ charcoal)",
      "Coarse sand and fine silica sand",
      "Clean river pea pebbles",
      "Cotton rounds / cheesecloth mesh",
      "Turbid test water (tap water mixed with measured clay soil)",
    ],
    steps: [
      {
        number: 1,
        title: "Cut & Prep the Column",
        description:
          "Cut the bottom off a 2-liter bottle and invert it. Pack a tight plug of natural cotton wool into the bottleneck.",
        tip: "Wash all sand and gravel in clean water beforehand to remove loose dust.",
      },
      {
        number: 2,
        title: "Layer the Media by Grain Size",
        description:
          "Build vertical strata: 4cm crushed activated charcoal, 5cm fine sand, 5cm coarse sand, and 5cm gravel on top.",
        tip: "Pour each layer slowly so they remain distinct strata without mixing.",
      },
      {
        number: 3,
        title: "Mix Standard Turbid Sample",
        description:
          "Create reproducible 'dirty' test water by mixing 2 tablespoons of garden soil into 1 liter of water, stirring vigorously.",
        tip: "Measure pre-filter clarity by reading printed text through a beaker of the sample.",
      },
      {
        number: 4,
        title: "Measure Flow Rate & Clarity",
        description:
          "Pour 500ml through the column, timing with a stopwatch how many minutes it takes to filter and measuring effluent clarity.",
        tip: "Test with a smartphone light sensor: shine a flashlight through the water and measure lux.",
      },
      {
        number: 5,
        title: "Iterate Layer Thickness",
        description:
          "Modify the depth of the activated charcoal layer and compare how much more dissolved dye/odor it removes.",
        tip: "Test with food colouring to see adsorption in real time.",
      },
    ],
    expected_output:
      "A functioning transparent gravity filtration column, flow rate vs clarity data tables, and water test tubes.",
    presentation_idea:
      "Perform a live filtration pour in front of science fair attendees and show the dirty water coming out clear.",
    upgrade_ideas: [
      "Test microbial reduction using inexpensive nutrient agar petri dishes.",
      "Design a 3D printed screw-on modular connector for standard bottle threads.",
    ],
    visual_type: "science",
    visual_prompt:
      "Isometric technical cross-section of a transparent multi-layer gravity water filtration column showing labeled strata (gravel, coarse sand, fine sand, activated charcoal, cotton mesh), flow rate indicator arrows, and turbidity test vials.",
    feasibility_score: 95,
    creativity_score: 90,
  },
  {
    title: "AI Cafeteria Tray Scanner",
    hook: "Can you train a computer vision model on your laptop to identify whether lunch trash is recyclable, compostable, or landfill in 0.2 seconds?",
    domain: "AI & Robotics",
    project_type: "Build with AI",
    difficulty: "Medium",
    duration: "1–2 weeks",
    estimated_cost: "₹0",
    age_range: "13–15",
    why_it_matters:
      "Over 30% of recyclable material gets contaminated because students aren't sure which bin to use in a crowded cafeteria. An AI camera gives instant guidance.",
    what_you_will_learn: [
      "Image classification fundamentals and training dataset curation",
      "Training machine learning models with Google Teachable Machine",
      "Exporting TensorFlow.js models into an interactive web interface",
      "Evaluating precision, false positives, and edge cases",
    ],
    materials: [
      "Laptop or Chromebook with webcam",
      "Free browser access to Google Teachable Machine",
      "Sample lunch items (apple cores, chip packets, milk cartons, utensils)",
      "Simple HTML/JS template or Webflow prototype",
    ],
    steps: [
      {
        number: 1,
        title: "Curate Training Images",
        description:
          "Capture 50 photos each under different lighting angles for 4 distinct classes: Compost, Clean Paper, Plastic/Can, and Landfill.",
        tip: "Include half-eaten items and crushed cartons to simulate real-world cafeteria debris.",
      },
      {
        number: 2,
        title: "Train the Classifier",
        description:
          "Upload classes to Teachable Machine, tune training epochs to 50, and inspect the confusion matrix for misclassifications.",
        tip: "Look out for false positives (e.g. shiny foil snack bags mistakenly labeled as aluminum cans).",
      },
      {
        number: 3,
        title: "Build the Scanner Web UI",
        description:
          "Export the model to TensorFlow.js and embed it into a single-page HTML app with a big green/yellow/blue feedback card.",
        tip: "Add large friendly icons so students can glance at it from 2 meters away.",
      },
      {
        number: 4,
        title: "Field Test with Real Trays",
        description:
          "Set up the laptop at a cafeteria disposal station for one lunch period and count how many items students test.",
        tip: "Record classification accuracy: how many times did it get the bin right?",
      },
      {
        number: 5,
        title: "Document Accuracy & Edge Cases",
        description:
          "Write up an analysis of where the vision model struggled (e.g. transparent plastic wrap) and how more training data solves it.",
        tip: "Display the accuracy percentage prominently on your poster board.",
      },
    ],
    expected_output:
      "A working interactive web camera app that accurately classifies waste items live in real time.",
    presentation_idea:
      "Set up your webcam at the exhibition table and invite visitors to hold up snacks or waste items for the AI to classify.",
    upgrade_ideas: [
      "Connect the web app to a micro:bit servo motor that physically opens the lid of the correct bin!",
      "Add audio feedback announcing 'Compost bin!' via the browser SpeechSynthesis API.",
    ],
    visual_type: "app",
    visual_prompt:
      "Isometric layout of a laptop webcam scanning a school lunch tray with bounding box recognition overlays, classification confidence percentage gauges, and color-coded destination bin arrows (Compost, Recycle, Landfill).",
    feasibility_score: 92,
    creativity_score: 95,
  },
  {
    title: "Mars Rocker-Bogie Rover Chassis",
    hook: "Can you build a miniature mechanical suspension system that crawls over obstacles twice its wheel diameter without tipping?",
    domain: "Space",
    project_type: "Build something",
    difficulty: "Challenging",
    duration: "2–3 weeks",
    estimated_cost: "₹500–₹1,200",
    age_range: "13–15",
    why_it_matters:
      "NASA's Curiosity and Perseverance rovers use the rocker-bogie mechanism because it maintains all 6 wheels on uneven Martian terrain without any springs or axles.",
    what_you_will_learn: [
      "Kinematic linkages and mechanical pivot balance",
      "Center of mass calculation for stable robotics",
      "Prototyping with laser-cut cardboard, foam-core, or 3D printed arms",
      "Testing angle of repose and obstacle clearance limits",
    ],
    materials: [
      "Rigid cardboard, foam-core board, or craft wood strips",
      "6 matching toy wheels or bottle caps with rubber bands",
      "M3 bolts and locknuts (or wooden dowels/skewers) for pivot joints",
      "Differential pivot bar (coat hanger wire or bamboo skewer)",
      "Hot glue gun or PVA wood glue",
    ],
    steps: [
      {
        number: 1,
        title: "Draft the Linkage Geometry",
        description:
          "Sketch the 2:1 rocker and bogie arm proportions on grid paper, marking exact pivot points so wheels stay equidistant.",
        tip: "Keep the center pivot slightly higher than the wheel centers for stability.",
      },
      {
        number: 2,
        title: "Cut & Assemble Suspension Arms",
        description:
          "Cut left and right rocker and bogie arm pairs from stiff cardboard, drilling clean holes for low-friction pivot joints.",
        tip: "Use nylon washers or small plastic beads between joints so arms swing freely.",
      },
      {
        number: 3,
        title: "Connect the Differential Bar",
        description:
          "Link the left and right rockers across the chassis roof with a central pivot bar so when one side tilts up, the other presses down.",
        tip: "This differential bar is the secret that keeps the central payload box level.",
      },
      {
        number: 4,
        title: "Construct Martian Obstacle Course",
        description:
          "Build a test ramp with books, wooden blocks, and stones of increasing height (1cm up to 8cm).",
        tip: "Place a smartphone running a level app on the rover body to measure tilt angles.",
      },
      {
        number: 5,
        title: "Log Maximum Climbing Heights",
        description:
          "Record how the chassis distributes weight as wheels climb stairs, and calculate the maximum step height relative to wheel size.",
        tip: "Film slow-motion video with your phone to show the bogie joint flexing.",
      },
    ],
    expected_output:
      "A fully assembled 6-wheel articulated rocker-bogie scale chassis and an obstacle traversal engineering log.",
    presentation_idea:
      "Build a rocky red-sand terrarium box at your booth and roll the rover over miniature boulders to demonstrate suspension mechanics.",
    upgrade_ideas: [
      "Add two small geared DC motors to make it an active motorized remote-controlled rover.",
      "Mount a solar cell on top that charges a supercapacitor while driving under bright lamps.",
    ],
    visual_type: "mechanical",
    visual_prompt:
      "Isometric exploded technical blueprint of a 6-wheel rocker-bogie rover chassis showing rocker arms, bogie pivot joints, differential bar linkage, center-of-mass indicator, and wheel climb angle annotations.",
    feasibility_score: 90,
    creativity_score: 96,
  },
  {
    title: "Urban Heat Island School Map",
    hook: "Are school playgrounds up to 10°C hotter than nearby parks simply because of dark asphalt surfaces?",
    domain: "Social Impact",
    project_type: "Investigate something",
    difficulty: "Easy",
    duration: "1–2 weeks",
    estimated_cost: "₹400–₹900",
    age_range: "13–15",
    why_it_matters:
      "Dark concrete and asphalt absorb solar radiation, creating dangerous microclimates for kids during sports. Mapping local temperatures provides direct evidence for planting shade trees.",
    what_you_will_learn: [
      "Infrared thermometry and surface albedo effects",
      "Geographic mapping and microclimate surveying",
      "Data normalisation across varying times of day",
      "Environmental urban planning advocacy",
    ],
    materials: [
      "Non-contact Infrared (IR) laser thermometer",
      "School campus satellite map printout or Google My Maps",
      "Notebook and colored markers",
      "Digital camera to document surface textures",
    ],
    steps: [
      {
        number: 1,
        title: "Survey Site Selection",
        description:
          "Select 8 diverse campus surfaces: black asphalt court, concrete path, natural grass, shaded tree patch, rubber play mat, and metal bench.",
        tip: "Label each station clearly on your base map.",
      },
      {
        number: 2,
        title: "Log Surface Temperatures Daily",
        description:
          "Measure all 8 points at 8:30 AM, 12:30 PM, and 4:00 PM for 5 sunny school days, holding the IR thermometer at exactly 1 meter distance.",
        tip: "Record ambient air temperature alongside surface temperatures for contrast.",
      },
      {
        number: 3,
        title: "Map the Heat Footprint",
        description:
          "Color-code your campus map like a heat map (Blue = <25°C, Orange = 25-35°C, Deep Red = >40°C).",
        tip: "Notice the dramatic difference between tree-shaded grass and open asphalt!",
      },
      {
        number: 4,
        title: "Model Shading Interventions",
        description:
          "Calculate how much cooler high-traffic play areas would be if shade sails or native leafy trees covered 40% of the open court.",
        tip: "Interview physical education teachers about how afternoon heat affects student play.",
      },
      {
        number: 5,
        title: "Pitch the 'Cool Campus' Plan",
        description:
          "Assemble an infographic showing the 10°C temperature disparity and submit a proposal for green canopy installations.",
        tip: "Present the thermal map as an overlay on a poster board.",
      },
    ],
    expected_output:
      "A detailed campus heat map, diurnal thermal gradient charts, and a practical shade canopy recommendation.",
    presentation_idea:
      "Bring an IR laser thermometer and heat lamps with different material tiles (grass, asphalt, light tile) so visitors can test surface temperatures live.",
    upgrade_ideas: [
      "Use GIS mapping software like QGIS or Google Earth Engine to overlay satellite thermal imagery.",
      "Test cool-roof reflective white paints on miniature model doghouses.",
    ],
    visual_type: "environment",
    visual_prompt:
      "Isometric campus architectural map showing infrared temperature gradient overlays (blue to red hotspots), hand-held laser thermometer targeting asphalt vs grassy shade zones, and surface albedo reflection diagrams.",
    feasibility_score: 97,
    creativity_score: 91,
  },
];
