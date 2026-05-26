import { CountryDNA, GenreBrief } from "./types";

export const COUNTRIES: CountryDNA[] = [
  {
    code: "US",
    name: "United States",
    accentColor: "#FF6B35", // Electric Orange
    motto: "West-Coast Cyber & Delta Groundings",
    identityStatement: "Tightly engineered modular synthetic grooves combined with traditional Southern country-acoustic string pickups.",
    sonicDNAString: "High transient click 808s, rhythmic vocal compression ratios, resonant 12-string guitars, micro-tuned slide overlays.",
    genres: ["Dance Pop", "Hip-Hop", "Electro-Folk", "Neo-Grunge", "Indie Synth"],
    hardRules: [
      "HR-USA-01: Hook must arrive within 20 seconds for optimal commercial standard.",
      "HR-USA-02: Every verse line must contain a Concrete Image (photographable noun).",
      "HR-USA-03: Maximum cliché count must not exceed 2 per chorus section."
    ],
    benchmarks: [
      "Billboard Hot 100 Champion Proximity (Gold Tier)",
      "Max Martin Vocals Density Metric (92%)",
      "Metro Boomin' Sub-low Distortion Ratio (>0.82)",
      "Interstellar Stereo Width Threshold (140%)",
      "High Transient Snare Compression Peak (6.2dB)",
      "Vocal Frequency Dynamic Shelf Alignment",
      "Chorus-Drop Sub-Bass Fundamental Peak (52Hz)",
      "Cliché Avoidance Ratio (>94%)",
      "Digital Loudness Master Metric (-8.2 LUFS)"
    ]
  },
  {
    code: "KR",
    name: "South Korea",
    accentColor: "#FF4ECD", // K-Pop Magenta
    motto: "Performance Dominance — the song is inseparable from how it looks, moves, and presents on stage",
    identityStatement: "Hyper-melodic maximalist hooks backed by traditional Gayageum cascades and classical string sections under aggressive parallel compression.",
    sonicDNAString: "Gayageum granular synthesis, pentatonic microtonal clusters, high-frequency synth lead stabs, 7-part vocal stack harmonies, Dark Concept orchestral-trap fusion.",
    genres: ["K-Pop", "Chamber-Bass", "Hyper-R&B", "Gukak-Fusion"],
    hardRules: [
      "Hard Rule HR-KR-01: Pre-Chorus System is mandatory; no song may transition directly from Verse to Chorus.",
      "Hard Rule HR-KR-02: Point Section (Signature Move) must be identifiable in the lyric structure.",
      "Hard Rule HR-KR-03: Minimum vocal layering constraint: 4-part spread with alternating panning maps."
    ],
    benchmarks: ["Melon Top 100 Resonance Target", "Stray Kids' Percussion Density Metric (88%)", "Choreography Integration Coherence Quotient (>94%)"]
  },
  {
    code: "BR",
    name: "Brazil",
    accentColor: "#2E7D32", // Amazonian Green
    motto: "Favela-Industrial & Bossa-Granular",
    identityStatement: "Polyrhythmic Batucada samba layers clashing against abrasive mechanical distortion and warm, jazzy granular chords.",
    sonicDNAString: "Surdo drum low-frequency transients, granular nylon guitar phrases, 130bpm syncopated snaps, rapid vocal rhythmic stabs.",
    genres: ["Favela Funk", "Granular Bossa", "Samba-Bass", "Nordeste-Electro"],
    hardRules: [
      "CR-BR-01: Syncopated percussion loops must deviate from the grid by at least 12% swing offset.",
      "CR-BR-02: Bossa-jazz chord voicing must retain a minor 9th or major 7th tension anchor.",
      "CR-BR-03: Surdo drum peak fundamental must register exactly between 48Hz and 54Hz."
    ],
    benchmarks: ["Baile Funk underground saturation index", "Bossa-Nova classic chord authenticity registry"]
  },
  {
    code: "JP",
    name: "Japan",
    accentColor: "#FF3366", // Hinomaru Red
    motto: "Shibuya-Neon Maximalism & Gagaku",
    identityStatement: "Rapid 170BPM chord progressions utilizing complex jazz extensions, overlaid with traditional Shakuhachi breath contours.",
    sonicDNAString: "Shakuhachi dynamic breath tracking, 8-bit chip-tune noise grids, 13th-chord progressions, modal Gamelan clusters.",
    genres: ["J-Rock", "Shibuya-Kei", "Gagaku-Electro", "Neo-Vocaloid"],
    hardRules: [
      "CR-JP-01: Pentatonic pitch shifts (Miyako-bushi scale) must map to Shakuhachi pitch curves.",
      "CR-JP-02: Maximum tempo change threshold: 175BPM; chord adjustments must lock to 1/16th steps.",
      "CR-JP-03: Chorus vocal lines must double-track in high octaves with zero pitch correction artefacts."
    ],
    benchmarks: ["Oricon Chart Harmonic Structural Target", "Sega retro chiptune waveform compliance"]
  },
  {
    code: "ZA",
    name: "South Africa",
    accentColor: "#E0A96D", // Amapiano Gold
    motto: "Amapiano Log-Drum Mastery & Deep Spiritualism",
    identityStatement: "Hypnotic deep house synth lines underpins the iconic woodblock log-drum transients, combined with Zulu choral chants.",
    sonicDNAString: "FM log-drum synthesis, 113BPM syncopated shaker loop, warm Rhodes electric piano triads, Zulu call-and-response vocal logs.",
    genres: ["Amapiano", "Gqom-Industrial", "Deep Spiritual House", "Kwaito-Neo"],
    hardRules: [
      "CR-ZA-01: The FM log-drum must never occupy the same stereo space as the kick; sidechain is mandatory.",
      "CR-ZA-02: Intros must extend past 64 bars to induce hypnotic cultural state compliance.",
      "CR-ZA-03: Choral overlays must use natural acoustic vocal spaces without synthetic artificial reverb bounds."
    ],
    benchmarks: ["Soweto Sound System low-pass compliance", "Kabza De Small Log-Drum Transient Response"]
  },
  {
    code: "NG",
    name: "Nigeria",
    accentColor: "#00E676", // Afrobeats Green
    motto: "Afrobeats Rhythmic Poly-Weave & Highlife",
    identityStatement: "Interlocking talking-drum rhythms moving alongside contemporary Afro-synth pads and rich Pidgin vocal melodies.",
    sonicDNAString: "Talking drum rhythmic sweeps, sax-section unison brass, sub-harmonic 808 bumps, Afrobeat guitar loops.",
    genres: ["Afrobeats", "Afro-Fusion", "Neo-Highlife", "Gbedu-Street"],
    hardRules: [
      "CR-NG-01: Talking drum high pitch accents must align with vocal hook melodies.",
      "CR-NG-02: Vocal takes must skip electronic autotune; manual Pitch-correction curves only.",
      "CR-NG-03: Brass stabs must utilize organic trumpet acoustic files over standard synthesizer outputs."
    ],
    benchmarks: ["Lagos Street Sound Intelligibility Quotient", "Burna Boy dynamic percussion weave parameters"]
  },
  {
    code: "IN",
    name: "India",
    accentColor: "#FF9933", // Saffron Amber
    motto: "India = Emotion & Melody Master — the melody must pierce the heart within the first 20 seconds without words",
    identityStatement: "Classical Sitar micro-tuning sweeps integrated into high-energy contemporary Punjabi dhol beats, orchestral cinematic fusions, and pure Raga-modal architectures.",
    sonicDNAString: "Sitar virtuosic meend (pitch sweeps), rhythmic dhol and tabla transients, classical ragas (Yaman/Bhairavi), and vocal ornamentations (gamak, meend, murki).",
    genres: ["Raga-Electro", "Punjabi Pop", "Sufi-Industrial", "Vedic-Chant Synth"],
    hardRules: [
      "Hard Rule HR-IN-01: Raga/Scale Compliance — Melodic hooks must be consistent with the Raga specified in the Subgenre DNA Brief.",
      "Hard Rule HR-IN-02: Vocal Ornamentation — Lines must indicate where gamak, meend, or murki occur through phrasing structure.",
      "Hard Rule HR-IN-03: No translated Western phrasing; lyrics must be conceived from emotion outward in the target language."
    ],
    benchmarks: [
      "A.R. Rahman String-Ensemble Harmonic Density Quotient (>92%)",
      "Vocal Ornamentation Gamak/Meend Nuance Tracker",
      "Raga Compliance Aroha/Avaroha Melodic Consistency Checker",
      "Emotion Impact Pierce-the-Heart 15s Saliency Target",
      "Golden Hour Scene Visual Pacing Index"
    ]
  },
  {
    code: "JM",
    name: "Jamaica",
    accentColor: "#FFEB3B", // Reggae Yellow
    motto: "Dub-System Analog Sub-Weight",
    identityStatement: "Ultraweight basslines dropping into spacious delay loops, rimshot delays, and authentic patois chants.",
    sonicDNAString: "30Hz sub-bass sine waves, analog spring reverb feedback, syncopated guitar skanks, dynamic horn sweeps.",
    genres: ["Roots Reggae", "Heavy Dub-Step", "Dancehall-Hyper", "Ska-Infused"],
    hardRules: [
      "CR-JM-01: Basslines must utilize strict 40Hz low-passing to ensure correct sound system activation.",
      "CR-JM-02: Spring-reverb feedback must lock to triplet delay grid dimensions.",
      "CR-JM-03: Patois lyrics must translate structurally to cultural validation models."
    ],
    benchmarks: ["King Tubby Spring Reverberation Quotient", "Kingston Dub-System Sound pressure target"]
  },
  {
    code: "GB",
    name: "United Kingdom",
    accentColor: "#00F5FF", // Neon Cyan
    motto: "UK = Culture Dominance — Underground scene-authentic production & class-conscious worldview",
    identityStatement: "Abrasive gliding sub-bass, rapid 140BPM syncopated hi-hats, and gritty socio-realistic lyric flows centered in authentic UK scenes.",
    sonicDNAString: "Sliding 808 sub-pitch bends, triplet-modulated metal hats, stark industrial string loops, authentic local street spelling and dialects.",
    genres: ["UK Drill", "Cyber-Grime", "Synth-Garage", "Ambient Dubstep"],
    hardRules: [
      "HR-UK-01: Accent and dialect must be authentic to the specific UK scene (e.g., Grime, Shoegaze, Britpop); American cultural codes result in an automatic BLOCK.",
      "HR-UK-02: Class-consciousness must be audible in the lyrical worldview; it must feel underground-first, not manufactured.",
      "HR-UK-03: Chorus pacing 3-4s cuts, avoiding fast cuts. Bridge requires a 10+ second single take."
    ],
    benchmarks: [
      "Skepta Vocal Grid Accuracy Engine",
      "Skream Sub-Frequency Amplitude Balance",
      "Class-Conscious Lyrical Credibility Quotient (>92%)",
      "London Scene Dialect Preservation Index",
      "Video Chorus Cut-Rate Pacing Monitor (3.0s)",
      "Bridge Single-Take Duration Tracking (>10.5s)"
    ]
  },
  {
    code: "CO",
    name: "Colombia",
    accentColor: "#FFC107", // Deep Gold
    motto: "Electro-Cumbia & Sabor Reggaeton",
    identityStatement: "Infectious syncopated percussion from traditional hand-drums paired with heavy modern synth basslines and granular accordion accents.",
    sonicDNAString: "Gaita flute micro-intervals, Alegre drum accents, driving dembow kicks.",
    genres: ["Electro-Cumbia", "Sabor Reggaeton", "Urban Vallenato", "Afro-Champeta"],
    hardRules: [
      "CR-CO-01: Tremolo rate on virtual accordion lines must lock to song triplet multipliers.",
      "CR-CO-02: Alegre drum transients must register peak velocities on the off-beat triggers.",
      "CR-CO-03: Dembow riddim swing setting must sit exactly at 8.3% global groove offset."
    ],
    benchmarks: ["Bomba Estéreo Rhythmic Fusion Index", "J Balvin Vocal Compression Signature"]
  },
  {
    code: "ES",
    name: "Spain",
    accentColor: "#E53935", // Spanish Red
    motto: "Neo-Flamenco & Andalusian Avant-Garde",
    identityStatement: "Complex flamenco handclaps (Palmas) clashing with minimalist 808 subs, dramatic acoustic guitar rasgueado, and auto-tuned Melismas.",
    sonicDNAString: "Flamenco multi-clap patterns, rapid nylon string sweeps, sub-harmonic 808 drops, pitch-aligned melismas.",
    genres: ["Neo-Flamenco", "Urban Andalus", "Copla-Synth", "Iberian Trap"],
    hardRules: [
      "CR-ES-01: Palmas clapping meters must strictly lock to 12-beat soleá complex structures.",
      "CR-ES-02: Nylon guitar transients must preserve acoustic dynamic headroom exceeding 12dB.",
      "CR-ES-03: Vocal melismas must preserve native microtonal pitch drift ranges."
    ],
    benchmarks: ["Rosalía El Mal Querer Structural Index", "Classic Palmas grid synchronization standards"]
  },
  {
    code: "FR",
    name: "France",
    accentColor: "#3F51B5", // Deep French Blue
    motto: "Parisian Retro-Synthwave & Afro-Trap",
    identityStatement: "Pristine French touch filter sweeps paired with high-tempo Afro-trap polyrhythms and moody accordion filters.",
    sonicDNAString: "High pass resonant filters, Parisian synth horns, clean auto-tuned rap cadences.",
    genres: ["French House", "Afro-Trap", "Chanson-Synth", "Electro-Nostalgia"],
    hardRules: [
      "CR-FR-01: Low-pass filter sweeps on the master instrument bus must use a 24dB LFO slope.",
      "CR-FR-02: Auto-tuned vocal tracks must be parallel-processed with a dry track ratio of exactly 35%.",
      "CR-FR-03: Accordion emulation layers must use authentic acoustic blower noise oscillators."
    ],
    benchmarks: ["Daft Punk dynamic sidechain ratio calibration", "JuL rapid vocal rhythmic syncopation flow"]
  },
  {
    code: "SE",
    name: "Sweden",
    accentColor: "#2196F3", // Stockholm Blue
    motto: "Stockholm Math-Pop Engineering",
    identityStatement: "Mathematically optimized vocal hook metrics, hyper-polished soundstage width, and clean, Scandinavian acoustic pianos.",
    sonicDNAString: "Maximal wide-panned synth chorus, predictive chord transitions, clinical harmonic balancing.",
    genres: ["Industrial Pop", "Neo-Synthpop", "Euro-House", "Ambient Nordic"],
    hardRules: [
      "CR-SE-01: Vocal hook lines must utilize the Golden Ratio (1:1.6) repetition pattern.",
      "CR-SE-02: Sibilance frequencies in the vocal mix must be strictly limited to a -48dB threshold dynamically.",
      "CR-SE-03: Instrument layer stack count in the chorus must not exceed 12 distinct voices."
    ],
    benchmarks: ["Max Martin Vocals Density Metric", "Avicii Harmonic Progressions Saliency"]
  },
  {
    code: "CA",
    name: "Canada",
    accentColor: "#9C27B0", // Toronto Indigo
    motto: "Toronto Ambient-R&B & OVO-Lowpass",
    identityStatement: "Dark, moody, low-pass filtered grand pianos layered with ambient R&B synth pads and slow, heavy sub-bass decay loops.",
    sonicDNAString: "1000Hz brickwall low-pass filter on background synths, heavy vocal delay, late-night high-end roll-offs.",
    genres: ["Toronto R&B", "Neo-grunge Folk", "Cyberpunk Industrial", "Inuit-Throat Cyber"],
    hardRules: [
      "CR-CA-01: Keyboard background loops must be low-passed at precisely 850Hz during the bridge.",
      "CR-CA-02: Snare hits must activate a native 1/4 clock analog plate reverb.",
      "CR-CA-03: Vocal tracks must sit at least 2dB lower than the accompanying lead snare track."
    ],
    benchmarks: ["The Weeknd Low-pass Aesthetic Ratio", "Inuit cultural vocal preservation standards"]
  },
  {
    code: "DE",
    name: "Germany",
    accentColor: "#4CAF50", // Berlin Green
    motto: "Berlin Brutalist Techno & Kraut-Electro",
    identityStatement: "Cold mechanical 4-on-the-floor rhythms clashing with vintage synthesizer sweeps, industrial noises, and monotone spoken-word vocals.",
    sonicDNAString: "Heavy kick drum distortion, white noise high-hat overlays, machine-driven analog sequences.",
    genres: ["Berlin Techno", "Krautrock Cyber", "Industrial EBM", "Neoclassical Ambient"],
    hardRules: [
      "CR-DE-01: Main Kick fundamental frequencies must sit exactly at 50Hz with a sharp Q-factor of 12.",
      "CR-DE-02: Background ambient pad layers must use native analog tape hiss hum simulation.",
      "CR-DE-03: Monotone vocal overlays must bypass all standard chorus or doubling plugins."
    ],
    benchmarks: ["Kraftwerk electronic sequencer alignment", "Berghain interior acoustic decay ratio"]
  },
  {
    code: "MX",
    name: "Mexico",
    accentColor: "#FF5722", // Fiesta Red-Orange
    motto: "Corrido-Synth & Mariachi-Bass",
    identityStatement: "Acoustic Requinto guitars playing complex classical arrangements backed by heavy synthetic sub-tones and high-frequency trumpet stabs.",
    sonicDNAString: "Requinto acoustic transients, mariachi trumpet high-pass sweeps, urban trap subs.",
    genres: ["Corrido Synth", "Mariachi Bass", "Norteño Tech", "Aztec Industrial"],
    hardRules: [
      "CR-MX-01: Requinto acoustic guitar tracks must not use any digital compression above a 2:1 ratio.",
      "CR-MX-02: High-frequency trumpet stabs must be panned exactly 40% to the left stereo channel for live feel.",
      "CR-MX-03: Sub-bass decay times must exceed 2 full beats for peak dynamic impact."
    ],
    benchmarks: ["Peso Pluma Requinto Acoustic Intelligibility", "Traditional Aztec ceremonial rhythm patterns"]
  },
  {
    code: "EG",
    name: "Egypt",
    accentColor: "#795548", // Sand Brown
    motto: "Cairo Mahraganat Cyber & Folk",
    identityStatement: "High-energy chaotic syncopated rhythms (darbuka loops) mixed with raw autotuned microtonal vocal runs and aggressive synth melodies.",
    sonicDNAString: "Cairo Darbuka syncopations, quarter-tone keyboard patches, metallic synth leads.",
    genres: ["Mahraganat Cyber", "Sufi-Electro", "Cairo Drill", "Nubian Synth"],
    hardRules: [
      "CR-EG-01: Master string tracks must utilize standard microtonal quarter-tone adjustments.",
      "CR-EG-02: Cairo Darbuka loops must stay dry with zero ambient space reverb.",
      "CR-EG-03: Synthesizer leads must utilize a hard-saw waveform saturated at 15%."
    ],
    benchmarks: ["El Khabas chaotic electronic darabouka scale", "Arabic classical Oud harmonic ratio rules"]
  },
  {
    code: "AU",
    name: "Australia",
    accentColor: "#00BCD4", // Southern Cross Cyan
    motto: "Melbourne Bounce & Outback Synth-Folk",
    identityStatement: "Upbeat energetic synth leads, brassy off-beat basslines, and traditional acoustic didgeridoo drones.",
    sonicDNAString: "Off-beat Melbourne bass stabs, virtual organic didgeridoo sub-drones, acoustic vocal lines.",
    genres: ["Melbourne Bounce", "Didgeridoo Cyber", "Outback Folk", "Sydney Indie"],
    hardRules: [
      "CR-AU-01: Off-beat bass notes must sit exactly on the 16th-note ticks between kick transients.",
      "CR-AU-02: Didgeridoo synthesis must generate subharmonic frequencies at 33Hz.",
      "CR-AU-03: Chorus vocal layouts must contain a dual-harmony pitch shift at +7 semitones."
    ],
    benchmarks: ["Melbourne Bounce Off-beat Swing Deviation", "Yothu Yindi digital drone integration standards"]
  },
  {
    code: "IT",
    name: "Italy",
    accentColor: "#9E9E9E", // Roman Stone Gray
    motto: "Sanremo Dramatic Orchestral & Italo-Disco",
    identityStatement: "Lush classical brass and string ensembles from Sanremo combined with vintage 4-on-the-floor arpeggiated Italo-disco bass synths.",
    sonicDNAString: "Sanremo orchestral string sweeps, arpeggiated analog bass loops, epic melodramatic choruses.",
    genres: ["Sanremo Orchestral", "Italo-Disco Tech", "Opera-Trap", "Iberian Ambient"],
    hardRules: [
      "CR-IT-01: High violin stack layers must be dynamic-EQ panned with a center notch from 1kHz to 2kHz.",
      "CR-IT-02: Disco synth arpeggiation patterns must use a 1/16th clock with 15% random velocity swing.",
      "CR-IT-03: Operatic vocal overlays must preserve an uncompressed peak head room of 18dB."
    ],
    benchmarks: ["Sanremo Live Orchestra acoustic threshold", "Giorgio Moroder synth arpeggiator resonance ratio"]
  },
  {
    code: "IE",
    name: "Ireland",
    accentColor: "#8BC34A", // Emerald Lime
    motto: "Celtic-Chamber & Neo-Trad Fusions",
    identityStatement: "Traditional tin whistle and Uilleann pipe micro-bends integrated with dark cinematic synthesizers and acoustic string layers.",
    sonicDNAString: "Uilleann pipes breath overlays, rapid Celtic violin slides, dark cinematic sub-frequencies.",
    genres: ["Celtic-Chamber", "Neo-Trad", "Dublin Indie Punk", "Viking-Folk Cyber"],
    hardRules: [
      "CR-IE-01: Tin whistle pitch bending rates must not exceed 450ms across half-steps.",
      "CR-IE-02: Strings must be tuned in a historical acoustic temperament (A=432Hz).",
      "CR-IE-03: Celtic hand-drums (Bodhrán) must sit precisely in the mid-bass cabinet frequency scale."
    ],
    benchmarks: ["Enya atmospheric vocal stacking ratios", "Planxty traditional acoustic swing standard"]
  },
  {
    code: "PR",
    name: "Puerto Rico",
    accentColor: "#03A9F4", // San Juan Light Blue
    motto: "Sabor Reggaeton & High-Pressure Latin",
    identityStatement: "Fast driving dembow drum patterns layered with synthetic reggaeton leads, romantic dynamic brass, and high-energy melodic raps.",
    sonicDNAString: "Classic PR dembow drum rhythms, brass stabs, high-retention melodic hooks.",
    genres: ["Sabor Reggaeton", "Latin Pop Drill", "Bomba-Trap", "Salsa Electro"],
    hardRules: [
      "CR-PR-01: Dembow drum beats must prioritize high-pressure punch with zero high-frequency spill.",
      "CR-PR-02: Electronic vocal tuning speed must be set to absolute zero parameter latency.",
      "CR-PR-03: Guitar background samples must be pitch-bended by exactly -3 semitones."
    ],
    benchmarks: ["Daddy Yankee vocal track compression metrics", "Bad Bunny ambient low-frequency vocal weighting"]
  }
];

export const GENRES: GenreBrief[] = [
  {
    code: "K-Pop",
    name: "K-Pop Maximalism",
    bpmRange: "110 - 135",
    instrumentation: ["Gayageum virtual model", "Maximum stereo-spread lead synths", "Sub-low kick drums", "Orchestral woodwinds"],
    subgenres: ["KR-ELEVATED", "KR-UNDERGROUND", "KR-TRADITIONAL"]
  },
  {
    code: "Hip-Hop",
    name: "Hip-Hop / West Coast",
    bpmRange: "75 - 145",
    instrumentation: ["Roland TR-808 sub-bass", "Metallic hi-hat rolls", "Intimate center-mono lead vocal", "Pitch-bended analog synth leads"],
    subgenres: ["US-UNDERGROUND", "US-COMMERCIAL", "US-DELTA-BLUES"]
  },
  {
    code: "Favela Funk",
    name: "Favela Funk System",
    bpmRange: "128 - 132",
    instrumentation: ["Abrasive MPC beatbox loops", "Distorted synth horns", "Repetitive rhythmic whistle accents", "Fat sub-basses"],
    subgenres: ["BR-FAVELA", "BR-CHAMBER", "BR-BOSSA"]
  },
  {
    code: "Amapiano",
    name: "Amapiano Deep House",
    bpmRange: "110 - 116",
    instrumentation: ["Yamaha DX7 Log-Drum presets", "Syncopated shaker loops", "Warm rhodes layers", "Tribal ambient chimes"],
    subgenres: ["ZA-AMAPIANO-PURE", "ZA-GQOM-DEEP", "ZA-HIGH-STREET"]
  },
  {
    code: "Dance Pop",
    name: "Dance Pop Core",
    bpmRange: "115 - 128",
    instrumentation: ["High Transient Snare", "Fat Moog Sub-bass", "Wide-Spread Lead Synths", "Acoustic 12-string Guitar"],
    subgenres: ["US-DPOP-COMMERCIAL", "US-DPOP-UNDERGROUND", "US-DPOP-CHAMBER"]
  }
];
